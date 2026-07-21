(function() {
  var WIDGET_ID = "649a29e1-7ca9-4c93-8bb7-a062834787bd";
  var WIDGET_VERSION = 2;
  var _state = {};
  var _changeListeners = [];
  var _pendingSessionIds = new Set();
  var _eventListeners = {};
  var _sessionCounter = 0;
  var _edgespark = null;
  var PARENT_TARGET_ORIGIN = "*";

  function _genSessionId() {
    return WIDGET_ID + ":" + (++_sessionCounter) + ":" + Date.now();
  }

  // 与宿主页面通信
  function _postMessage(type, payload) {
    window.parent.postMessage(
      Object.assign({ type: "agent-widget:" + type, widgetId: WIDGET_ID }, payload || {}),
      PARENT_TARGET_ORIGIN
    );
  }

  // JSON Patch 应用（支持 add/replace/remove 和数组 "-" 追加）
  function _applyPatches(patches) {
    for (var i = 0; i < patches.length; i++) {
      var p = patches[i];
      var parts = p.path.split("/").filter(Boolean);
      if (p.op === "remove") {
        var obj = _state;
        for (var j = 0; j < parts.length - 1; j++) obj = obj[parts[j]];
        var k = parts[parts.length - 1];
        if (Array.isArray(obj) && !isNaN(Number(k))) obj.splice(Number(k), 1);
        else delete obj[k];
      } else {
        var target = _state;
        for (var ti = 0; ti < parts.length - 1; ti++) {
          if (target[parts[ti]] === undefined) target[parts[ti]] = {};
          target = target[parts[ti]];
        }
        var key = parts[parts.length - 1];
        if (key === "-" && Array.isArray(target)) target.push(p.value);
        else if (p.op === "add" && Array.isArray(target) && !isNaN(Number(key))) target.splice(Number(key), 0, p.value);
        else target[key] = p.value;
      }
    }
  }

  function _notifyChange(patches, source, sourceUser) {
    var changes = patches.map(function(p) {
      return {
        path: p.path.replace(/^\//, "").replace(/\//g, "."),
        value: p.value,
        source: source || "user",
        user: sourceUser || null,
      };
    });
    var snapshot = JSON.parse(JSON.stringify(_state));
    _changeListeners.forEach(function(fn) { fn(snapshot, changes); });
  }

  // 监听宿主消息
  window.addEventListener("message", function(e) {
    if (!e.data || !e.data.type) return;
    var type = e.data.type;

    // 用户身份注入
    if (type === "agent-widget:user_info") {
      var u = e.data.user || null;
      if (u) u.name = u.displayName;
      _currentUser = u;
      if (_userResolve) { _userResolve(_currentUser); _userResolve = null; }
    }

    // 全量 state 快照
    if (type === "agent-widget:state_snapshot") {
      Object.keys(_state).forEach(function(k) { delete _state[k]; });
      Object.assign(_state, e.data.state);
      _changeListeners.forEach(function(fn) { fn(_state, null); });
    }

    // 增量 state delta（来自其他客户端或 Agent）
    if (type === "agent-widget:state_delta") {
      var sid = e.data.sessionId;
      // Echo 消除：自己发出的变更不再触发
      if (sid && _pendingSessionIds.has(sid)) {
        _pendingSessionIds.delete(sid);
        return;
      }
      _applyPatches(e.data.patches);
      _notifyChange(e.data.patches, e.data.source, e.data.sourceUser);
    }

    // CAS 结果
    if (type === "agent-widget:state_cas_result") {
      // 由 set() 中 Promise handler 处理
    }

    // Agent → Widget 自定义事件
    if (type === "agent-widget:custom_event") {
      var listeners = _eventListeners[e.data.event] || [];
      listeners.forEach(function(fn) { fn(e.data.payload); });
    }

    // Widget poster preview: export the already-rendered DOM as a script-free
    // HTML snapshot. The parent cannot read this sandboxed iframe directly,
    // but the widget can safely post a static clone back for poster rendering.
    if (type === "agent-widget:poster_snapshot_request") {
      var snapshotRequestId = e.data.requestId || "";
      var snapshotWidth = Number(e.data.width) || 560;
      var snapshotHeight = Number(e.data.height) || 400;
      requestAnimationFrame(function() {
        setTimeout(function() {
          try {
            _postMessage("poster_snapshot", {
              requestId: snapshotRequestId,
              html: _buildPosterSnapshotHtml(snapshotWidth, snapshotHeight),
            });
          } catch (err) {
            _postMessage("poster_snapshot", {
              requestId: snapshotRequestId,
              error: err && err.message ? err.message : "Widget snapshot failed",
            });
          }
        }, 100);
      });
    }

  });

  function _cleanPosterSnapshotNode(root) {
    if (!root || !root.querySelectorAll) return;
    root.querySelectorAll("script, iframe, object, embed").forEach(function(el) {
      el.remove();
    });
    root.querySelectorAll("*").forEach(function(el) {
      Array.prototype.slice.call(el.attributes || []).forEach(function(attr) {
        var name = String(attr.name || "").toLowerCase();
        var value = String(attr.value || "").trim().toLowerCase();
        if (name.indexOf("on") === 0 || value.indexOf("javascript:") === 0) {
          el.removeAttribute(attr.name);
        }
      });
    });
  }

  function _buildPosterSnapshotHtml(width, height) {
    var snapshotDoc = document.implementation.createHTMLDocument("widget-poster-snapshot");
    var base = snapshotDoc.createElement("base");
    base.href = window.location.href;
    snapshotDoc.head.appendChild(base);

    if (document.head) {
      var headClone = document.head.cloneNode(true);
      _cleanPosterSnapshotNode(headClone);
      Array.prototype.slice.call(headClone.childNodes).forEach(function(node) {
        snapshotDoc.head.appendChild(node.cloneNode(true));
      });
    }

    var style = snapshotDoc.createElement("style");
    style.textContent =
      "html,body{width:" + width + "px!important;min-height:" + height + "px!important;" +
      "margin:0!important;overflow:hidden!important;background:#fff!important;}" +
      "body{box-sizing:border-box!important;}";
    snapshotDoc.head.appendChild(style);

    if (document.body) {
      var bodyClone = document.body.cloneNode(true);
      _cleanPosterSnapshotNode(bodyClone);
      snapshotDoc.body.innerHTML = bodyClone.innerHTML;
    }

    return "<!doctype html>" + snapshotDoc.documentElement.outerHTML;
  }

  // 用户身份
  var _currentUser = null;
  var _userResolve = null;
  var _userPromise = new Promise(function(resolve) { _userResolve = resolve; });

  // ---- window.ResonWidget ----
  window.ResonWidget = {
    id: WIDGET_ID,
    version: WIDGET_VERSION,

    // state 子对象：dot-path get/set + onChange
    state: {
      get: function(path) {
        if (!path) return JSON.parse(JSON.stringify(_state));
        var parts = path.split(".");
        var val = _state;
        for (var i = 0; i < parts.length; i++) {
          if (val == null) return undefined;
          val = val[parts[i]];
        }
        return val !== undefined ? JSON.parse(JSON.stringify(val)) : undefined;
      },

      set: function(pathOrObj, value, options) {
        var patches;
        var casExpect;

        if (typeof pathOrObj === "string") {
          // dot-path 写入
          var jsonPath = "/" + pathOrObj.split(".").join("/");
          var current = window.ResonWidget.state.get(pathOrObj);
          patches = [{ op: current === undefined ? "add" : "replace", path: jsonPath, value: value }];
          if (options && options.expect !== undefined) {
            casExpect = { path: pathOrObj, value: options.expect };
          }
        } else {
          // 浅合并模式
          patches = Object.entries(pathOrObj).map(function(entry) {
            var k = entry[0], v = entry[1];
            return { op: _state[k] === undefined ? "add" : "replace", path: "/" + k, value: v };
          });
        }

        if (casExpect) {
          // CAS: 异步，等服务端确认
          var sessionId = _genSessionId();
          _pendingSessionIds.add(sessionId);
          return new Promise(function(resolve) {
            _postMessage("state_set", { patches: patches, expect: casExpect, sessionId: sessionId });
            var handler = function(e) {
              if (e.data && e.data.type === "agent-widget:state_cas_result" && e.data.sessionId === sessionId) {
                window.removeEventListener("message", handler);
                _pendingSessionIds.delete(sessionId);
                if (e.data.ok) {
                  _applyPatches(patches);
                  _notifyChange(patches, "user", null);
                }
                resolve(e.data.ok);
              }
            };
            window.addEventListener("message", handler);
          });
        }

        // 非 CAS: 乐观更新
        _applyPatches(patches);
        _notifyChange(patches, "user", null);
        var sid = _genSessionId();
        _pendingSessionIds.add(sid);
        _postMessage("state_set", { patches: patches, sessionId: sid });
      },

      on: function(event, listener) {
        if (event === "change") {
          _changeListeners.push(listener);
          return function() {
            var idx = _changeListeners.indexOf(listener);
            if (idx >= 0) _changeListeners.splice(idx, 1);
          };
        }
      },

      // 向后兼容旧 API
      getSnapshot: function() { return window.ResonWidget.state.get(); },
      onChange: function(listener) { return window.ResonWidget.state.on("change", listener); },
    },

    getUser: function() {
      if (_currentUser) return Promise.resolve(_currentUser);
      return _userPromise;
    },

    emit: function(event, payload) {
      _postMessage("emit", { event: event, payload: payload });
    },

    on: function(event, listener) {
      if (event === "change") return window.ResonWidget.state.on("change", listener);
      if (!_eventListeners[event]) _eventListeners[event] = [];
      _eventListeners[event].push(listener);
      return function() {
        var arr = _eventListeners[event];
        var idx = arr.indexOf(listener);
        if (idx >= 0) arr.splice(idx, 1);
      };
    },

    asset: function(filename) {
      return "/api/uploads/widgets/649a29e1-7ca9-4c93-8bb7-a062834787bd/" + filename;
    },
  };

  if (_edgespark) {
    window.__bloome_edgespark = {
      projectId: _edgespark.projectId,
      baseUrl: _edgespark.baseUrl,
      widgetInstanceId: _edgespark.widgetInstanceId,
      bloomeJwt: _edgespark.bloomeJwt,
      bloomeJwtExpiresAt: _edgespark.bloomeJwtExpiresAt,
      user: null,
    };

    var _nativeFetch = window.fetch.bind(window);
    var _bearerPromise = null;

    function _isEdgeSparkRequest(input) {
      var url = "";
      if (typeof input === "string") url = input;
      else if (input && typeof input.url === "string") url = input.url;
      if (!url) return false;
      return url === _edgespark.baseUrl || url.indexOf(_edgespark.baseUrl + "/") === 0;
    }

    function _refreshBloomeJwt() {
      var requestId = WIDGET_ID + ":edgespark:" + Date.now() + ":" + Math.random();
      return new Promise(function(resolve, reject) {
        var timeout = setTimeout(function() {
          window.removeEventListener("message", handler);
          reject(new Error("EdgeSpark JWT refresh timed out"));
        }, 10000);

        function handler(e) {
          if (!e.data || e.data.type !== "agent-widget:edgespark_jwt" || e.data.requestId !== requestId) return;
          clearTimeout(timeout);
          window.removeEventListener("message", handler);
          if (!e.data.ok) {
            reject(new Error(e.data.error || "EdgeSpark JWT refresh failed"));
            return;
          }
          _edgespark.bloomeJwt = e.data.jwt;
          _edgespark.bloomeJwtExpiresAt = e.data.expiresAt;
          window.__bloome_edgespark.bloomeJwt = e.data.jwt;
          window.__bloome_edgespark.bloomeJwtExpiresAt = e.data.expiresAt;
          resolve(e.data.jwt);
        }

        window.addEventListener("message", handler);
        _postMessage("edgespark_refresh_jwt", { requestId: requestId });
      });
    }

    function _getBloomeJwt() {
      var expiresAt = Date.parse(_edgespark.bloomeJwtExpiresAt || "");
      if (_edgespark.bloomeJwt && Number.isFinite(expiresAt) && expiresAt - Date.now() > 60000) {
        return Promise.resolve(_edgespark.bloomeJwt);
      }
      return _refreshBloomeJwt();
    }

    function _silentSignIn(retryAfterJwtRefresh) {
      return _getBloomeJwt().then(function(jwt) {
        return _nativeFetch(_edgespark.baseUrl + "/api/public/_bloome/silent-sign-in", {
          method: "POST",
          headers: { "Authorization": "Bearer " + jwt },
        });
      }).then(function(res) {
        if ((res.status === 401 || res.status === 403) && !retryAfterJwtRefresh) {
          _edgespark.bloomeJwt = null;
          window.__bloome_edgespark.bloomeJwt = null;
          return _refreshBloomeJwt().then(function() { return _silentSignIn(true); });
        }
        if (!res.ok) {
          return res.json().catch(function() { return {}; }).then(function(body) {
            throw new Error(body.error || "EdgeSpark silent sign-in failed");
          });
        }
        return res.json();
      }).then(function(data) {
        if (typeof data === "string") return data;
        var token = data.token || data.bearerToken || data.bearer;
        if (!token) throw new Error("EdgeSpark silent sign-in returned no bearer token");
        _edgespark.bearerToken = token;
        _edgespark.bearerExpiresAt = data.expiresAt || (data.session && data.session.expiresAt) || null;
        _edgespark.user = data.bloomeUser || data.user || null;
        window.__bloome_edgespark.user = _edgespark.user;
        return token;
      });
    }

    function _ensureBearer() {
      if (_edgespark.bearerToken) return Promise.resolve(_edgespark.bearerToken);
      if (_bearerPromise) return _bearerPromise;
      _bearerPromise = _silentSignIn(false).catch(function(err) {
        _bearerPromise = null;
        throw err;
      });
      return _bearerPromise;
    }

    function _fetchWithBearer(input, options, retry) {
      return _ensureBearer().then(function(token) {
        var opts = Object.assign({}, options || {});
        delete opts.auth;
        var headers = new Headers(
          opts.headers || (input && typeof input !== "string" && input.headers ? input.headers : undefined)
        );
        headers.set("Authorization", "Bearer " + token);
        opts.headers = headers;
        return _nativeFetch(input, opts);
      }).then(function(res) {
        if (res.status !== 401 || retry) return res;
        _edgespark.bearerToken = null;
        _bearerPromise = null;
        return _fetchWithBearer(input, options, true);
      });
    }

    function _isPublicEdgeSparkPath(input) {
      var url = typeof input === "string" ? input : input && input.url;
      if (!url) return false;
      if (url.charAt(0) === "/") return url.indexOf("/api/public/") === 0;
      return url.indexOf(_edgespark.baseUrl + "/api/public/") === 0;
    }

    function _fetchPublic(input, options) {
      var opts = Object.assign({}, options || {});
      delete opts.auth;
      return _nativeFetch(input, opts);
    }

    function _fetchWithBestEffortBearer(input, options) {
      var isPublic = _isPublicEdgeSparkPath(input);
      return _fetchWithBearer(input, options, false).catch(function(err) {
        if (!isPublic) throw err;
        return _fetchPublic(input, options);
      });
    }

    window.ResonWidget.edgespark = {
      baseUrl: _edgespark.baseUrl,
      getBloomeJwt: _getBloomeJwt,
      ensureBearer: _ensureBearer,
      getUser: function() {
        return _ensureBearer().then(function() { return _edgespark.user; });
      },

      getToken: function() {
        return _ensureBearer();
      },

      fetch: function(path, options) {
        var url = /^https?:\/\//.test(path) ? path : _edgespark.baseUrl + path;
        if (options && (options.auth === "public" || options.auth === "none")) {
          return _fetchPublic(url, options);
        }
        if (options && options.auth === "required") {
          return _fetchWithBearer(url, options, false);
        }
        return _fetchWithBestEffortBearer(url, options);
      },

      fetchPublic: function(path, options) {
        var url = /^https?:\/\//.test(path) ? path : _edgespark.baseUrl + path;
        return _fetchPublic(url, options);
      },
    };

    window.fetch = function(input, options) {
      if (!_isEdgeSparkRequest(input)) {
        return _nativeFetch(input, options);
      }
      if (options && (options.auth === "public" || options.auth === "none")) {
        return _fetchPublic(input, options);
      }
      if (options && options.auth === "required") {
        return _fetchWithBearer(input, options, false);
      }
      return _fetchWithBestEffortBearer(input, options);
    };
  }

  // 向后兼容
  window.AgentWidget = window.ResonWidget;

  // 自动上报内容高度
  function reportHeight() {
    var h = document.documentElement.scrollHeight || document.body.scrollHeight;
    if (h > 0) _postMessage("resize", { height: h });
  }

  if (document.readyState === "complete" || document.readyState === "interactive") {
    requestAnimationFrame(function() {
      reportHeight();
      _postMessage("ready", { height: document.documentElement.scrollHeight });
    });
  } else {
    window.addEventListener("DOMContentLoaded", function() {
      requestAnimationFrame(function() {
        reportHeight();
        _postMessage("ready", { height: document.documentElement.scrollHeight });
      });
    });
  }

  if (typeof MutationObserver !== "undefined") {
    var _resizeTimer;
    new MutationObserver(function() {
      clearTimeout(_resizeTimer);
      _resizeTimer = setTimeout(reportHeight, 100);
    }).observe(document.documentElement, { childList: true, subtree: true, attributes: true });
  }
})();