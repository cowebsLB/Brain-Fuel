# Key Decisions and Rationale

## Why React + Vite

React gives maintainable component structure, while Vite provides fast local development and simple static build output.

## Why data-driven menu rendering

The menu is rendered from `menuData.js` to avoid repeated markup and make updates to products/prices safer.

## Why transform-based parallax

Parallax uses `transform` updates via `requestAnimationFrame` for smoother behavior and less jank than fixed background attachment.

## Why restrained motion

Animations are intentionally subtle and short to support menu usability rather than decorative overload.

## Why mandatory reduced-motion fallback

Reduced-motion support is built in to keep accessibility and comfort for motion-sensitive users.