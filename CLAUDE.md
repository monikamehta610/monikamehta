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

### Step 2 — Strip shared CSS and replace with a `<link>`

Run this script (or adapt it) to refactor the downloaded file:

```python
import re

with open('public/slides/ess-3-1.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Remove the two shared style blocks (reson-widget-base and reson-widget-bw)
html = re.sub(r'<style id="reson-widget-base">.*?</style>', '', html, flags=re.DOTALL)
html = re.sub(r'<style id="reson-widget-bw">.*?</style>',  '', html, flags=re.DOTALL)

# Remove the inlined base64 @font-face for Sora (already in reson-shared.css)
html = re.sub(
    r"@font-face\s*\{[^}]*?font-family:\s*'Sora'.*?src:\s*url\(data:font/woff2;base64,[^)]+\)[^}]*\}",
    '', html, flags=re.DOTALL
)

# Inject link to shared CSS right after <head>
link_tag = '''<link rel="stylesheet" href="/slides/reson-shared.css" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Sora:wght@200;300;400;500;600;700&display=swap" rel="stylesheet" />'''

html = html.replace('<head>', f'<head>\n  {link_tag}', 1)

with open('public/slides/ess-3-1.html', 'w', encoding='utf-8') as f:
    f.write(html)
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

  <!-- ③ Slide-specific styles (layout, colors, slide-deck CSS) -->
  <style>
    /* slide-specific CSS here */
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
