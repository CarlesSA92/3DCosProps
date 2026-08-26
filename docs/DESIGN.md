---
name: Forge & Fidelity
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#d0c5af'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#99907c'
  outline-variant: '#4d4635'
  surface-tint: '#e9c349'
  primary: '#f2ca50'
  on-primary: '#3c2f00'
  primary-container: '#d4af37'
  on-primary-container: '#554300'
  inverse-primary: '#735c00'
  secondary: '#c8c6c5'
  on-secondary: '#313030'
  secondary-container: '#474746'
  on-secondary-container: '#b7b5b4'
  tertiary: '#bfcdff'
  on-tertiary: '#082b72'
  tertiary-container: '#97b0ff'
  on-tertiary-container: '#254188'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffe088'
  primary-fixed-dim: '#e9c349'
  on-primary-fixed: '#241a00'
  on-primary-fixed-variant: '#574500'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#dbe1ff'
  tertiary-fixed-dim: '#b4c5ff'
  on-tertiary-fixed: '#00174b'
  on-tertiary-fixed-variant: '#27438a'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
  metallic-gold: '#D4AF37'
  deep-obsidian: '#0D0D0D'
  surface-grey: '#1A1A1A'
  electric-blue: '#007FFF'
  text-dim: '#A1A1A1'
typography:
  display-xl:
    fontFamily: Space Grotesk
    fontSize: 72px
    fontWeight: '700'
    lineHeight: 80px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  container-max-width: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
  section-gap: 120px
---

## Brand & Style

The design system moves away from the literal "dragon scale" background of the original site toward a sophisticated **Corporate Modern** aesthetic with **Glassmorphic** accents. It targets a "Pro-Maker" audience—individuals who appreciate the technical precision of 3D printing and the artistic soul of high-fidelity replicas. 

The emotional response should be one of "Premium Craftsmanship." By utilizing deep ink-blacks and metallic accents, the UI creates an immersive "workshop" environment that feels both high-tech and high-fantasy. Large product photography is treated as the primary visual hero, supported by a structured, grid-based layout that conveys reliability and professional service.

## Colors

The palette is rooted in a "Dark Mode First" philosophy to minimize visual noise and maximize the impact of high-fidelity renders and photography. 

- **Primary (Metallic Gold):** Used sparingly for critical CTAs, progress indicators in the multi-step form, and active navigation states. It evokes the quality of high-end trophies and hardware.
- **Secondary (Surface Grey):** Utilized for card backgrounds and container surfaces to provide separation from the deep background.
- **Neutral (Deep Obsidian):** The canvas color for all pages, providing a true-black base that enhances contrast.
- **Electric Blue:** Reserved strictly for technical feedback, such as link hovers in the footer or specific 3D-file interaction cues.

## Typography

This design system uses a triple-font strategy to balance character with utility. 

- **Headlines (Space Grotesk):** A sharp, geometric sans-serif that feels technical and forward-looking. Large display sizes use tight tracking for a high-impact, editorial look.
- **Body (Hanken Grotesk):** A versatile, highly legible sans-serif for long-form service descriptions and project details. 
- **Labels (JetBrains Mono):** Used for metadata, technical specifications (e.g., "Scale: 1:1", "Material: Resin"), and form labels to reinforce the "maker" and "code" aesthetic.

## Layout & Spacing

The layout follows a **Fixed Grid** approach for desktop to maintain the premium, curated feel of an art gallery. 

- **Grid Model:** A 12-column grid with 24px gutters. Content blocks typically span 4, 6, or 8 columns to maintain significant whitespace on either side, preventing the UI from feeling cluttered.
- **Rhythm:** Generous vertical spacing (Section Gaps) of 120px separates different service offerings and portfolio highlights.
- **Responsive Behavior:** On mobile, margins shrink to 16px and the grid collapses to a single column. Cards transition from a multi-column row to a vertical stack with 32px of spacing between elements.

## Elevation & Depth

Visual hierarchy is achieved through **Tonal Layers** and **Glassmorphism**:

- **Layer 0 (Base):** #0D0D0D.
- **Layer 1 (Cards/Surfaces):** #1A1A1A with a subtle 1px border (#FFFFFF10).
- **Layer 2 (Overlays/Modals):** A frosted glass effect using a background blur (16px) and a semi-transparent dark tint. This is used for the navigation menu and quick-view 3D models.
- **Depth:** Instead of heavy shadows, depth is communicated via "Inner Glow" effects on buttons and subtle 1px outlines that catch the "light" from the top, mimicking physical edges of machined parts.

## Shapes

The shape language is **Soft (0.25rem)** to maintain a professional, architectural feel. 

Sharp corners feel too aggressive (Brutalist), while highly rounded corners feel too consumer-soft. A slight radius on all cards, buttons, and input fields provides a modern touch without sacrificing the "industrial" character of 3D manufacturing. Icons should follow this same principle, utilizing a consistent stroke weight and slightly rounded caps.

## Components

- **Buttons:** Primary buttons use a solid Gold background with black JetBrains Mono text. Secondary buttons use a "Ghost" style with a 1px border and a subtle hover fill.
- **Cards:** Product and project cards use a "Media-First" layout. The image occupies the top 70% of the card, with metadata and labels in monospaced type below. Hovering on a card should subtly scale the image (1.05x) and increase the border opacity.
- **Input Fields:** Dark themed with a 1px #3D3D3D border. Upon focus, the border transitions to Metallic Gold.
- **Multi-step Form:** For commissions, use a progress bar at the top consisting of thin gold lines. Each step should be encapsulated in a Glassmorphic container to keep the user focused on the specific input requirements.
- **Chips:** Small, rectangular tags for "Category" (e.g., *Anime*, *Game*) with a low-opacity Gold background and gold text.