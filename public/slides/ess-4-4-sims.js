/* ESS 4.4 — interactive simulations
   Six self-contained labs, rendered into <div class="sim" data-sim="..."> placeholders.
   Animations only run while their slide is the active one. */
(function () {
  'use strict';

  /* ================================================================
     Pure models (kept DOM-free so they can be unit-tested in Node)
     ================================================================ */

  // --- Eutrophication lake model (time unit = months) ---------------
  function eutInit() { return { N: 5, A: 3, P: 70, D: 2, O: 9 }; }
  function eutLight(s) { return Math.max(0.05, Math.min(1, 1 - s.A / 80)); }
  function eutInflow(p) {
    return (p.I / 100) * 20 * (p.l1 ? 0.35 : 1) * (p.l2 ? 0.35 : 1);
  }
  function eutStep(s, p, dt) {
    const inflow = eutInflow(p);
    const mon = s.N / (s.N + 15);
    const light = eutLight(s);
    const dN = inflow - 0.045 * s.A * mon - 0.5 * s.N + 0.06 * s.D;
    const dA = 0.9 * s.A * mon * (1 - s.A / 100) - 0.35 * s.A + 0.05;
    const dP = 0.18 * light * s.P * (1 - s.P / 100) - 0.07 * s.P;
    const dD = 0.175 * s.A + 0.02 * s.P - 0.3 * s.D;
    const rea = 0.55 + (p.l3 ? 2.2 : 0);
    const dO = rea * (9 - s.O) + 0.006 * s.P * light + 0.004 * s.A - 0.24 * s.D;
    s.N = Math.max(0, s.N + dN * dt);
    s.A = Math.max(0, Math.min(100, s.A + dA * dt));
    s.P = Math.max(0, Math.min(100, s.P + dP * dt));
    s.D = Math.max(0, s.D + dD * dt);
    s.O = Math.max(0, Math.min(10.5, s.O + dO * dt));
  }

  // --- BOD model ------------------------------------------------------
  const DO_TABLE = [[0, 14.6], [10, 11.3], [20, 9.1], [30, 7.5], [35, 6.9]];
  function doSat(T) {
    for (let i = 0; i < DO_TABLE.length - 1; i++) {
      const a = DO_TABLE[i], b = DO_TABLE[i + 1];
      if (T <= b[0]) return a[1] + (b[1] - a[1]) * (T - a[0]) / (b[0] - a[0]);
    }
    return DO_TABLE[DO_TABLE.length - 1][1];
  }
  function bodModel(L, T) {
    const DO0 = doSat(T);
    const k = 0.23 * Math.pow(1.047, T - 20);
    const DOt = function (t) { return Math.max(0, DO0 - L * (1 - Math.exp(-k * t))); };
    return { DO0: DO0, k: k, DOt: DOt, DO5: DOt(5), BOD5: DO0 - DOt(5) };
  }

  if (typeof document === 'undefined') {
    if (typeof module !== 'undefined') module.exports = { eutInit, eutStep, eutLight, eutInflow, bodModel, doSat };
    return;
  }

  /* ================================================================
     Helpers
     ================================================================ */
  const TAU = Math.PI * 2;
  const clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };
  const lerp = function (a, b, t) { return a + (b - a) * t; };
  const rand = function (a, b) { return a + Math.random() * (b - a); };

  function mkCanvas(c, w, h) {
    const d = Math.min(window.devicePixelRatio || 1, 2);
    c.width = w * d; c.height = h * d;
    c.style.aspectRatio = w + ' / ' + h;
    const g = c.getContext('2d');
    g.scale(d, d);
    return g;
  }
  function fillRange(inp) {
    const mn = +inp.min || 0, mx = +inp.max || 100;
    inp.style.setProperty('--fill', ((inp.value - mn) / (mx - mn) * 100) + '%');
  }
  function head(title, sub) {
    return '<div class="sim-head"><span class="sim-pill">Interactive lab</span>' +
      '<h3 class="sim-title">' + title + '</h3><p class="sim-sub">' + sub + '</p></div>';
  }
  function setNote(el, cls, html) {
    const key = cls + '|' + html;
    if (el._key === key) return;
    el._key = key;
    el.className = 'sim-note ' + cls;
    el.innerHTML = html;
  }
  function roundRect(g, x, y, w, h, r) {
    g.beginPath();
    g.moveTo(x + r, y);
    g.arcTo(x + w, y, x + w, y + h, r);
    g.arcTo(x + w, y + h, x, y + h, r);
    g.arcTo(x, y + h, x, y, r);
    g.arcTo(x, y, x + w, y, r);
    g.closePath();
  }

  const ticks = [];
  function register(root, fn) { ticks.push({ root: root, fn: fn }); }
  let lastT = performance.now();
  function loop(now) {
    const dt = Math.min(0.05, (now - lastT) / 1000);
    lastT = now;
    for (let i = 0; i < ticks.length; i++) {
      const t = ticks[i];
      if (t.root.closest('.slide.active')) t.fn(dt, now / 1000);
    }
    requestAnimationFrame(loop);
  }

  /* ================================================================
     1. Source sorter (4.4.1)
     ================================================================ */
  function initSorter(root) {
    const items = [
      { e: '🏭', t: 'Waste-water pipe from a chemical factory', a: 'point', why: 'A single discharge pipe is one identifiable location — easy to monitor, license and fine.' },
      { e: '🌾', t: 'Fertiliser washing off fields after heavy rain', a: 'non', why: 'Nutrients leave from a huge, diffuse area and arrive via many routes — hard to trace to one owner.' },
      { e: '🚰', t: 'Municipal sewage-works outfall into a river', a: 'point', why: 'A defined outfall pipe. It is regulated and measurable, so treatment standards can be enforced.' },
      { e: '🛢️', t: 'Oil leaking from a wrecked tanker', a: 'point', why: 'A single, identifiable location (the ship) — even though the slick then spreads out.' },
      { e: '🛣️', t: 'Rain washing oil, tyre dust and litter off city roads', a: 'non', why: 'Urban stormwater collects pollutants from the whole catchment surface, not one pipe.' },
      { e: '🌧️', t: 'Acid deposition from power-station emissions', a: 'non', why: 'Pollutants travel through the atmosphere and fall over a wide area — a diffuse source.' },
      { e: '⛽', t: 'A leaking underground tank at one petrol station', a: 'point', why: 'The leak has a single, identifiable origin that can be dug up and repaired.' },
      { e: '🐄', t: 'Manure spread across many pastures and washed to a stream', a: 'non', why: 'Spread over a wide area. (A single feedlot lagoon pipe, by contrast, would be a point source.)' }
    ];
    root.innerHTML = head('Source Sorter: Point or Non-Point?', 'Classify each scenario. Think: <em>can I trace it to a single, identifiable location?</em>') +
      '<div class="sim-body"><div class="sorter-stage" data-r="stage"></div></div>';
    const stage = root.querySelector('[data-r=stage]');
    let order, idx, score, results, answered;

    function reset() {
      order = items.slice().sort(function () { return Math.random() - 0.5; });
      idx = 0; score = 0; results = []; answered = false;
      render();
    }
    function prog() {
      let h = '<div class="sorter-prog">';
      for (let i = 0; i < order.length; i++) {
        const c = results[i] === true ? 'ok' : results[i] === false ? 'no' : (i === idx ? 'cur' : '');
        h += '<i class="' + c + '"></i>';
      }
      return h + '</div>';
    }
    function render() {
      if (idx >= order.length) {
        const msg = score >= 7 ? 'Excellent — you can reliably spot diffuse vs identifiable sources.' :
          score >= 5 ? 'Good start. Re-read the point-source definition: one <em>identifiable</em> location.' :
            'Keep practising: ask “could I point to the pipe or site on a map?”';
        stage.innerHTML = prog() + '<div class="sorter-end"><div class="big">' + score + ' / ' + order.length + '</div><p style="margin:8px 0 14px;font-size:13.5px">' + msg + '</p>' +
          '<div class="sim-note good" style="text-align:left"><strong>Why it matters:</strong> point sources can be regulated by licensing and fining the discharger; non-point sources need catchment-wide management (buffer strips, land-use planning, behaviour change).</div>' +
          '<button class="sim-btn primary" data-r="again" style="margin-top:14px">↺ Play again</button></div>';
        stage.querySelector('[data-r=again]').onclick = reset;
        return;
      }
      const it = order[idx];
      answered = false;
      stage.innerHTML = prog() +
        '<div class="sorter-card"><div class="emo">' + it.e + '</div><div class="txt">' + it.t + '</div></div>' +
        '<div class="sorter-btns"><button class="sim-btn" data-a="point">📍 Point source</button><button class="sim-btn" data-a="non">🌫️ Non-point source</button></div>' +
        '<div class="sorter-fb" data-r="fb"></div>';
      stage.querySelectorAll('[data-a]').forEach(function (b) { b.onclick = function () { answer(b); }; });
    }
    function answer(btn) {
      if (answered) return;
      answered = true;
      const it = order[idx];
      const ok = btn.dataset.a === it.a;
      if (ok) score++;
      results[idx] = ok;
      stage.querySelectorAll('[data-a]').forEach(function (b) {
        if (b.dataset.a === it.a) b.classList.add('right');
        else if (b === btn) b.classList.add('wrong');
      });
      const fb = stage.querySelector('[data-r=fb]');
      fb.innerHTML = '<div class="sim-note ' + (ok ? 'good' : 'bad') + '"><strong>' + (ok ? '✅ Correct.' : '❌ Not quite.') + '</strong> ' + it.why + '</div>' +
        '<div style="text-align:center;margin-top:10px"><button class="sim-btn primary" data-r="next">' + (idx === order.length - 1 ? 'See result →' : 'Next →') + '</button></div>';
      fb.querySelector('[data-r=next]').onclick = function () { idx++; render(); };
      const prg = stage.querySelector('.sorter-prog');
      if (prg) prg.outerHTML = prog();
    }
    reset();
  }

  /* ================================================================
     2. Ocean gyre plastic simulator (4.4.2)
     ================================================================ */
  function initGyre(root) {
    root.innerHTML = head('Ocean Gyre Plastic Simulator', 'Plastic enters at the coast, is carried round by the gyre and spirals inward. Change the inputs and interventions — and watch what really works.') +
      '<div class="sim-body"><canvas data-r="cv" aria-label="Animated ocean gyre with plastic particles"></canvas>' +
      '<div class="sim-controls"><div class="sim-ctl"><label class="sim-lbl">Plastic entering the ocean <output data-r="rateo"></output></label><input type="range" data-r="rate" min="0" max="100" value="45"></div></div>' +
      '<div class="sim-toggles">' +
      '<label class="sim-tog"><input type="checkbox" data-r="frag" checked><span class="dot"></span>☀️ UV &amp; wave fragmentation</label>' +
      '<label class="sim-tog"><input type="checkbox" data-r="barrier"><span class="dot"></span>🧲 Cleanup barrier</label>' +
      '<label class="sim-tog"><input type="checkbox" data-r="ban"><span class="dot"></span>🚫 Single-use ban + EPR</label>' +
      '</div>' +
      '<div class="sim-stats">' +
      '<div class="sim-stat"><div class="k">Years elapsed</div><div class="v" data-r="yrs">0</div></div>' +
      '<div class="sim-stat"><div class="k">Macroplastic</div><div class="v" data-r="mac">0<small>pieces</small></div></div>' +
      '<div class="sim-stat"><div class="k">Microplastic</div><div class="v" data-r="mic">0<small>pieces</small></div></div>' +
      '<div class="sim-stat"><div class="k">Removed by barrier</div><div class="v" data-r="col">0</div></div>' +
      '<div class="sim-stat"><div class="k">Wildlife exposure</div><div class="v" data-r="hrm">0<small>/100</small></div></div>' +
      '</div>' +
      '<div class="sim-note" data-r="note"></div>' +
      '<div class="sim-btnrow"><button class="sim-btn" data-r="reset">↺ Reset ocean</button></div>' +
      '<div class="sim-exam"><b>Exam link:</b><span>Explain why microplastics are harder to manage than macroplastics, and why prevention at source beats cleanup (management level 1 vs level 3).</span></div></div>';
    const R = function (n) { return root.querySelector('[data-r="' + n + '"]'); };
    const W = 760, H = 340, cx = 380, cy = 172, XS = 1.9;
    const g = mkCanvas(R('cv'), W, H);
    const rate = R('rate'), rateo = R('rateo');
    let parts = [], years = 0, collected = 0, accM = 0, accU = 0, noteT = 0;
    const palette = ['#e8553d', '#f2c14e', '#f4f4f4', '#3d8be8', '#8e5bd6', '#2fb58a'];
    rate.oninput = function () { fillRange(rate); rateo.textContent = rate.value + '%'; };
    rate.oninput();

    function spawn(micro) {
      const th = rand(0, TAU);
      parts.push({ r: rand(150, 168), th: th, m: micro, c: micro ? '#dfe9f3' : palette[(Math.random() * palette.length) | 0], rmin: rand(4, 52), s: rand(3.2, 5.2), a: rand(0, TAU) });
    }
    R('reset').onclick = function () { parts = []; years = 0; collected = 0; };

    register(root, function (dt) {
      const ban = R('ban').checked, frag = R('frag').checked, bar = R('barrier').checked;
      years += dt / 1.2;
      const perSec = (+rate.value) * 0.32 * (ban ? 0.25 : 1);
      accM += perSec * dt; accU += perSec * (ban ? 0.04 : 0.12) * dt;
      while (accM >= 1) { accM -= 1; if (parts.length < 1700) spawn(false); }
      while (accU >= 1) { accU -= 1; if (parts.length < 1700) spawn(true); }
      const out = [];
      let mac = 0, mic = 0;
      for (let i = 0; i < parts.length; i++) {
        const p = parts[i];
        p.th += (0.1 + 0.7 * (1 - Math.min(1, p.r / 230))) * dt;
        if (p.th > TAU) p.th -= TAU;
        if (p.r > p.rmin) p.r -= (p.m ? 3.4 : 5) * dt * (0.5 + Math.random());
        else p.r = p.rmin + Math.sin(p.a += dt * 1.5) * 2;
        p.r += (Math.random() - 0.5) * 4 * dt;
        if (!p.m && frag && Math.random() < 0.045 * dt) {
          p.m = 1; p.c = '#dfe9f3'; p.s = 2;
          for (let k = 0; k < 2; k++) out.push({ r: p.r + rand(-3, 3), th: p.th + rand(-0.03, 0.03), m: 1, c: '#dfe9f3', rmin: rand(4, 52), s: 2, a: rand(0, TAU) });
        }
        if (bar && p.r > 52 && p.r < 132) {
          let d = p.th; if (d > Math.PI) d -= TAU;
          if (Math.abs(d) < 0.07 && Math.random() < (p.m ? 0.015 : 0.45)) { collected++; continue; }
        }
        out.push(p);
      }
      parts = out;
      for (let i = 0; i < parts.length; i++) parts[i].m ? mic++ : mac++;

      /* ---- draw ---- */
      const og = g.createLinearGradient(0, 0, 0, H);
      og.addColorStop(0, '#2d6f9e'); og.addColorStop(1, '#173f66');
      g.fillStyle = og; g.fillRect(0, 0, W, H);
      g.strokeStyle = 'rgba(255,255,255,.07)'; g.lineWidth = 1.5;
      for (let r = 40; r <= 170; r += 32) { g.beginPath(); g.ellipse(cx, cy, r * XS, r, 0, 0, TAU); g.stroke(); }
      // flow arrows (clockwise)
      g.fillStyle = 'rgba(255,255,255,.28)';
      for (let k = 0; k < 6; k++) {
        const th = k * TAU / 6 + years * 0.0, r = 148;
        const x = cx + Math.cos(th) * r * XS, y = cy + Math.sin(th) * r;
        const tx = -Math.sin(th) * XS, ty = Math.cos(th);
        const L = Math.hypot(tx, ty), ux = tx / L, uy = ty / L;
        g.beginPath(); g.moveTo(x + ux * 9, y + uy * 9); g.lineTo(x - ux * 5 - uy * 6, y - uy * 5 + ux * 6); g.lineTo(x - ux * 5 + uy * 6, y - uy * 5 - ux * 6); g.closePath(); g.fill();
      }
      // coasts
      g.fillStyle = '#c9b88a';
      g.beginPath(); g.moveTo(0, 0); g.lineTo(46, 0); g.quadraticCurveTo(70, 90, 38, 170); g.quadraticCurveTo(66, 250, 40, H); g.lineTo(0, H); g.fill();
      g.beginPath(); g.moveTo(W, 0); g.lineTo(W - 46, 0); g.quadraticCurveTo(W - 70, 90, W - 38, 170); g.quadraticCurveTo(W - 66, 250, W - 40, H); g.lineTo(W, H); g.fill();
      g.fillStyle = '#7da36a';
      g.beginPath(); g.moveTo(0, 0); g.lineTo(24, 0); g.quadraticCurveTo(42, 90, 20, 170); g.quadraticCurveTo(40, 250, 22, H); g.lineTo(0, H); g.fill();
      g.beginPath(); g.moveTo(W, 0); g.lineTo(W - 24, 0); g.quadraticCurveTo(W - 42, 90, W - 20, 170); g.quadraticCurveTo(W - 40, 250, W - 22, H); g.lineTo(W, H); g.fill();
      g.font = '11px sans-serif'; g.fillStyle = 'rgba(255,255,255,.8)'; g.textAlign = 'center';
      g.fillText('🏙️ coast: rivers & litter', 70, 16); g.fillText('coast: rivers & litter 🏭', W - 70, 16);
      // barrier
      if (bar) {
        g.strokeStyle = '#ff9a3c'; g.lineWidth = 5; g.lineCap = 'round'; g.setLineDash([9, 5]);
        g.beginPath(); g.moveTo(cx + 52 * XS, cy); g.lineTo(cx + 132 * XS, cy); g.stroke(); g.setLineDash([]);
        g.fillStyle = '#ffd7a8'; g.font = 'bold 11px sans-serif'; g.fillText('cleanup barrier', cx + 92 * XS, cy - 9);
      }
      // particles
      for (let i = 0; i < parts.length; i++) {
        const p = parts[i];
        const x = cx + Math.cos(p.th) * p.r * XS, y = cy + Math.sin(p.th) * p.r;
        g.fillStyle = p.c;
        if (p.m) { g.globalAlpha = .85; g.fillRect(x, y, 1.8, 1.8); g.globalAlpha = 1; }
        else { g.save(); g.translate(x, y); g.rotate(p.a); g.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * 0.75); g.restore(); }
      }
      g.fillStyle = 'rgba(255,255,255,.75)'; g.font = '600 11px sans-serif';
      g.fillText('gyre centre — plastic accumulates', cx, cy + 62);

      /* ---- readouts ---- */
      R('yrs').textContent = Math.floor(years);
      R('mac').firstChild.nodeValue = mac;
      R('mic').firstChild.nodeValue = mic;
      R('col').textContent = collected;
      const harm = Math.min(100, Math.round((mac + mic * 0.45) / 11));
      R('hrm').firstChild.nodeValue = harm;
      R('hrm').style.color = harm > 66 ? '#c24a4a' : harm > 33 ? '#c49a3c' : '#3f8f5c';
      noteT += dt;
      if (noteT > 0.4) {
        noteT = 0;
        const n = R('note');
        if (bar && collected > 5 && mic > mac * 1.2) setNote(n, 'warn', '<strong>Spot the limit:</strong> the barrier hauls out <em>macro</em>plastic, but fragments have already become microplastics that slip straight through. Cleanup alone cannot keep up.');
        else if (frag && mic > mac && mic > 30) setNote(n, 'warn', '<strong>Fragmentation:</strong> sunlight and waves break big pieces into many tiny ones. Microplastics are eaten by zooplankton and fish, <em>bioaccumulate</em> and carry adsorbed POP toxins up the food chain.');
        else if (ban && +rate.value > 0) setNote(n, 'good', '<strong>Source control works:</strong> cutting input (bans, EPR, better waste systems) shrinks the whole problem — the most effective of the three management levels.');
        else if (+rate.value === 0) setNote(n, 'good', '<strong>Input switched off:</strong> notice that existing plastic persists for years — it does not simply disappear.');
        else setNote(n, '', '<strong>Why a gyre?</strong> Winds and the Coriolis effect drive water clockwise around the subtropical ocean basin, pushing floating debris toward the calm centre. Try the three switches!');
      }
    });
  }

  /* ================================================================
     3. BOD lab (4.4.3 / 4.4.4)
     ================================================================ */
  function initBOD(root) {
    root.innerHTML = head('BOD₅ Virtual Lab', 'Seal a water sample in a dark bottle at 20 °C, measure dissolved oxygen (DO) now and after 5 days. The oxygen bacteria used up = <strong>BOD₅</strong>.') +
      '<div class="sim-body"><canvas data-r="cv" aria-label="Dissolved oxygen over five days"></canvas>' +
      '<div class="sim-btnrow" data-r="presets">' +
      '<button class="sim-btn" data-p="1.2">🏔️ Mountain stream</button>' +
      '<button class="sim-btn" data-p="6">🚜 Farm drain</button>' +
      '<button class="sim-btn" data-p="14">🚽 Raw sewage</button>' +
      '<span class="grow"></span><button class="sim-btn primary" data-r="play">▶ Replay 5-day incubation</button></div>' +
      '<div class="sim-controls">' +
      '<div class="sim-ctl"><label class="sim-lbl">Biodegradable organic matter <output data-r="Lo"></output></label><input type="range" data-r="L" min="0.5" max="14" step="0.1" value="6"></div>' +
      '<div class="sim-ctl"><label class="sim-lbl">Incubation temperature <output data-r="To"></output></label><input type="range" data-r="T" min="5" max="30" step="1" value="20"></div></div>' +
      '<div class="sim-stats">' +
      '<div class="sim-stat"><div class="k">Initial DO</div><div class="v" data-r="d0"></div></div>' +
      '<div class="sim-stat"><div class="k">DO after 5 days</div><div class="v" data-r="d5"></div></div>' +
      '<div class="sim-stat"><div class="k">BOD₅</div><div class="v" data-r="bod"></div></div>' +
      '<div class="sim-stat"><div class="k">Water quality</div><div class="v" style="font-size:14px;line-height:1.35;padding-top:4px" data-r="ver"></div></div></div>' +
      '<div class="sim-note" data-r="note"></div>' +
      '<div class="sim-exam"><b>Exam link:</b><span>BOD = initial DO − DO after 5 days (dark, 20 °C). High BOD → lots of biodegradable organic waste → aerobic decomposers strip oxygen → fish and sensitive invertebrates die.</span></div></div>';
    const R = function (n) { return root.querySelector('[data-r="' + n + '"]'); };
    const W = 760, H = 290;
    const g = mkCanvas(R('cv'), W, H);
    const Ls = R('L'), Ts = R('T');
    let prog = 5, playing = false;

    function verdict(b) {
      if (b < 1) return ['Very clean', '#3f8f5c', 'good'];
      if (b < 3) return ['Fairly clean', '#6e9a3f', 'good'];
      if (b <= 5) return ['Moderately polluted', '#d9822b', 'warn'];
      return ['Heavily polluted', '#c24a4a', 'bad'];
    }
    function life(d5) {
      if (d5 >= 6) return 'sensitive stonefly nymphs and trout could still live here';
      if (d5 >= 4) return 'only hardier coarse fish would cope';
      if (d5 >= 2) return 'only pollution-tolerant animals (e.g. sludge worms, bloodworms) would survive';
      return 'conditions would be <strong>hypoxic</strong> — a dead zone';
    }
    function update() {
      const L = +Ls.value, T = +Ts.value;
      fillRange(Ls); fillRange(Ts);
      R('Lo').textContent = L.toFixed(1) + ' mg/L';
      R('To').textContent = T + ' °C';
      const m = bodModel(L, T);
      R('d0').innerHTML = m.DO0.toFixed(1) + '<small>mg/L</small>';
      R('d5').innerHTML = m.DO5.toFixed(1) + '<small>mg/L</small>';
      R('bod').innerHTML = m.BOD5.toFixed(1) + '<small>mg/L</small>';
      const v = verdict(m.BOD5);
      R('ver').textContent = v[0]; R('ver').style.color = v[1];
      R('bod').style.color = v[1];
      let msg = '<strong>' + v[0] + '.</strong> If this were a river, ' + life(m.DO5) + '.';
      let cls = v[2];
      if (m.DO5 <= 0.05) { msg += ' <br><strong>Oxygen ran out</strong> before day 5 — in a real lab this sample would be <em>diluted</em> so the BOD can be measured properly.'; }
      if (T !== 20) { msg += ' <br><em>Note:</em> the standard test is at 20 °C. Warmer water holds <strong>less</strong> oxygen and bacteria respire <strong>faster</strong> — one reason warm, polluted rivers crash first.'; if (cls === 'good') cls = ''; }
      setNote(R('note'), cls, msg);
      if (!playing) prog = 5;
    }
    root.querySelectorAll('[data-p]').forEach(function (b) {
      b.onclick = function () { Ls.value = b.dataset.p; Ts.value = 20; update(); prog = 0; playing = true; };
    });
    Ls.oninput = Ts.oninput = update;
    R('play').onclick = function () { prog = 0; playing = true; };
    update();

    register(root, function (dt) {
      if (playing) { prog += dt * 1.1; if (prog >= 5) { prog = 5; playing = false; } }
      const L = +Ls.value, T = +Ts.value, m = bodModel(L, T);
      const x0 = 205, x1 = 735, y0 = 24, y1 = 232, ymax = 16;
      const X = function (d) { return x0 + (d / 5) * (x1 - x0); };
      const Y = function (v) { return y1 - (v / ymax) * (y1 - y0); };
      g.fillStyle = '#fbfaf8'; g.fillRect(0, 0, W, H);
      // grid
      g.strokeStyle = '#ece7e2'; g.lineWidth = 1; g.font = '11px sans-serif'; g.fillStyle = '#9e9890'; g.textAlign = 'right';
      for (let v = 0; v <= 16; v += 4) { g.beginPath(); g.moveTo(x0, Y(v)); g.lineTo(x1, Y(v)); g.stroke(); g.fillText(v, x0 - 8, Y(v) + 4); }
      g.textAlign = 'center';
      for (let d = 0; d <= 5; d++) { g.fillText('Day ' + d, X(d), y1 + 18); }
      g.save(); g.translate(172, (y0 + y1) / 2); g.rotate(-Math.PI / 2); g.fillText('Dissolved oxygen (mg/L)', 0, 0); g.restore();
      // hypoxia line
      g.strokeStyle = 'rgba(194,74,74,.7)'; g.setLineDash([6, 5]); g.beginPath(); g.moveTo(x0, Y(2)); g.lineTo(x1, Y(2)); g.stroke(); g.setLineDash([]);
      g.fillStyle = '#c24a4a'; g.textAlign = 'left'; g.fillText('hypoxia < 2 mg/L', x0 + 6, Y(2) - 6);
      // curve
      const gr = g.createLinearGradient(0, y0, 0, y1); gr.addColorStop(0, 'rgba(91,130,184,.28)'); gr.addColorStop(1, 'rgba(91,130,184,0)');
      g.beginPath(); g.moveTo(X(0), Y(m.DOt(0)));
      const steps = 60;
      for (let i = 1; i <= steps; i++) { const d = prog * i / steps; g.lineTo(X(d), Y(m.DOt(d))); }
      const curD = prog, curV = m.DOt(curD);
      g.lineTo(X(curD), y1); g.lineTo(X(0), y1); g.closePath(); g.fillStyle = gr; g.fill();
      g.beginPath(); g.moveTo(X(0), Y(m.DOt(0)));
      for (let i = 1; i <= steps; i++) { const d = prog * i / steps; g.lineTo(X(d), Y(m.DOt(d))); }
      g.strokeStyle = '#5b82b8'; g.lineWidth = 3.5; g.lineJoin = 'round'; g.stroke();
      // markers
      g.fillStyle = '#fff'; g.strokeStyle = '#5b82b8'; g.lineWidth = 3;
      g.beginPath(); g.arc(X(0), Y(m.DO0), 6, 0, TAU); g.fill(); g.stroke();
      g.beginPath(); g.arc(X(curD), Y(curV), 6, 0, TAU); g.fill(); g.stroke();
      g.fillStyle = '#2f4260'; g.font = 'bold 11px sans-serif'; g.textAlign = 'left';
      g.fillText('Initial DO ' + m.DO0.toFixed(1), X(0) + 10, Y(m.DO0) - 10);
      if (prog >= 5) {
        const bx = X(5) - 14;
        g.strokeStyle = '#d9822b'; g.lineWidth = 2.5;
        g.beginPath(); g.moveTo(bx, Y(m.DO0)); g.lineTo(bx, Y(m.DO5)); g.stroke();
        g.beginPath(); g.moveTo(bx - 5, Y(m.DO0)); g.lineTo(bx + 5, Y(m.DO0)); g.moveTo(bx - 5, Y(m.DO5)); g.lineTo(bx + 5, Y(m.DO5)); g.stroke();
        g.fillStyle = '#d9822b'; g.textAlign = 'right'; g.font = 'bold 12px sans-serif';
        g.fillText('BOD₅ = ' + m.BOD5.toFixed(1) + ' mg/L', bx - 10, (Y(m.DO0) + Y(m.DO5)) / 2 + 4);
      }
      // bottle
      const frac = curV / 16;
      const bxl = 52, byt = 38, bw = 90, bh = 190;
      g.save();
      roundRect(g, bxl, byt + 22, bw, bh - 22, 16); g.clip();
      g.fillStyle = '#f4f1ec'; g.fillRect(bxl, byt, bw, bh);
      const murk = clamp(1 - curV / m.DO0, 0, 1);
      const wr = Math.round(lerp(110, 120, murk)), wg = Math.round(lerp(176, 98, murk)), wb = Math.round(lerp(222, 60, murk));
      const wh = (bh - 22) * clamp(0.82, 0, 1);
      g.fillStyle = 'rgb(' + wr + ',' + wg + ',' + wb + ')';
      g.fillRect(bxl, byt + bh - wh, bw, wh);
      // bubbles ∝ DO
      const nb = Math.round(frac * 28);
      g.fillStyle = 'rgba(255,255,255,.65)';
      const tt = performance.now() / 1000;
      for (let i = 0; i < nb; i++) {
        const sx = bxl + 10 + ((i * 53) % (bw - 20)), sp = 0.15 + (i % 5) * 0.05;
        const by = byt + bh - ((tt * sp * 120 + i * 37) % wh);
        g.beginPath(); g.arc(sx + Math.sin(tt * 2 + i) * 3, by, 1.6 + (i % 3) * 0.7, 0, TAU); g.fill();
      }
      // bacteria ∝ organic load
      g.fillStyle = 'rgba(90,40,120,.65)';
      const nbac = Math.round(clamp(L, 0, 14) * 5 * (0.4 + 0.6 * (1 - curD / 5 * 0.3)));
      for (let i = 0; i < nbac; i++) {
        const sx = bxl + 8 + ((i * 71) % (bw - 16)), sy = byt + bh - 8 - ((i * 43) % (wh - 14));
        g.fillRect(sx + Math.sin(tt * 3 + i) * 2, sy + Math.cos(tt * 2.3 + i) * 2, 2.6, 1.8);
      }
      g.restore();
      g.strokeStyle = '#6f6a64'; g.lineWidth = 2.5;
      roundRect(g, bxl, byt + 22, bw, bh - 22, 16); g.stroke();
      g.fillStyle = '#2f2a24'; roundRect(g, bxl + 25, byt, bw - 50, 24, 5); g.fill();
      g.fillStyle = '#6f6a64'; g.font = '600 11px sans-serif'; g.textAlign = 'center';
      g.fillText('sealed · dark · ' + T + ' °C', bxl + bw / 2, byt + bh + 20);
      g.fillStyle = '#9e9890'; g.font = '10.5px sans-serif';
      g.fillText('purple dots = decomposer bacteria', bxl + bw / 2, byt + bh + 36);
    });
  }

  /* ================================================================
     4. Eutrophication lab (4.4.5 – 4.4.8)
     ================================================================ */
  function initEut(root) {
    root.innerHTML = head('Eutrophication Lab: Build a Dead Zone — Then Fix It', 'Raise the nutrient input and watch the cascade unfold month by month. Then switch on the three management levels and see whether the lake recovers.') +
      '<div class="sim-body"><canvas data-r="cv" aria-label="Animated lake cross-section showing eutrophication"></canvas>' +
      '<div class="sim-chain" data-r="chain"></div>' +
      '<div class="sim-controls"><div class="sim-ctl"><label class="sim-lbl">Nutrient (N &amp; P) input from the catchment <output data-r="Io"></output></label><input type="range" data-r="I" min="0" max="100" value="12"></div></div>' +
      '<div class="sim-toggles">' +
      '<label class="sim-tog"><input type="checkbox" data-r="l1"><span class="dot"></span>① Alter activity: less fertiliser</label>' +
      '<label class="sim-tog"><input type="checkbox" data-r="l2"><span class="dot"></span>② Regulate release: buffer strip</label>' +
      '<label class="sim-tog"><input type="checkbox" data-r="l3"><span class="dot"></span>③ Restore: aeration pump</label>' +
      '</div>' +
      '<div class="sim-btnrow"><button class="sim-btn primary" data-r="play">⏸ Pause</button><button class="sim-btn" data-r="speed">Speed ×1</button><button class="sim-btn" data-r="dredge">🚜 Dredge sediment (level ③)</button><button class="sim-btn" data-r="heavy">🌾 Heavy fertiliser use</button><span class="grow"></span><button class="sim-btn" data-r="reset">↺ Reset lake</button></div>' +
      '<div class="sim-meters" data-r="meters"></div>' +
      '<canvas data-r="ch" style="margin-top:12px" aria-label="History chart of algae and dissolved oxygen"></canvas>' +
      '<div class="sim-note" data-r="note"></div>' +
      '<div class="sim-exam"><b>Exam link:</b><span>Write the full chain: ↑nutrients → algal bloom → light blocked → submerged plants die → decomposers ↑ → BOD ↑ → DO ↓ → hypoxia/fish kills. Then link each fix to a management level.</span></div></div>';
    const R = function (n) { return root.querySelector('[data-r="' + n + '"]'); };
    const W = 760, H = 330;
    const g = mkCanvas(R('cv'), W, H);
    const cg = mkCanvas(R('ch'), W, 150);
    const I = R('I');
    let s = eutInit(), months = 0, acc = 0, stepN = 0, running = true, spd = 1, hist = [];
    const droplets = [];
    const algaeSeeds = [], plantSeeds = [], bactSeeds = [];
    for (let i = 0; i < 320; i++) algaeSeeds.push({ x: rand(118, 750), p: rand(0, TAU), r: rand(3, 6) });
    for (let i = 0; i < 46; i++) plantSeeds.push({ x: 128 + i * 13.4 + rand(-3, 3), p: rand(0, TAU), h: rand(0.7, 1.15) });
    for (let i = 0; i < 160; i++) bactSeeds.push({ x: rand(120, 750), y: rand(0, 1), p: rand(0, TAU) });
    const fish = [];
    for (let i = 0; i < 6; i++) fish.push({ x: 200 + i * 90, y: 150 + (i % 3) * 38, ph: rand(0, TAU), sp: rand(0.5, 1.1) });

    const stages = ['① Nutrient runoff', '② Algal bloom', '③ Light blocked', '④ Plants die', '⑤ Bacterial decay (↑ BOD)', '⑥ Hypoxia'];
    R('chain').innerHTML = stages.map(function (t, i) { return (i ? '<span class="arr">→</span>' : '') + '<span class="sim-chip">' + t + '</span>'; }).join('');
    const chips = root.querySelectorAll('.sim-chip');
    const meterDefs = [['Nutrients', '#c49a3c'], ['Algae', '#3f8f5c'], ['Light', '#e0b030'], ['Plants', '#5a9e6f'], ['BOD', '#8e5bd6'], ['DO (mg/L)', '#5b82b8']];
    R('meters').innerHTML = meterDefs.map(function (m, i) { return '<div class="sim-meter"><div class="t"><span>' + m[0] + '</span><span data-m="' + i + 'v"></span></div><div class="bar"><i data-m="' + i + 'b" style="background:' + m[1] + '"></i></div></div>'; }).join('');
    const mv = function (i, val, pct, txt) { R('meters').querySelector('[data-m="' + i + 'b"]').style.width = clamp(pct, 0, 100) + '%'; R('meters').querySelector('[data-m="' + i + 'v"]').textContent = txt; };

    I.oninput = function () { fillRange(I); R('Io').textContent = I.value + '%'; };
    I.oninput();
    R('play').onclick = function () { running = !running; this.textContent = running ? '⏸ Pause' : '▶ Run'; };
    R('speed').onclick = function () { spd = spd === 1 ? 2.5 : 1; this.textContent = 'Speed ×' + (spd === 1 ? '1' : '2.5'); };
    R('reset').onclick = function () { s = eutInit(); months = 0; hist = []; stepN = 0; I.value = 12; I.oninput(); ['l1', 'l2', 'l3'].forEach(function (k) { R(k).checked = false; }); };
    R('dredge').onclick = function () { s.D *= 0.35; s.N *= 0.6; R('l3').checked = true; };
    R('heavy').onclick = function () { I.value = 85; I.oninput(); running = true; R('play').textContent = '⏸ Pause'; };
    root.querySelectorAll('input[type=checkbox]').forEach(function (c) { c.addEventListener('change', function () { running = true; R('play').textContent = '⏸ Pause'; }); });

    function params() { return { I: +I.value, l1: R('l1').checked, l2: R('l2').checked, l3: R('l3').checked }; }

    function drawChart() {
      const w = 760, h = 150, x0 = 44, x1 = w - 14, y0 = 14, y1 = h - 26;
      cg.fillStyle = '#fbfaf8'; cg.fillRect(0, 0, w, h);
      cg.strokeStyle = '#ece7e2'; cg.lineWidth = 1; cg.font = '10.5px sans-serif'; cg.fillStyle = '#9e9890'; cg.textAlign = 'right';
      for (let v = 0; v <= 12; v += 4) { const y = y1 - v / 12 * (y1 - y0); cg.beginPath(); cg.moveTo(x0, y); cg.lineTo(x1, y); cg.stroke(); cg.fillText(v, x0 - 6, y + 3); }
      cg.strokeStyle = 'rgba(194,74,74,.7)'; cg.setLineDash([5, 4]);
      const yh = y1 - 2 / 12 * (y1 - y0); cg.beginPath(); cg.moveTo(x0, yh); cg.lineTo(x1, yh); cg.stroke(); cg.setLineDash([]);
      cg.fillStyle = '#c24a4a'; cg.textAlign = 'left'; cg.fillText('hypoxia', x1 - 46, yh - 4);
      const span = 120, n = hist.length;
      const X = function (i) { return x0 + (i / (span - 1)) * (x1 - x0); };
      const off = Math.max(0, n - span);
      function line(key, scale, col) {
        cg.beginPath();
        for (let i = off; i < n; i++) { const x = X(i - off), y = y1 - clamp(hist[i][key] * scale, 0, 12) / 12 * (y1 - y0); i === off ? cg.moveTo(x, y) : cg.lineTo(x, y); }
        cg.strokeStyle = col; cg.lineWidth = 2.6; cg.lineJoin = 'round'; cg.stroke();
      }
      line('A', 12 / 100, '#3f8f5c'); line('O', 1, '#5b82b8'); line('D', 12 / 40, '#8e5bd6');
      cg.font = '600 10.5px sans-serif'; cg.textAlign = 'left';
      cg.fillStyle = '#3f8f5c'; cg.fillText('● Algae', x0 + 4, h - 8);
      cg.fillStyle = '#5b82b8'; cg.fillText('● Dissolved oxygen (mg/L)', x0 + 70, h - 8);
      cg.fillStyle = '#8e5bd6'; cg.fillText('● Decomposer demand (BOD)', x0 + 235, h - 8);
      cg.fillStyle = '#9e9890'; cg.textAlign = 'right'; cg.fillText('last 10 years →', x1, h - 8);
    }

    register(root, function (dt, tsec) {
      const p = params();
      if (running) {
        acc += dt * 4 * spd;
        let guard = 0;
        while (acc >= 0.1 && guard++ < 40) {
          eutStep(s, p, 0.1); acc -= 0.1; months += 0.1; stepN++;
          if (stepN % 10 === 0) { hist.push({ A: s.A, O: s.O, D: s.D }); if (hist.length > 600) hist.shift(); }
        }
      }
      const light = eutLight(s);
      /* ---- lake scene ---- */
      const LX = 110, SURF = 98, BOT = 312;
      const sky = g.createLinearGradient(0, 0, 0, SURF);
      sky.addColorStop(0, '#bfe0f4'); sky.addColorStop(1, '#eaf5fb');
      g.fillStyle = sky; g.fillRect(0, 0, W, SURF);
      const sg = g.createRadialGradient(690, 38, 4, 690, 38, 60); sg.addColorStop(0, 'rgba(255,230,120,1)'); sg.addColorStop(1, 'rgba(255,230,120,0)');
      g.fillStyle = sg; g.fillRect(620, 0, 140, 110);
      g.fillStyle = '#ffd95a'; g.beginPath(); g.arc(690, 38, 17, 0, TAU); g.fill();
      // water base colour reacts to algae & detritus
      const wg = g.createLinearGradient(0, SURF, 0, BOT);
      wg.addColorStop(0, 'rgb(104,176,220)'); wg.addColorStop(1, 'rgb(40,100,150)');
      g.fillStyle = wg; g.fillRect(LX, SURF, W - LX, BOT - SURF);
      g.fillStyle = 'rgba(70,150,60,' + (clamp(s.A / 100, 0, 1) * 0.6).toFixed(3) + ')'; g.fillRect(LX, SURF, W - LX, BOT - SURF);
      g.fillStyle = 'rgba(70,45,25,' + (clamp(s.D / 40, 0, 1) * 0.4).toFixed(3) + ')'; g.fillRect(LX, SURF, W - LX, BOT - SURF);
      // light beams
      for (let i = 0; i < 9; i++) {
        const bx = LX + 40 + i * 76, len = (BOT - SURF - 14) * light;
        const lg = g.createLinearGradient(0, SURF, 0, SURF + len); lg.addColorStop(0, 'rgba(255,245,170,.42)'); lg.addColorStop(1, 'rgba(255,245,170,0)');
        g.fillStyle = lg; g.beginPath(); g.moveTo(bx, SURF); g.lineTo(bx + 30, SURF); g.lineTo(bx + 56, SURF + len); g.lineTo(bx + 14, SURF + len); g.closePath(); g.fill();
      }
      // sediment
      const sed = 8 + Math.min(1, s.D / 40) * 14;
      g.fillStyle = '#6e5238'; g.fillRect(LX, BOT - sed, W - LX, sed);
      g.fillStyle = 'rgba(40,25,10,.35)'; g.fillRect(LX, BOT - sed, W - LX, 3);
      // plants
      const np = Math.round(s.P / 100 * plantSeeds.length), ph = 14 + s.P / 100 * 56;
      for (let i = 0; i < np; i++) {
        const sd = plantSeeds[i], sw = Math.sin(tsec * 1.3 + sd.p) * 5, h = ph * sd.h;
        g.strokeStyle = s.P < 40 ? '#8a8a3e' : '#3f9b5c'; g.lineWidth = 2.6; g.lineCap = 'round';
        g.beginPath(); g.moveTo(sd.x, BOT - sed + 2); g.quadraticCurveTo(sd.x + sw, BOT - sed - h / 2, sd.x + sw * 1.6, BOT - sed - h); g.stroke();
      }
      // bacteria
      const nb = Math.round(clamp(s.D * 3.4, 0, bactSeeds.length));
      g.fillStyle = 'rgba(120,60,160,.8)';
      for (let i = 0; i < nb; i++) {
        const sd = bactSeeds[i];
        g.fillRect(sd.x + Math.sin(tsec * 2 + sd.p) * 4, BOT - sed - 6 - sd.y * (60 + s.D * 1.2) + Math.cos(tsec * 1.6 + sd.p) * 3, 3, 2.2);
      }
      // surface algae mat
      const na = Math.round(s.A * 3.2);
      for (let i = 0; i < na && i < algaeSeeds.length; i++) {
        const sd = algaeSeeds[i];
        g.fillStyle = 'rgba(' + (60 + (i % 5) * 8) + ',' + (150 + (i % 4) * 10) + ',55,.85)';
        g.beginPath(); g.ellipse(sd.x, SURF + 2 + Math.sin(tsec * 1.5 + sd.p) * 1.5, sd.r * 1.5, sd.r * 0.55, 0, 0, TAU); g.fill();
      }
      g.fillStyle = 'rgba(255,255,255,.25)'; g.fillRect(LX, SURF, W - LX, 2);
      // fish
      const alive = Math.round(6 * clamp((s.O - 1.5) / 4, 0, 1));
      g.font = '24px serif'; g.textAlign = 'center';
      for (let i = 0; i < fish.length; i++) {
        const f = fish[i];
        if (i < alive) {
          const x = f.x + Math.sin(tsec * f.sp + f.ph) * 55, dx = Math.cos(tsec * f.sp + f.ph);
          g.save(); g.translate(x, f.y + Math.sin(tsec * f.sp * 1.7 + f.ph) * 10); g.scale(dx > 0 ? -1 : 1, 1); g.fillText('🐟', 0, 8); g.restore();
        } else {
          g.save(); g.globalAlpha = .7; g.translate(f.x + Math.sin(tsec * .6 + f.ph) * 6, SURF + 8); g.rotate(Math.PI); g.fillText('🐟', 0, 0); g.restore();
        }
      }
      // land + farm
      g.fillStyle = '#9ec27a'; g.fillRect(0, SURF, LX, H - SURF);
      g.fillStyle = '#7da35c';
      for (let i = 0; i < 5; i++) g.fillRect(0, SURF + 10 + i * 14, LX - (p.l2 ? 38 : 4), 4);
      g.fillStyle = '#6e5238'; g.beginPath(); g.moveTo(0, BOT); g.lineTo(LX, BOT); g.lineTo(LX, H); g.lineTo(0, H); g.fill();
      if (p.l2) {
        g.fillStyle = '#3f8f5c'; g.fillRect(LX - 38, SURF - 2, 38, 16);
        g.font = '15px serif'; g.fillText('🌿🌿', LX - 19, SURF + 12);
      }
      g.font = '26px serif'; g.fillText('🚜', 36, SURF - 4);
      g.font = '600 10.5px sans-serif'; g.fillStyle = '#2f4a2c'; g.textAlign = 'center';
      g.fillText('farmland' + (p.l1 ? ' (precision use)' : ''), 55, SURF + 90);
      if (p.l2) g.fillText('buffer strip', LX - 19, SURF + 30);
      // runoff droplets
      const inflow = eutInflow(p);
      if (running && Math.random() < inflow * dt * 6 && droplets.length < 90) droplets.push({ x: rand(20, 70), y: SURF + rand(2, 12), vx: rand(25, 40), life: 0 });
      for (let i = droplets.length - 1; i >= 0; i--) {
        const d = droplets[i];
        if (running) { d.x += d.vx * dt * spd; d.life += dt; if (d.x > LX + 8) { d.y += 40 * dt; } }
        g.fillStyle = 'rgba(214,160,40,.95)'; g.beginPath(); g.arc(d.x, d.y, 2.6, 0, TAU); g.fill();
        if (d.y > SURF + 45 || d.life > 8) droplets.splice(i, 1);
      }
      // hypoxia overlay
      if (s.O < 2) {
        const a = 0.25 + 0.1 * Math.sin(tsec * 3);
        const dg = g.createLinearGradient(0, SURF, 0, BOT); dg.addColorStop(0, 'rgba(60,20,20,0)'); dg.addColorStop(1, 'rgba(60,20,20,' + (a + 0.25).toFixed(2) + ')');
        g.fillStyle = dg; g.fillRect(LX, SURF, W - LX, BOT - SURF);
        g.fillStyle = '#fff'; g.font = 'bold 14px sans-serif'; g.textAlign = 'center';
        g.fillText('☠ HYPOXIC DEAD ZONE', (LX + W) / 2, BOT - 70);
      }
      // DO badge
      g.fillStyle = 'rgba(255,255,255,.88)'; roundRect(g, W - 148, SURF + 10, 136, 28, 14); g.fill();
      g.fillStyle = s.O < 2 ? '#c24a4a' : s.O < 5 ? '#c49a3c' : '#3f8f5c'; g.font = 'bold 12.5px sans-serif'; g.textAlign = 'center';
      g.fillText('DO ' + s.O.toFixed(1) + ' mg/L', W - 80, SURF + 29);
      g.fillStyle = '#6f6a64'; g.font = '600 11px sans-serif'; g.textAlign = 'left';
      g.fillText('Year ' + (Math.floor(months / 12) + 1) + ' · month ' + (Math.floor(months % 12) + 1), 10, 18);

      /* ---- chips / meters / note ---- */
      const lit = [s.N > 10, s.A > 20, light < 0.6, s.P < 45, s.D > 14, s.O < 2];
      for (let i = 0; i < 6; i++) { chips[i].classList.toggle('lit', lit[i]); chips[i].classList.toggle('crit', i === 5 && lit[i]); }
      mv(0, 0, s.N / 60 * 100, s.N.toFixed(0));
      mv(1, 0, s.A, s.A.toFixed(0) + '%');
      mv(2, 0, light * 100, Math.round(light * 100) + '%');
      mv(3, 0, s.P, s.P.toFixed(0) + '%');
      mv(4, 0, s.D / 40 * 100, (s.D * 0.4).toFixed(1) + ' mg/L');
      mv(5, 0, s.O / 10.5 * 100, s.O.toFixed(1));
      const n = R('note'), mgmt = p.l1 || p.l2 || p.l3;
      if (p.l3 && !p.l1 && !p.l2 && s.A > 20 && s.O >= 2) setNote(n, 'warn', '<strong>Symptom treated, cause ignored.</strong> Aeration keeps oxygen up, but nutrients and algae are still high — the lake stays eutrophic and depends on the pump. Combine ③ with ① and ②.');
      else if (s.O < 2) setNote(n, 'bad', '<strong>☠ Hypoxic dead zone.</strong> Decomposers feeding on dead algae and plants have used up the oxygen: fish and invertebrates suffocate (fish kills; lost fisheries and tourism — the Gulf of Mexico effect). Try the three management levels.');
      else if (s.D > 14) setNote(n, 'warn', '<strong>⑤ Bacterial decay.</strong> A huge supply of dead organic matter means decomposer demand (BOD) climbs and dissolved oxygen is falling fast.');
      else if (s.P < 45) setNote(n, 'warn', '<strong>④ Submerged plants are dying</strong> because algae shade them — they stop producing oxygen and become more food for decomposers.');
      else if (light < 0.6) setNote(n, 'warn', '<strong>③ The algal mat blocks sunlight.</strong> Plants below the surface cannot photosynthesise.');
      else if (s.A > 20) setNote(n, 'warn', '<strong>② Algal bloom.</strong> Surplus nitrates/phosphates (the limiting nutrients) fuel explosive algal growth.');
      else if (s.N > 10) setNote(n, 'warn', '<strong>① Nutrient enrichment</strong> from fertiliser runoff is building up in the lake.');
      else setNote(n, 'good', mgmt ? '<strong>Recovered.</strong> Reducing nutrient input and restoring oxygen has returned the lake towards a healthy balance. Notice recovery is slower than collapse.' : '<strong>Healthy lake.</strong> Low nutrients, clear water, plants and fish. Drag the nutrient slider up (or press “Heavy fertiliser use”) to see eutrophication.');
      if (running || stepN % 6 === 0) drawChart();
    });
  }

  /* ================================================================
     5. Sewage treatment plant (4.4.12 HL)
     ================================================================ */
  function initSewage(root) {
    root.innerHTML = head('Build-a-Sewage-Works', 'Switch treatment stages on and off and see exactly what each one removes — and what happens to the river downstream when you skip one.') +
      '<div class="sim-body"><canvas data-r="cv" aria-label="Animated sewage treatment plant"></canvas>' +
      '<div class="sim-toggles">' +
      '<label class="sim-tog"><input type="checkbox" data-r="s0" checked><span class="dot"></span>Primary (physical)</label>' +
      '<label class="sim-tog"><input type="checkbox" data-r="s1"><span class="dot"></span>Secondary (biological)</label>' +
      '<label class="sim-tog"><input type="checkbox" data-r="s2"><span class="dot"></span>Tertiary (chemical / UV)</label>' +
      '</div>' +
      '<div class="sim-btnrow"><button class="sim-btn" data-r="none">No treatment</button><button class="sim-btn" data-r="full">Full 3-stage plant</button></div>' +
      '<div class="sim-meters" data-r="meters"></div>' +
      '<div class="sim-note" data-r="note"></div>' +
      '<div class="sim-exam"><b>Exam link:</b><span>Primary = screens + settling (solids). Secondary = activated sludge, aerobic bacteria cut BOD ~90%. Tertiary = remove N &amp; P (precipitation) and pathogens (UV/chlorine).</span></div></div>';
    const R = function (n) { return root.querySelector('[data-r="' + n + '"]'); };
    const W = 760, H = 300;
    const g = mkCanvas(R('cv'), W, H);
    const tanks = [{ x: 100, w: 150, name: 'PRIMARY', sub: 'screens + settling' }, { x: 290, w: 150, name: 'SECONDARY', sub: 'activated sludge' }, { x: 480, w: 150, name: 'TERTIARY', sub: 'precipitation + UV' }];
    const TY = 112, TH = 128, PY = 170;
    // removal efficiency by stage: [solids, organic(BOD), nutrients, pathogens]
    const EFF = [[0.60, 0.30, 0.10, 0.15], [0.85, 0.85, 0.25, 0.60], [0.50, 0.50, 0.90, 0.995]];
    const types = [
      { n: 'Solids', c: '#8a6a45', w: 0.3, shape: 'sq' },
      { n: 'Organic matter (BOD)', c: '#d9822b', w: 0.3, shape: 'ci' },
      { n: 'Nutrients (N, P)', c: '#c9c640', w: 0.2, shape: 'di' },
      { n: 'Pathogens', c: '#c24a4a', w: 0.2, shape: 'ci' }
    ];
    const meterCols = ['#8a6a45', '#d9822b', '#c9c640', '#c24a4a'];
    R('meters').innerHTML = ['Solids', 'BOD', 'Nutrients (N, P)', 'Pathogens'].map(function (m, i) { return '<div class="sim-meter"><div class="t"><span>' + m + ' left</span><span data-m="' + i + 'v"></span></div><div class="bar"><i data-m="' + i + 'b" style="background:' + meterCols[i] + '"></i></div></div>'; }).join('');
    const st = function (i) { return R('s' + i).checked; };
    R('none').onclick = function () { [0, 1, 2].forEach(function (i) { R('s' + i).checked = false; }); };
    R('full').onclick = function () { [0, 1, 2].forEach(function (i) { R('s' + i).checked = true; }); };

    let parts = [], acc = 0, sludge = [0, 0, 0];
    function remaining() {
      const rem = [1, 1, 1, 1];
      for (let s = 0; s < 3; s++) if (st(s)) for (let t = 0; t < 4; t++) rem[t] *= (1 - EFF[s][t]);
      return rem;
    }
    function spawn() {
      let r = Math.random(), t = 0, cum = 0;
      for (let i = 0; i < 4; i++) { cum += types[i].w; if (r <= cum) { t = i; break; } }
      let fate = -1;
      for (let s = 0; s < 3; s++) if (st(s) && Math.random() < EFF[s][t]) { fate = s; break; }
      parts.push({ x: 6, y: PY + rand(-4, 4), t: t, fate: fate, ph: rand(0, TAU), state: 0, tm: 0, a: 1, off: rand(-14, 14) });
    }
    register(root, function (dt, tsec) {
      acc += dt;
      while (acc > 0.11) { acc -= 0.11; if (parts.length < 260) spawn(); }
      // update
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        if (p.state === 0) {
          let inTank = -1;
          for (let k = 0; k < 3; k++) if (p.x > tanks[k].x && p.x < tanks[k].x + tanks[k].w) inTank = k;
          p.x += (inTank >= 0 ? 34 : 70) * dt;
          const targetY = inTank >= 0 ? PY + p.off + Math.sin(tsec * 1.6 + p.ph) * 16 : PY;
          p.y += (targetY - p.y) * Math.min(1, dt * 4);
          if (p.fate >= 0 && p.x > tanks[p.fate].x + 40 + (p.ph % 1) * 60) { p.state = 1; p.tm = 0; }
          if (p.x > 700) { p.state = 3; }
        } else if (p.state === 1) {
          p.tm += dt;
          if (p.t === 0 || p.t === 2) { p.y += 60 * dt; if (p.y > TY + TH - 8) { p.y = TY + TH - 8; p.state = 2; sludge[p.fate] = Math.min(sludge[p.fate] + 1, 60); } }
          else p.a -= dt * 2.2;
          if (p.a <= 0) parts.splice(i, 1);
        } else if (p.state === 2) { p.tm += dt; p.a -= dt * 0.5; if (p.a <= 0) parts.splice(i, 1); }
        else if (p.state === 3) { p.x += 40 * dt; p.y += 38 * dt; p.a -= dt * 1.2; if (p.a <= 0) parts.splice(i, 1); }
      }
      for (let k = 0; k < 3; k++) sludge[k] = Math.max(0, sludge[k] - dt * 0.6);

      // draw
      g.fillStyle = '#f4f1ec'; g.fillRect(0, 0, W, H);
      const rem = remaining();
      // river
      const bad = rem[1] > 0.35 ? 'bod' : rem[2] > 0.5 ? 'nut' : rem[3] > 0.2 ? 'path' : 'ok';
      const rc = bad === 'bod' ? ['#6b5a3a', '#4a3d25'] : bad === 'nut' ? ['#6ba45a', '#3f7a3a'] : bad === 'path' ? ['#8aa07a', '#5f7a56'] : ['#7cc0e6', '#4a96c8'];
      const rg = g.createLinearGradient(0, 0, 0, H); rg.addColorStop(0, rc[0]); rg.addColorStop(1, rc[1]);
      g.fillStyle = rg; g.fillRect(690, 0, 70, H);
      g.fillStyle = 'rgba(255,255,255,.25)';
      for (let i = 0; i < 6; i++) { const y = ((tsec * 30 + i * 52) % H); g.fillRect(698 + (i % 3) * 18, y, 14, 2); }
      g.save(); g.translate(738, 150); g.rotate(-Math.PI / 2); g.fillStyle = 'rgba(255,255,255,.85)'; g.font = 'bold 11px sans-serif'; g.textAlign = 'center'; g.fillText('RIVER', 0, 0); g.restore();
      g.font = '22px serif'; g.textAlign = 'center';
      if (bad === 'ok') g.fillText('🐟', 725, 60);
      else { g.save(); g.translate(725, 74); g.rotate(Math.PI); g.fillText('🐟', 0, 0); g.restore(); }
      // pipes
      g.fillStyle = '#9e9890';
      g.fillRect(0, PY - 12, 100, 24); g.fillRect(250, PY - 8, 40, 16); g.fillRect(440, PY - 8, 40, 16); g.fillRect(630, PY - 8, 60, 16);
      g.fillStyle = '#7a756e'; g.fillRect(0, PY - 12, 100, 4); g.fillRect(630, PY - 8, 60, 3);
      g.fillStyle = '#6f6a64'; g.font = '600 11px sans-serif'; g.textAlign = 'left'; g.fillText('🏠🏭 raw sewage in', 6, PY - 22);
      // tanks
      for (let k = 0; k < 3; k++) {
        const t = tanks[k], on = st(k);
        g.fillStyle = on ? '#d8e6f2' : '#e5e1db'; roundRect(g, t.x, TY, t.w, TH, 10); g.fill();
        const wl = g.createLinearGradient(0, TY + 12, 0, TY + TH);
        if (on) { wl.addColorStop(0, k === 1 ? '#a8c8a0' : '#9fc4e0'); wl.addColorStop(1, k === 2 ? '#8ec8e4' : '#7aa8cc'); } else { wl.addColorStop(0, '#d4d0c9'); wl.addColorStop(1, '#c4c0b9'); }
        g.fillStyle = wl; roundRect(g, t.x + 4, TY + 12, t.w - 8, TH - 16, 8); g.fill();
        // sludge pile
        g.fillStyle = 'rgba(100,70,40,.85)';
        const sh = sludge[k] / 60 * 22;
        g.beginPath(); g.moveTo(t.x + 6, TY + TH - 4); g.quadraticCurveTo(t.x + t.w / 2, TY + TH - 4 - sh * 1.6, t.x + t.w - 6, TY + TH - 4); g.fill();
        g.strokeStyle = on ? '#5b82b8' : '#b5b0a8'; g.lineWidth = 2.5; roundRect(g, t.x, TY, t.w, TH, 10); g.stroke();
        // stage specific decor
        if (on && k === 0) { g.strokeStyle = '#6f6a64'; g.lineWidth = 2; for (let b = 0; b < 5; b++) { g.beginPath(); g.moveTo(t.x + 26 + b * 5, TY + 16); g.lineTo(t.x + 26 + b * 5, TY + 70); g.stroke(); } }
        if (on && k === 1) { g.fillStyle = 'rgba(255,255,255,.8)'; for (let b = 0; b < 14; b++) { const bx = t.x + 16 + (b * 37) % (t.w - 32), by = TY + TH - 10 - ((tsec * 36 + b * 23) % (TH - 28)); g.beginPath(); g.arc(bx + Math.sin(tsec * 3 + b) * 3, by, 2 + (b % 3) * .6, 0, TAU); g.fill(); } }
        if (on && k === 2) { const gl = 0.5 + 0.3 * Math.sin(tsec * 6); g.fillStyle = 'rgba(160,110,255,' + gl.toFixed(2) + ')'; g.fillRect(t.x + 30, TY + 18, t.w - 60, 6); g.fillStyle = '#7a4fd6'; g.font = '600 10px sans-serif'; g.textAlign = 'center'; g.fillText('UV lamp', t.x + t.w / 2, TY + 38); }
        g.fillStyle = on ? '#2f4260' : '#9e9890'; g.font = 'bold 11.5px sans-serif'; g.textAlign = 'center';
        g.fillText(t.name, t.x + t.w / 2, TY - 20); g.font = '10.5px sans-serif'; g.fillText(on ? t.sub : 'BYPASSED', t.x + t.w / 2, TY - 6);
      }
      // particles
      for (let i = 0; i < parts.length; i++) {
        const p = parts[i], ty = types[p.t];
        g.globalAlpha = Math.max(0, p.a); g.fillStyle = ty.c;
        if (ty.shape === 'sq') g.fillRect(p.x - 3, p.y - 3, 6, 6);
        else if (ty.shape === 'di') { g.beginPath(); g.moveTo(p.x, p.y - 4); g.lineTo(p.x + 4, p.y); g.lineTo(p.x, p.y + 4); g.lineTo(p.x - 4, p.y); g.fill(); }
        else { g.beginPath(); g.arc(p.x, p.y, p.t === 3 ? 3.2 : 3.6, 0, TAU); g.fill(); }
        if (p.state === 1 && p.t === 3) { g.strokeStyle = '#fff'; g.lineWidth = 2; g.beginPath(); g.arc(p.x, p.y, 4 + p.tm * 14, 0, TAU); g.stroke(); }
        g.globalAlpha = 1;
      }
      // legend
      g.font = '600 10.5px sans-serif'; g.textAlign = 'left';
      for (let i = 0; i < 4; i++) { g.fillStyle = types[i].c; const lx = 14 + i * 150; g.fillRect(lx, H - 24, 9, 9); g.fillStyle = '#6f6a64'; g.fillText(types[i].n, lx + 14, H - 15); }
      // meters
      for (let i = 0; i < 4; i++) {
        const v = rem[i] * 100, el = R('meters');
        const b = el.querySelector('[data-m="' + i + 'b"]'); b.style.width = Math.max(1.5, v) + '%';
        b.style.background = v < 15 ? '#3f8f5c' : v < 40 ? '#c49a3c' : '#c24a4a';
        el.querySelector('[data-m="' + i + 'v"]').textContent = (v >= 10 ? Math.round(v) : v.toFixed(1)) + '%';
      }
      const msgs = [], any = st(0) || st(1) || st(2);
      let cls = 'good';
      if (!any) { msgs.push('<strong>Raw sewage straight into the river.</strong> Everything passes through: solids, organic matter, nutrients and pathogens.'); cls = 'bad'; }
      else {
        if (rem[1] > 0.35) { msgs.push('<strong>BOD is still high</strong> — bacteria in the river will strip the oxygen, causing fish kills. Switch on <em>secondary</em> treatment.'); cls = 'bad'; }
        if (rem[2] > 0.5) { msgs.push('<strong>Most nutrients get through</strong> — expect algal blooms and eutrophication downstream. Only <em>tertiary</em> treatment removes N &amp; P.'); if (cls !== 'bad') cls = 'warn'; }
        if (rem[3] > 0.2) { msgs.push('<strong>Pathogens remain</strong> — a health risk for bathing and drinking water. Tertiary disinfection (UV/chlorine) fixes this.'); if (cls !== 'bad') cls = 'warn'; }
        if (!msgs.length) msgs.push('<strong>Safe to discharge.</strong> Low BOD, low nutrients and almost no pathogens — the river keeps its oxygen and ecosystem.');
      }
      setNote(R('note'), cls, msgs.join('<br>'));
    });
  }

  /* ================================================================
     6. Biotic index kick-sampling (4.4.13 / 4.4.14 HL)
     ================================================================ */
  function initBiotic(root) {
    const SP = [
      { n: 'Stonefly nymph', s: 10 }, { n: 'Mayfly nymph', s: 9 }, { n: 'Caddisfly larva', s: 7 },
      { n: 'Freshwater shrimp', s: 5 }, { n: 'Damselfly nymph', s: 6 },
      { n: 'Leech', s: 3 }, { n: 'Rat-tailed maggot', s: 2 }, { n: 'Sludge worm (Tubifex)', s: 1 }
    ];
    const SITES = [
      { n: '🏔️ Site A', d: 'Moorland headwater', mix: [.30, .28, .20, .12, .05, .02, .01, .02], DO: 9.6, BOD: 0.7 },
      { n: '🌾 Site B', d: 'Downstream of farmland', mix: [.03, .08, .14, .30, .18, .12, .07, .08], DO: 6.4, BOD: 3.8 },
      { n: '🚰 Site C', d: 'Below a sewage outfall', mix: [0, 0, .01, .02, .02, .15, .25, .55], DO: 1.9, BOD: 11 },
      { n: '🕵️ Site D', d: 'Looks clean today… but?', mix: [.02, .06, .14, .32, .16, .13, .08, .09], DO: 9.1, BOD: 0.9, mystery: true }
    ];
    root.innerHTML = head('Kick-Sampling Challenge: Biotic Index', 'Sweep the net at a site, count the invertebrates, then calculate the index: <strong>Σ(tolerance score × number) ÷ total number</strong>. Sensitive species score high, tolerant ones low.') +
      '<div class="sim-body"><div class="bio-sites" data-r="sites"></div>' +
      '<div class="sim-btnrow"><button class="sim-btn primary" data-r="kick">🥅 Kick-sample (20 animals)</button><button class="sim-btn" data-r="clear">↺ Empty tray</button><span class="grow"></span><span style="font-size:12px;color:#6f6a64" data-r="chem"></span></div>' +
      '<div class="bio-tray" data-r="tray"></div>' +
      '<table class="bio-tbl"><thead><tr><th>Indicator organism</th><th>Score</th><th>Count</th><th style="width:34%">Share of sample</th></tr></thead><tbody data-r="tbl"></tbody></table>' +
      '<div class="sim-stats">' +
      '<div class="sim-stat"><div class="k">Total (N)</div><div class="v" data-r="N">0</div></div>' +
      '<div class="sim-stat"><div class="k">Taxa found</div><div class="v" data-r="S">0</div></div>' +
      '<div class="sim-stat"><div class="k">Biotic index</div><div class="v" data-r="BI">–</div></div>' +
      '<div class="sim-stat"><div class="k">Verdict</div><div class="v" style="font-size:14px;line-height:1.35;padding-top:4px" data-r="V">–</div></div></div>' +
      '<div class="sim-note" data-r="note"></div>' +
      '<div class="sim-exam"><b>Exam link:</b><span>Indicator species give an <em>indirect, time-integrated</em> measure — they reveal past pollution that a one-off chemical test can miss. Larger or repeated samples make the index more reliable.</span></div></div>';
    const R = function (n) { return root.querySelector('[data-r="' + n + '"]'); };
    let site = 0, counts = SP.map(function () { return 0; }), kicks = 0;
    const col = function (s) { return s >= 7 ? '#3f8f5c' : s >= 4 ? '#c49a3c' : '#c24a4a'; };
    R('sites').innerHTML = SITES.map(function (s, i) { return '<button class="bio-site" data-s="' + i + '"><b>' + s.n + '</b><span>' + s.d + '</span></button>'; }).join('');
    R('tbl').innerHTML = SP.map(function (s, i) { return '<tr><td>' + s.n + '</td><td><span style="color:' + col(s.s) + ';font-weight:700">' + s.s + '</span></td><td data-c="' + i + '">0</td><td><div class="bar"><i data-b="' + i + '" style="width:0;background:' + col(s.s) + '"></i></div></td></tr>'; }).join('');
    function pick(mix) { let r = Math.random(), c = 0; for (let i = 0; i < mix.length; i++) { c += mix[i]; if (r <= c) return i; } return mix.length - 1; }
    function render() {
      const N = counts.reduce(function (a, b) { return a + b; }, 0);
      let sum = 0, S = 0;
      counts.forEach(function (c, i) { sum += c * SP[i].s; if (c) S++; R('tbl').querySelector('[data-c="' + i + '"]').textContent = c; R('tbl').querySelector('[data-b="' + i + '"]').style.width = (N ? c / N * 100 : 0) + '%'; });
      R('N').textContent = N; R('S').textContent = S;
      const bi = N ? sum / N : null;
      R('BI').textContent = bi === null ? '–' : bi.toFixed(2);
      const st = SITES[site];
      R('chem').innerHTML = 'Chemistry snapshot today: <b>DO ' + st.DO + ' mg/L</b> · <b>BOD ' + st.BOD + ' mg/L</b>';
      let v = ['–', '#2f2a24'], cls = '', msg = 'Pick a site and press <strong>Kick-sample</strong>. Each press nets 20 random animals — keep sampling to build a bigger, more reliable sample.';
      if (bi !== null) {
        v = bi >= 7 ? ['Clean / unpolluted', '#3f8f5c'] : bi >= 4 ? ['Moderately polluted', '#c49a3c'] : ['Heavily polluted', '#c24a4a'];
        cls = bi >= 7 ? 'good' : bi >= 4 ? 'warn' : 'bad';
        msg = '<strong>Index ' + bi.toFixed(2) + ' from ' + N + ' animals (' + kicks + ' kick' + (kicks > 1 ? 's' : '') + ').</strong> ';
        msg += bi >= 7 ? 'Dominated by pollution-sensitive stoneflies, mayflies and caddisflies: clean, well-oxygenated water.' : bi >= 4 ? 'A mix of intermediate and tolerant species suggests organic enrichment.' : 'Mostly sludge worms and maggots — they thrive when oxygen is scarce.';
        if (st.mystery && bi < 7) { cls = 'warn'; msg += ' <br>🕵️ <strong>The mystery:</strong> chemistry looks clean today, but the animals tell a different story — a pollution event a few weeks ago wiped out sensitive species that have not yet recolonised. That is the advantage of indicator species: they integrate pollution over <em>time</em>.'; }
        if (N < 40) msg += ' <br><em>Tip:</em> small samples vary a lot — repeat the kick to improve reliability.';
      }
      R('V').textContent = v[0]; R('V').style.color = v[1]; R('BI').style.color = v[1];
      setNote(R('note'), cls, msg);
    }
    function clear() { counts = SP.map(function () { return 0; }); kicks = 0; R('tray').innerHTML = '<span class="empty">The net tray is empty — kick-sample to catch some animals!</span>'; render(); }
    root.querySelectorAll('[data-s]').forEach(function (b) { b.onclick = function () { site = +b.dataset.s; root.querySelectorAll('[data-s]').forEach(function (x) { x.classList.toggle('sel', x === b); }); clear(); }; });
    R('clear').onclick = clear;
    R('kick').onclick = function () {
      const tray = R('tray');
      if (!kicks && tray.querySelector('.empty')) tray.innerHTML = '';
      const mix = SITES[site].mix;
      for (let k = 0; k < 20; k++) {
        const i = pick(mix); counts[i]++;
        const el = document.createElement('span'); el.className = 'bio-crit';
        el.style.background = col(SP[i].s); el.style.animationDelay = (k * 45) + 'ms';
        el.textContent = SP[i].n.split(' (')[0] + ' · ' + SP[i].s;
        tray.appendChild(el);
      }
      while (tray.children.length > 80) tray.removeChild(tray.firstChild);
      kicks++; render();
    };
    root.querySelector('[data-s="0"]').classList.add('sel');
    clear();
  }

  /* ================================================================
     Boot
     ================================================================ */
  const map = { sorter: initSorter, gyre: initGyre, bod: initBOD, eut: initEut, sewage: initSewage, biotic: initBiotic };
  document.querySelectorAll('.sim[data-sim]').forEach(function (el) {
    const f = map[el.dataset.sim];
    if (f) { try { f(el); } catch (err) { console.error('sim init failed', el.dataset.sim, err); } }
  });
  requestAnimationFrame(loop);
})();
