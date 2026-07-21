@AGENTS.md

# Course Materials System

## File Structure

```
public/
  slides/
    reson-shared.css        ← Shared Bloome/Reson design system CSS (tokens + BW layer)
                              All slides link to this. Do NOT embed it per-slide.
    reson-init.js           ← Reson widget bridge JS (postMessage API, state, patches)
                              Reference from each slide's <head> OR inline — both work.
    ess-2-2.html            ← ESS Topic 2.2 slide deck (self-contained HTML)
    [course]-[topic].html   ← Future slides follow this naming: e.g. ess-3-1.html

src/
  data/
    courses.ts              ← Single source of truth for all courses and slides
  app/
    courses/
      layout.tsx            ← Warm-light sticky nav (back to portfolio, ESS/Bio links)
      page.tsx              ← Course hub (cards for ESS and Biology)
      [courseSlug]/
        page.tsx            ← Slide index for a course, links directly to public/slides/
  components/
    CoursesTeaser.tsx       ← Teaser section on the main portfolio page
```

---

## How to Add a New Slide

### Step 1 — Download the Bloome widget HTML
```bash
curl -s "https://bloome.im/api/widgets/YOUR-WIDGET-UUID" \
  -o public/slides/ess-3-1.html
```

### Step 2 — Clean, split, and sync with the shared CSS

Save this script as `scratch/convert_slide.py` (or execute it directly) to format the downloaded Bloome widget into a clean, presentation-ready slide deck:

```python
import sys
import re

def process_widget(input_path, output_path, title_text, topic_slug):
    with open(input_path, 'r', encoding='utf-8') as f:
        html = f.read()

    # 1. Parse stylesheet and scripts
    base_match = re.search(r'<style id="reson-widget-base">(.*?)</style>', html, re.DOTALL)
    bw_match   = re.search(r'<style id="reson-widget-bw">(.*?)</style>',   html, re.DOTALL)

    remaining_after_bw = html[bw_match.end():] if bw_match else html
    script_match = re.search(r'<script>(.*?)</script>', remaining_after_bw, re.DOTALL)

    remaining_after_script = remaining_after_bw[script_match.end():] if script_match else remaining_after_bw
    slide_style_match = re.search(r'<style>(.*?)</style>', remaining_after_script, re.DOTALL)

    remaining_after_style = remaining_after_script[slide_style_match.end():] if slide_style_match else remaining_after_script
    body_start_idx = remaining_after_style.find('\n<body>')
    if body_start_idx == -1:
        body_start_idx = remaining_after_style.find('<body>')

    body_content = remaining_after_style[body_start_idx:]
    body_match = re.search(r'<body>(.*?)</body>', body_content, re.DOTALL)

    slide_css = slide_style_match.group(1).strip() if slide_style_match else ""
    body_html = body_match.group(1).strip()

    # 2. Split body content by section comment boundaries (supports multiple comment delimiters)
    boundary_pattern = r'<!-- (?:={5,}|={20,}|═{10,})\s*(.*?)\s*(?:={5,}|={20,}|═{10,}) -->'
    matches = list(re.finditer(boundary_pattern, body_html))

    intro_content = body_html[:matches[0].start()].strip() if len(matches) > 0 else body_html
    sl_points_match = re.search(r'(\d+)\s+SL\s+Syllabus', intro_content, re.IGNORECASE)
    sl_points = sl_points_match.group(1) if sl_points_match else "Core"

    slides_list = []
    
    # Premium card-based title slide layout
    intro_content_clean = f"""<div style="text-align:center;padding:40px 0 20px">
  <div class="section-tag">IB DP Environmental Systems &amp; Societies</div>
  <h1>{title_text}</h1>
  <p class="subtitle">Subtopic {topic_slug} — New Syllabus (First Assessment 2026)<br/>Standard Level + Higher Level</p>
  <div style="margin-top:30px;display:flex;justify-content:center;gap:12px;flex-wrap:wrap">
    <div class="card" style="flex:1;min-width:180px;text-align:center;border-left:3px solid var(--blue)">
      <div style="font-size:28px;margin-bottom:4px">🌍</div>
      <div style="font-size:13px;font-weight:600">{sl_points} Syllabus Points</div>
      <div style="font-size:12px;color:var(--muted)">Topic {topic_slug}</div>
    </div>
    <div class="card" style="flex:1;min-width:180px;text-align:center;border-left:3px solid var(--orange)">
      <div style="font-size:28px;margin-bottom:4px">📊</div>
      <div style="font-size:13px;font-weight:600">Core Content Focus</div>
      <div style="font-size:12px;color:var(--muted)">Interactive Slide Lessons</div>
    </div>
  </div>
</div>"""

    intro_slide = f'<!-- ==================== SLIDE 1: TITLE ==================== -->\n<div class="slide active" data-sec="intro">\n{intro_content_clean}\n</div>'
    slides_list.append(intro_slide)

    for i in range(len(matches)):
        start = matches[i].end()
        end = matches[i+1].start() if i < len(matches) - 1 else len(body_html)
        
        label = matches[i].group(1).strip()
        content = body_html[start:end].strip()
        
        if i == len(matches) - 1:
            bottom_script_match = re.search(r'<script>(.*?)</script>\s*$', content, re.DOTALL)
            if bottom_script_match:
                content = content[:bottom_script_match.start()].strip()
                
        if content.startswith('<section>') and content.endswith('</section>'):
            content = content[9:-10].strip()
        elif content.startswith('<section class="hero">') and content.endswith('</section>'):
            content = content[22:-10].strip()
            
        data_sec = "standard"
        if "HL" in label or "hl" in label:
            data_sec = "hl"
        elif any(x in label.upper() for x in ["KEY", "EXAM", "GLOSSARY", "TAKEAWAYS", "OVERVIEW"]):
            data_sec = "summary"
        elif label in [f"{topic_slug}.1", f"{topic_slug}.2", f"{topic_slug}.3", "Overview", "OVERVIEW"]:
            data_sec = "intro"
            
        slide_html = f'<!-- ==================== SLIDE {i+2}: {label} ==================== -->\n<div class="slide" data-sec="{data_sec}">\n{content}\n</div>'
        slides_list.append(slide_html)

    deck_body = "\n\n".join(slides_list)

    # 3. Inject into the shared style presentation template
    template = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>ESS Topic {topic_slug}</title>
  <link rel="stylesheet" href="/slides/reson-shared.css" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Sora:wght@200;300;400;500;600;700&display=swap" rel="stylesheet" />
  <style>
    /* Slide layout and styling loaded from shared stylesheet /slides/reson-shared.css */
  </style>
  <script src="/slides/reson-init.js"></script>
</head>
<body class="bw">
<div id="progress" style="width:0%"></div>
<div id="deck">
SLIDE_BODY_PLACEHOLDER
</div>
<button id="prevBtn" disabled aria-label="Previous slide">‹</button>
<button id="nextBtn" aria-label="Next slide">›</button>
<script>
const slides = document.querySelectorAll('.slide');
const total = slides.length;
let current = 0;
document.getElementById('prevBtn').addEventListener('click', () => go(-1));
document.getElementById('nextBtn').addEventListener('click', () => go(1));
function goTo(idx) {
  if (idx < 0 || idx >= total) return;
  slides[current].classList.remove('active');
  current = idx;
  slides[current].classList.add('active');
  document.getElementById('prevBtn').disabled = current === 0;
  document.getElementById('nextBtn').disabled = current === total - 1;
  document.getElementById('progress').style.width = ((current + 1) / total * 100) + '%';
  document.getElementById('deck').scrollTop = 0;
}
function go(dir) { goTo(current + dir); }
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); go(1); }
  if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); go(-1); }
});
goTo(0);
</script>
</body>
</html>"""

    new_html = template.replace('{topic_slug}', topic_slug).replace('SLIDE_BODY_PLACEHOLDER', deck_body)
    new_html = re.sub(r"@font-face\s*\{[^}]*?font-family:\s*'Sora'[^}]*?src:\s*url\(data:font/woff2;base64,[^)]+\)[^}]*\}", "", new_html, flags=re.DOTALL)

    # 4. Extract any slide-specific custom classes (excluding base body/root rules) and append to shared CSS
    with open('public/slides/reson-shared.css', 'r', encoding='utf-8') as f:
        shared_css = f.read()

    css_marker = f'/* ── Slide {topic_slug} specific styles ── */'
    if css_marker not in shared_css and len(slide_css) > 10:
        cleaned_css = re.sub(r'body\s*\{.*?\}', '', slide_css, flags=re.DOTALL)
        cleaned_css = re.sub(r':root\s*\{.*?\}', '', cleaned_css, flags=re.DOTALL)
        cleaned_css = re.sub(r'\*,\*::before,\*::after\s*\{.*?\}', '', cleaned_css, flags=re.DOTALL)
        cleaned_css = cleaned_css.strip()
        if len(cleaned_css) > 10:
            with open('public/slides/reson-shared.css', 'w', encoding='utf-8') as f:
                f.write(shared_css + f"\n\n\n{css_marker}\n" + cleaned_css)

    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(new_html)
    print(f"Processed and cleaned: {output_path}")

# Run it: process_widget('public/slides/ess-3-1-raw.html', 'public/slides/ess-3-1.html', 'Biodiversity & Conservation', '3-1')
```

### Step 3 — Register the slide in `src/data/courses.ts`

```ts
// In the ESS course slides array:
{
  slug: "3-1",
  title: "Topic 3.1",
  subtitle: "Biodiversity & Conservation",
  htmlFile: "/slides/ess-3-1.html",
  level: "SL & HL",
  unit: "Unit 3",
},
```

---

## Slide HTML Template (for future reference)

Every slide HTML file should follow this structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>[Course] Topic [X.X]</title>

  <!-- ① Shared Bloome/Reson design system — tokens, BW layer, utilities -->
  <link rel="stylesheet" href="/slides/reson-shared.css" />

  <!-- ② Sora font (used by all Bloome slides) -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Sora:wght@200;300;400;500;600;700&display=swap" rel="stylesheet" />

  <!-- ③ Empty Style block (all general slide deck layouts load from /slides/reson-shared.css) -->
  <style>
    /* Slide layout and styling loaded from shared stylesheet /slides/reson-shared.css */
  </style>

  <!-- ④ Reson widget bridge (postMessage, state sync) -->
  <script>
    /* reson-init.js content OR link: <script src="/slides/reson-init.js"></script> */
  </script>
</head>
<body>
  <!-- slide content -->
  <script>
    /* slide interaction JS */
  </script>
</body>
</html>
```

---

## Design Tokens (from `reson-shared.css`)

The shared CSS defines the following key tokens that slide-specific CSS can override:

| Token | Value | Use |
|-------|-------|-----|
| `--background` | `#fbfaf8` | Page background (warm off-white) |
| `--foreground` | `#2f2a24` | Primary text |
| `--accent` | `#5a7d65` | Interactive highlights (green) |
| `--card` | `#ffffff` | Card background |
| `--border` | `#ece7e2` | Borders and dividers |
| `--font` | Inter / system-ui | Body font stack |

---

## Direct Slide URLs

Slide paths are hosted directly in the static `public/slides` folder:

| URL | File served |
|-----|-------------|
| `/slides/ess-2-2.html` | `public/slides/ess-2-2.html` |
| `/slides/ess-3-1.html` | `public/slides/ess-3-1.html` |
| `/slides/bio-2-2.html` | `public/slides/bio-2-2.html` |
