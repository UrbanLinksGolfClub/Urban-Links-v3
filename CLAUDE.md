# CLAUDE.md — Frontend Website Rules

## Always Do First
- **Invoke the `frontend-design` skill** before writing any frontend code, every session, no exceptions.

## Reference Images
- Reference artboards live in `design-reference/` (exported from Claude Design). Match layout, spacing, typography, and color exactly. Swap in placeholder images via `https://placehold.co/` only where the real asset isn't in `assets/` yet.
- Screenshot your output, compare against the reference, fix mismatches, re-screenshot. Do at least 2 comparison rounds. Stop only when no visible differences remain or the user says so.

## Local Server
- Install once: `npm install` then `npx playwright install chromium`.
- Start the dev server: `npm run serve` (serves the project root at `http://localhost:3000`). Start it in the background before screenshotting.
- Screenshot: `node screenshot.mjs http://localhost:3000 [label]` — saves to `./temporary screenshots/screenshot-N[-label].png` (auto-incremented, never overwritten).
- Read the saved PNG with the Read tool to visually compare against the matching file in `design-reference/`.
- When comparing, be specific: "heading is 32px but reference shows ~24px", "card gap is 16px but should be 24px".
- Check: spacing/padding, font size/weight/line-height, colors (exact hex), alignment, border-radius, shadows, image sizing.

## Image Optimization (hard requirement)
- Never commit a raw camera/export image straight into `assets/`. Resize to the actual display width (hero backgrounds: ~2400px desktop / ~900px mobile) and compress before committing.
- Keep untouched originals in `assets/originals/`.
- Any hero or full-bleed background image needs a `-mobile` variant swapped in below 769px (CSS `@media` or `<img srcset>`), and the LCP hero should get a `<link rel="preload">` split by `media` for mobile vs. desktop.

## Brand Assets
- Check `assets/` before designing. If a logo or defined color palette exists, use it exactly — do not invent brand colors.

## Anti-Generic Guardrails
- **Colors:** Never use default Tailwind palette (indigo-500, blue-600, etc.). Pick a custom brand color and derive from it.
- **Shadows:** Never use flat `shadow-md`. Use layered, color-tinted shadows with low opacity.
- **Typography:** Never use the same font for headings and body. Pair a display/serif with a clean sans. Apply tight tracking (`-0.03em`) on large headings, generous line-height (`1.7`) on body.
- **Gradients:** Layer multiple radial gradients. Add grain/texture via SVG noise filter for depth.
- **Animations:** Only animate `transform` and `opacity`. Never `transition-all`. Use spring-style easing.
- **Interactive states:** Every clickable element needs hover, focus-visible, and active states. No exceptions.
- **Images:** Add a gradient overlay (`bg-gradient-to-t from-black/60`) and a color treatment layer with `mix-blend-multiply`.
- **Spacing:** Use intentional, consistent spacing tokens — not random Tailwind steps.
- **Depth:** Surfaces should have a layering system (base → elevated → floating), not all sit at the same z-plane.

## Hard Rules
- Do not add sections, features, or content not in the reference.
- Do not "improve" a reference design — match it.
- Do not stop after one screenshot pass.
- Do not use `transition-all`.
- Do not use default Tailwind blue/indigo as primary color.
