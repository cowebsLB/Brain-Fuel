# Changelog

## 2026-05-21

- Added a lightweight first-demo polish pass focused on faster comprehension and ordering.
- Updated hero copy with clear offer text, location, and open-daily signal.
- Added a primary `Order on WhatsApp` button near the top with prefilled starter message.
- Added a new `Top Picks` section above category listings.
- Added a sticky mobile order bar while preserving the existing category navigation.
- Improved menu price scanability with aligned price tags.
- Shortened the opening intro timing for a quicker in-person demo flow.
- Added heavy scrolltelling presentation mode with pinned scenes and scroll-driven animation progress.
- Converted menu categories into cinematic sticky scenes with animated item reveals.
- Added frame-style section progress dots and scroll-linked background depth transitions.
- Added true intro image-sequence scrubbing (canvas-generated frames) synced to scroll progress.
- Added second image-sequence scene for `Hotties`, including scroll-scrubbed cinematic framing.
- Added frame-phase text choreography (`early/mid/late`) for staged reveal timing.
- Added `?demo=1` mode to skip opening intro and jump directly into story demo.
- Added adaptive sequence performance settings (fewer/lighter frames on mobile, full on desktop).
- Replaced spinning intro logo behavior with cinematic steam and light-sweep animation.
- Added generated professional intro background image and wired it to intro sequence rendering.
- Improved scene progress detection reliability using viewport-center active-section tracking.
- Added interaction-state coverage for primary controls (`hover`, `focus-visible`, `active`, and muted disabled-like states).
- Added robust fallback states for empty sections, missing background assets, and missing CTA links.
- Improved mobile experience: safer spacing, tighter typography, bottom-safe-area handling, and mobile-friendly progress indicator placement.
- Removed intrusive WhatsApp CTAs from mobile viewport while preserving desktop availability.
- Added cinematic ambient layers, pointer-reactive highlights, and scroll-progress rail effects with reduced-motion safeguards.

## 2026-05-18

- Implemented new Brain Fuel menu web app with React + Vite.
- Replaced starter template with componentized menu architecture.
- Added tokenized styling system and chalkboard-inspired visual language.
- Added reveal/hover/CTA/nav motion system and reduced-motion fallback.
- Added parallax section separators using local Stitch image assets.
- Added required documentation set (`index.md` and `docs/` package).
