---
name: RankwithLeo
description: Cinematic, founder-led Agentic SEO with editorial clarity and technical precision.
colors:
  deep-green: "#081a17"
  deep-green-soft: "#0c2420"
  green-panel: "#10302a"
  warm-white: "#f4f5f2"
  mist-text: "#b9c7c3"
  quiet-line: "rgba(205, 232, 224, 0.22)"
  electric-mint: "#08f7c7"
  mint-hover: "#46f1cb"
  trace-blue: "#45a9ff"
  trace-gold: "#f2c94c"
typography:
  display:
    fontFamily: "Archivo Variable, Archivo, sans-serif"
    fontSize: "clamp(3.5rem, 5.45vw, 5.7rem)"
    fontWeight: 760
    lineHeight: 0.91
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Archivo Variable, Archivo, sans-serif"
    fontSize: "clamp(2.4rem, 5vw, 5rem)"
    fontWeight: 690
    lineHeight: 0.98
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Archivo Variable, Archivo, sans-serif"
    fontSize: "clamp(1.25rem, 2vw, 1.85rem)"
    fontWeight: 700
  body:
    fontFamily: "Archivo Variable, Archivo, sans-serif"
    fontSize: "1rem"
    fontWeight: 470
    lineHeight: 1.65
  label:
    fontFamily: "Archivo Variable, Archivo, sans-serif"
    fontSize: "clamp(0.68rem, 0.9vw, 0.88rem)"
    fontWeight: 760
    letterSpacing: "0.28em"
rounded:
  compact: "8px"
  control: "9px"
  surface: "14px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "48px"
  section: "clamp(88px, 10vw, 150px)"
components:
  button-primary:
    backgroundColor: "{colors.electric-mint}"
    textColor: "{colors.deep-green}"
    rounded: "{rounded.control}"
    padding: "0 24px"
    height: "52px"
    typography: "{typography.label}"
  button-primary-hover:
    backgroundColor: "{colors.mint-hover}"
    textColor: "{colors.deep-green}"
  button-secondary:
    backgroundColor: "rgba(8, 26, 23, 0.72)"
    textColor: "{colors.warm-white}"
    rounded: "{rounded.control}"
    padding: "0 24px"
    height: "52px"
  card:
    backgroundColor: "{colors.green-panel}"
    textColor: "{colors.warm-white}"
    rounded: "{rounded.surface}"
---

# Design System: RankwithLeo

## Overview

**Creative North Star: "The Founder’s Search Studio"**

RankwithLeo is cinematic editorial-tech: a warm, human portrait set against a deep green field, with the SEO opportunity trace acting as a precise layer of evidence and explanation. The asymmetry is intentional. Leo’s image makes accountability visible while the left-hand editorial stack keeps Agentic SEO—not generic automation—as the unmistakable lead.

The system should feel confident, direct, and technically literate without looking like a dashboard or an AI-product template. Large compressed headlines, restrained copy, generous dark space, and one electric accent make the page feel authored rather than assembled. Automation remains supporting language and never displaces SEO strategy or Leo’s judgment.

**Key Characteristics:**

- Photo-led asymmetric compositions with a clear editorial reading order.
- Deep green, warm white, and electric mint as the dominant visual vocabulary.
- Dense display type paired with calm, highly legible supporting copy.
- Data graphics used to explain an opportunity, never to imply unverified performance.
- Founder presence and human accountability before tool spectacle.

## Colors

The palette is nocturnal and warm: layered forest greens hold the interface, warm white carries editorial authority, and electric mint supplies the only strong system accent.

### Primary

- **Electric Mint:** Reserved for primary calls to action, active navigation, key words, focus rings, selection, and the opportunity path. Its rarity gives it authority.

### Neutral

- **Deep Green:** The default page field and the visual anchor for the entire brand.
- **Deep Green Soft:** A subtle sectional shift for long-form pacing; it should read as depth, not a new color block.
- **Green Panel:** Used for project artwork and contained surfaces that need separation from the page.
- **Warm White:** Primary text and high-contrast editorial content; warmer than pure white against the green field.
- **Mist Text:** Secondary copy, metadata, and explanatory content.
- **Quiet Line:** Dividers and structural borders; keep them translucent and subordinate.

### Tertiary

- **Trace Blue and Trace Gold:** Restricted to the opportunity trace and content-contained project artwork. They are explanatory data tones, not UI accents, CTA colors, or brand alternatives.

**The One Signal Rule.** Electric mint is the only strong interactive accent. Blue and gold may annotate an illustration but must not compete with mint in the interface.

**The Evidence Rule.** A colored chart line, project panel, or annotation may organize information; it must never imply measured uplift, rankings, or client results unless verified evidence is supplied.

## Typography

**Display Font:** Archivo Variable (with Archivo and sans-serif fallbacks)  
**Body Font:** Archivo Variable (with Archivo and sans-serif fallbacks)  
**Label Font:** Archivo Variable (with Archivo and sans-serif fallbacks)

**Character:** One variable grotesk carries the system. Heavy, tightly tracked headlines feel editorial and decisive; lighter body weights keep the site approachable and practical. Contrast comes from scale, weight, rhythm, and case—not extra font families.

### Hierarchy

- **Display:** Extra-bold, tightly tracked, and compact. Reserve the largest scale for the hero claim; keep line breaks deliberate and highlight only the decisive phrase in mint.
- **Headline:** Large section titles with near-solid leading. Use one thought per line and no more than one mint emphasis per heading.
- **Title:** Project, service, and process names. Strong enough to scan without competing with section headlines.
- **Body:** Calm supporting copy with generous leading and a readable maximum of roughly 65 characters per line.
- **Label:** Small, uppercase, heavily tracked text for kickers, indices, industries, and metadata. Labels orient; they do not carry paragraphs.

**The Compressed Authority Rule.** Display type is large and tightly set, but the supporting copy stays open and quiet. Do not make every text layer loud.

## Layout

The desktop canvas uses a fluid wrapper capped at 1540px with approximately 4vw side gutters. The hero fills the viewport and uses a photo-led split: content occupies the left half, Leo’s portrait occupies roughly the right 42%, and the opportunity trace crosses both to connect strategy with the founder. The search query and copy align to the same left edge; overlap is part of the composition, not accidental stacking.

Sections use generous vertical breathing room and thin dividers. Headings and context frequently form an asymmetric two-column grid. Project work uses a deliberately uneven two-column rhythm, service rows behave like editorial index entries, and process steps form a four-column sequence. Avoid a repetitive grid of identical cards.

At 1020px, desktop navigation becomes a compact menu, the portrait widens, and process steps reduce to two columns. At 760px, the hero becomes a vertical cinematic crop: the portrait occupies the upper field, the query bar is removed, the trace remains atmospheric, and copy/actions become full-width below it. All multi-column content collapses to a single readable stream; project offsets and desktop-only line breaks disappear. Minimum supported width is 320px.

**The Editorial Asymmetry Rule.** Balance visual weight without forcing equal columns. A portrait, headline, or project may dominate when the reading order remains obvious.

## Elevation & Depth

The system is flat by default. Depth comes from tonal green layers, image gradients, translucent borders, and selective blur rather than stacked shadows. The search query may use frosted translucency and a subtle inset highlight because it floats over the hero. Primary buttons receive a low ambient shadow; the mobile menu may use a deeper functional shadow so it separates from content.

**The Darkroom Rule.** Use gradients to integrate photography into the green field, never as decorative rainbow surfaces. The portrait should feel lit from a warm studio and developed into the page.

## Shapes

Corners are gently squared: 14px for image panels and major floating surfaces, 9px for controls, and 8px for compact menu items. Borders are one-pixel and low-contrast. The rounded language should feel precise and modern, not bubbly; avoid pills except where a true compact status control requires one.

Project imagery is clipped cleanly inside rounded rectangles. Long content sections remain edge-to-edge and rectangular so the page retains editorial gravity.

## Components

### Buttons

- **Primary:** Electric mint on deep green text, medium-bold, with a 52px minimum height; hero buttons increase to 64px and use the 14px surface radius.
- **Secondary:** A translucent deep-green fill with mint border and warm-white text; on hover it may invert to mint.
- **States:** Hover lifts by 2px; active compresses slightly and returns toward the surface. Every keyboard focus state uses a 3px mint outline with a 4px offset.

### Navigation

- Keep the wordmark and navigation typographically direct. The “Leo” fragment, current page, and hover state use mint.
- Desktop navigation is centered between brand and CTA. Mobile uses a native disclosure control with a contained dark panel and comfortably sized links.
- Navigation labels stay short and concrete: Services, Approach, Work, About Leo.

### Project Cards

- Use large typographic artwork or approved imagery, a restrained index/industry label, and a clear title below.
- Artwork backgrounds may vary within deep, muted blue, green, or ochre families, but must remain content-contained and quieter than mint.
- Hover moves the artwork only slightly upward. Placeholder monograms must never be presented as client logos or proof of results.

### Service Rows and Process Steps

- Service rows are ruled editorial entries, not boxed cards. Use a mint numeric index, strong title, short practical description, and a quiet action label.
- Process steps use the same index grammar with a top rule and generous space before the title. Keep the sequence to a small number of accountable stages.

### Disclosure Rows

- FAQ items use native `details`/`summary`, horizontal rules, and a mint plus that rotates when open. Preserve the visible focus treatment and generous touch target.

### Motion and Accessibility

- Entrance motion reveals the portrait, query, trace, then copy in a short stagger using the expressive ease `cubic-bezier(.16, 1, .3, 1)`.
- State transitions are brief (about 180–260ms) and limited to transform, color, or disclosure feedback. Motion clarifies sequence; it does not loop.
- Under `prefers-reduced-motion`, omit staged hero animation and smooth scrolling. Maintain semantic landmarks, a skip link, native disclosure behavior, descriptive alt text for meaningful graphics, and visible keyboard focus.
- Decorative portraits use empty alt text. Any trace that communicates meaning needs a concise description and must be labeled illustrative when it uses demo data.

## Do's and Don'ts

### Do:

- **Do** lead each major surface with Agentic SEO, a business opportunity, and visible founder accountability.
- **Do** let the warm portrait provide humanity while typography and the trace provide technical precision.
- **Do** keep electric mint scarce and meaningful: actions, active states, focus, and one decisive emphasis.
- **Do** preserve generous dark space, uneven editorial grids, and practical copy that can be verified.
- **Do** label demo data, placeholders, and unavailable outcomes honestly.

### Don't:

- **Don't** turn automation, AI agents, or Codex into the protagonist; they support Leo’s strategy and judgment.
- **Don't** introduce competing neon accents, rainbow gradients, glass-heavy panels, or generic AI dashboard motifs.
- **Don't** invent rankings, traffic gains, testimonials, client logos, or performance charts.
- **Don't** flatten the layout into repeated equal cards or center every section.
- **Don't** add decorative motion, looping traces, weak focus states, or interaction that disappears under reduced-motion preferences.
