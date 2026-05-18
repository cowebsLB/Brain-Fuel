# Architecture

## Component Structure

- `App.jsx`: main composition and section rendering loop.
- `Header`, `Hero`, `MenuSectionCard`, `ParallaxSeparator`, `MobileCategoryNav`, `Footer`: UI subsystems.

## Data Flow

- `src/data/menuData.js` stores category metadata, menu items, CTA links, and section separator mappings.
- `App.jsx` maps over `menuSections` to render cards and separators predictably.

## Styling Strategy

- `src/styles/tokens.css`: design tokens.
- `src/styles/base.css`: reset, typography baseline, layout wrappers.
- `src/styles/components.css`: component-level visuals.
- `src/styles/motion.css`: animation and transition behavior.
- `src/styles/accessibility.css`: focus and reduced-motion safeguards.

## Assets

- Local assets in `public/assets` (logo + separator images sourced from local Stitch exports).