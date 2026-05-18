---
name: Brain Fuel Chalkboard System
colors:
  surface: '#19120e'
  surface-dim: '#19120e'
  surface-bright: '#413733'
  surface-container-lowest: '#140d09'
  surface-container-low: '#221a16'
  surface-container: '#261e1a'
  surface-container-high: '#312824'
  surface-container-highest: '#3d332e'
  on-surface: '#f0dfd8'
  on-surface-variant: '#dbc1b6'
  inverse-surface: '#f0dfd8'
  inverse-on-surface: '#382e2a'
  outline: '#a38c82'
  outline-variant: '#55433b'
  surface-tint: '#ffb692'
  primary: '#ffb692'
  on-primary: '#562000'
  primary-container: '#8a3f12'
  on-primary-container: '#ffba99'
  inverse-primary: '#96481b'
  secondary: '#fcb798'
  on-secondary: '#4f250f'
  secondary-container: '#6a3a23'
  on-secondary-container: '#e8a688'
  tertiary: '#8ecdfc'
  on-tertiary: '#00344e'
  tertiary-container: '#005a83'
  on-tertiary-container: '#91d0ff'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdbcb'
  primary-fixed-dim: '#ffb692'
  on-primary-fixed: '#341100'
  on-primary-fixed-variant: '#783204'
  secondary-fixed: '#ffdbcc'
  secondary-fixed-dim: '#fcb798'
  on-secondary-fixed: '#341001'
  on-secondary-fixed-variant: '#6a3a23'
  tertiary-fixed: '#c9e6ff'
  tertiary-fixed-dim: '#8ecdfc'
  on-tertiary-fixed: '#001e2f'
  on-tertiary-fixed-variant: '#004b6f'
  background: '#19120e'
  on-background: '#f0dfd8'
  surface-variant: '#3d332e'
typography:
  headline-lg:
    fontFamily: Bricolage Grotesque
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Bricolage Grotesque
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-sm:
    fontFamily: Bricolage Grotesque
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  headline-lg-mobile:
    fontFamily: Bricolage Grotesque
    fontSize: 32px
    fontWeight: '800'
    lineHeight: '1.1'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
  container-max: 1200px
---

## Brand & Style

This design system is built on the "Chalkboard Café" aesthetic—a blend of artisanal warmth and modern clarity. It targets a community of thinkers, creators, and students who seek a cozy, "local shop" digital environment. The personality is tactile, intellectual, and inviting.

The style leverages **Tactile Minimalism**. It uses deep, textured backgrounds to simulate a physical chalkboard while maintaining a clean, systematic UI. Decorative elements should feel hand-drawn or etched, directly referencing the woodcut-style illustration and steam motifs found in the brand logo. The emotional goal is to evoke the comfort of a neighborhood café where ideas are brewed as carefully as the coffee.

## Colors

The palette is anchored in a high-contrast dark mode to mimic a slate chalkboard. 

- **Main Background (#111111):** A deep, near-black that serves as the "chalkboard" surface.
- **Surface/Card (#1c1c1c):** A slightly lighter gray to create subtle depth for containers and elevated sections.
- **Chalk White (#f7f3ea):** An off-white, warm ivory used for primary headings and high-priority text to prevent harsh eye strain.
- **Muted Gray (#cfc7bb):** A low-contrast dust tone for secondary information and metadata.
- **Coffee Orange (#8a3f12):** The primary brand accent, used for calls to action, active states, and highlights.
- **Dark Coffee (#4a210c):** A secondary accent for hover states, deep borders, and subtle categorization.

## Typography

Typography is used to create a "hand-lettered" feel for display text while ensuring high performance for functional text.

- **Headlines (Bricolage Grotesque):** Chosen for its quirky, organic, and slightly irregular shapes that mimic the personality of hand-drawn chalkboard lettering. Use for all major headings.
- **Body (Hanken Grotesk):** A clean, contemporary sans-serif that provides a professional contrast to the display font. It ensures long-form content remains readable against the dark background.
- **Labels & Mono (JetBrains Mono):** Used for small metadata, tags, and "technical" café details (like timestamps or prices) to add a modern, precise touch to the artisanal aesthetic.

## Layout & Spacing

This design system utilizes a **Fixed Grid** approach for desktop to create the feeling of a framed chalkboard menu, while transitioning to a fluid model on mobile.

- **Desktop:** 12-column grid with a 1200px max-width. Use generous 64px outer margins to give the content "room to breathe" against the dark background.
- **Rhythm:** A 4px baseline grid ensures vertical consistency. Components should generally use 16px, 24px, or 32px padding to maintain a relaxed, non-corporate feel.
- **Margins:** On mobile, margins reduce to 16px. Content should stack vertically, but maintain horizontal padding within cards to preserve the "framed" look.

## Elevation & Depth

Depth is conveyed through **Tonal Layering** and **Subtle Textures** rather than heavy shadows.

- **Tonal Layers:** Level 0 is the `background_hex` with a subtle noise/chalk grain texture. Level 1 (Cards/Surfaces) uses `surface_hex`.
- **Outlines:** Instead of drop shadows, use 1px or 2px solid borders in `secondary_accent` (#4a210c) or a low-opacity `text_secondary` to define edges. This mimics the wooden frames or chalk outlines of a physical board.
- **Texture:** Apply a very low-opacity grain overlay (2-3% opacity) across the entire UI to break up flat digital colors and reinforce the tactile chalkboard theme.

## Shapes

The shape language is **Soft (0.25rem base)**. 

While the aesthetic is artisanal, overly rounded "bubble" shapes are avoided to keep it modern. The sharpest corners (0px) are reserved for large structural containers (like the main app frame), while interactive elements like buttons and cards use the soft radius to feel approachable. 

Use **Rounded-LG (0.5rem)** for primary cards and **Rounded-XL (0.75rem)** for featured imagery to create a friendly, "cushioned" visual hierarchy.

## Components

- **Buttons:** Primary buttons use `primary_color_hex` (#8a3f12) with `text_primary` font. The style is flat but uses a 2px "shadow border" of `secondary_accent` to create a stamped, tactile look.
- **Cards:** Background: `surface_hex`. Border: 1px `dark coffee`. Cards should feel like "sections" on a large menu.
- **Input Fields:** Dark backgrounds (#111111) with a 1px `muted gray` bottom-border only, simulating a line of chalk.
- **Chips/Tags:** Use `secondary_accent` backgrounds with uppercase `label-md` typography.
- **Decorative Dividers:** Use horizontal lines that look like a "chalk stroke"—slightly tapered at the ends or with a variable weight.
- **Iconography:** Use line-based icons with a slightly "wobbly" or hand-drawn path quality. Avoid perfect geometric icons.