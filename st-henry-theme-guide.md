# St. Henry and Friends Association — Theme Guide

## Pages to Build

Derived from common structure across [AFAN](https://www.amisdenewman.fr) and [Centro Internazionale](https://www.newmanfriendsinternational.org).

| Page                   | Purpose                                                        |
| ---------------------- | -------------------------------------------------------------- |
| Home                   | Hero + mission statement, upcoming events preview, latest news |
| About                  | History, mission, team/leadership, patron saint bio            |
| News / Updates         | Blog-style posts, announcements                                |
| Events                 | Calendar or list of conferences, symposia, retreats            |
| Resources              | Publications, studies, downloadable documents                  |
| Library / Bibliography | Catalog of works, translations, scholarly articles             |
| Links                  | Sister organizations (AFAN, Centro Internazionale, etc.)       |
| Contact                | Form, address, opening hours, map                              |
| Membership / Join      | Tiers, fees, sign-up                                           |

---

## Color Palette

| Role          | Hex       | Usage                                                |
| ------------- | --------- | ---------------------------------------------------- |
| Primary       | `#b01c37` | Buttons, nav active states, headings, links on hover |
| Primary Dark  | `#8a1529` | Hover states, footer background                      |
| Primary Light | `#d4a0aa` | Subtle backgrounds, tags, badges                     |
| Primary Tint  | `#f5e8eb` | Section backgrounds, card hover, alert bg            |
| Neutral 900   | `#1a1a1a` | Body text                                            |
| Neutral 600   | `#555555` | Secondary text, captions                             |
| Neutral 200   | `#e8e8e8` | Borders, dividers                                    |
| Neutral 50    | `#f9f7f7` | Page background (warm white)                         |
| Accent Gold   | `#c5973e` | Highlights, icons, decorative elements               |
| White         | `#ffffff` | Cards, nav background                                |

**Why gold accent?** Cardinal red + gold is a traditional pairing in Catholic/ecclesiastical design. Adds warmth without competing with the primary.

---

## Typography

### Heading Font: **Playfair Display**

- Serif with high contrast between thick/thin strokes
- Evokes tradition, scholarship, ecclesiastical gravitas
- Works at large sizes (titles, hero text, section headings)
- Free on Google Fonts
- **Fallback:** `"Playfair Display", Georgia, "Times New Roman", serif`

### Body Font: **Source Sans 3** (formerly Source Sans Pro)

- Humanist sans-serif designed by Adobe for readability
- Clean in long paragraphs, generous x-height
- Pairs well with high-contrast serifs like Playfair
- Supports Latin extended (French, Italian content from partner sites)
- Free on Google Fonts
- **Fallback:** `"Source Sans 3", "Segoe UI", Roboto, sans-serif`

### Why this pairing?

- **Contrast:** Serif headings + sans body creates clear visual hierarchy without extra weight
- **Readability:** Source Sans 3 reads well at 16px body size, even in dense resource/publication pages
- **Multilingual:** Both fonts have full Latin Extended coverage — critical since sister orgs publish in French and Italian
- **Tone:** Playfair signals academic/religious heritage; Source Sans keeps it modern and approachable

### Scale

```
h1: 2.5rem / 700
h2: 2rem / 700
h3: 1.5rem / 600
h4: 1.25rem / 600
body: 1rem (16px) / 400
small: 0.875rem / 400
```

---

## CSS Variables (starter)

```css
:root {
  --color-primary: #b01c37;
  --color-primary-dark: #8a1529;
  --color-primary-light: #d4a0aa;
  --color-primary-tint: #f5e8eb;
  --color-accent: #c5973e;
  --color-text: #1a1a1a;
  --color-text-secondary: #555555;
  --color-border: #e8e8e8;
  --color-bg: #f9f7f7;
  --color-white: #ffffff;

  --font-heading: "Playfair Display", Georgia, serif;
  --font-body: "Source Sans 3", "Segoe UI", Roboto, sans-serif;

  --radius: 6px;
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.08);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.1);
}
```

---

## Design Notes

- **Nav:** White bg, primary color for active/hover links. Sticky on scroll.
- **Buttons:** Primary bg `#b01c37`, white text, 6px radius. Hover → `#8a1529`.
- **Cards:** White bg, `--shadow-sm`, border-radius 6px. Used for news, events, resources.
- **Footer:** `#8a1529` bg, white/light text. Include partner org logos + links.
- **Hero:** Consider a subtle overlay of `#b01c37` at 70% opacity over imagery.
- **Gold accent:** Use sparingly — icon highlights, decorative borders, pull quotes.
