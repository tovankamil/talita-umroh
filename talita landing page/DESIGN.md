---
name: Majestic Pilgrimage
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1b1b1b'
  surface-container: '#1f1f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353535'
  on-surface: '#e2e2e2'
  on-surface-variant: '#d0c5af'
  inverse-surface: '#e2e2e2'
  inverse-on-surface: '#303030'
  outline: '#99907c'
  outline-variant: '#4d4635'
  surface-tint: '#e9c349'
  primary: '#f2ca50'
  on-primary: '#3c2f00'
  primary-container: '#d4af37'
  on-primary-container: '#554300'
  inverse-primary: '#735c00'
  secondary: '#c8c5ca'
  on-secondary: '#303033'
  secondary-container: '#47464a'
  on-secondary-container: '#b6b4b8'
  tertiary: '#cdcecf'
  on-tertiary: '#2e3132'
  tertiary-container: '#b1b3b4'
  on-tertiary-container: '#434546'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffe088'
  primary-fixed-dim: '#e9c349'
  on-primary-fixed: '#241a00'
  on-primary-fixed-variant: '#574500'
  secondary-fixed: '#e4e1e6'
  secondary-fixed-dim: '#c8c5ca'
  on-secondary-fixed: '#1b1b1e'
  on-secondary-fixed-variant: '#47464a'
  tertiary-fixed: '#e1e3e4'
  tertiary-fixed-dim: '#c5c7c8'
  on-tertiary-fixed: '#191c1d'
  on-tertiary-fixed-variant: '#454748'
  background: '#131313'
  on-background: '#e2e2e2'
  surface-variant: '#353535'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 64px
    fontWeight: '700'
    lineHeight: 72px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-md:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
  section-gap: 80px
---

## Brand & Style
The design system is centered on the concepts of "Divine Elegance" and "Trustworthy Luxury." It caters to a discerning audience seeking Umrah and travel services that feel exclusive, spiritual, and meticulously planned. 

The visual style is **Premium Modern**, blending deep dark backgrounds with luminous gold accents to evoke a sense of nighttime in the holy cities. It utilizes **Glassmorphism** for secondary UI layers to maintain depth without cluttering the high-contrast aesthetic. The emotional response is one of serenity, prestige, and absolute reliability.

## Colors
This design system utilizes a high-contrast palette to establish a premium feel. 

- **Primary (Gold):** Used for calls to action, active states, and critical branding accents. It represents quality and the spiritual "light."
- **Core Background (Solid Black):** The primary canvas for the application, providing a cinematic backdrop for imagery.
- **Surface (Zinc-900):** Used for cards, navigation bars, and containers to create subtle separation from the pure black background.
- **Contrast Surface (Gray-50):** Reserved for specific "Light Mode" sections, such as white-paper documents, detailed itineraries, or formal terms, to improve long-form readability.
- **Text:** White is the default for dark surfaces (87% opacity for secondary body), and Black is used exclusively on Gray-50 surfaces.

## Typography
The typography strategy pairings high-fashion editorial aesthetics with modern application usability.

- **Headlines:** Uses a high-contrast serif to convey heritage and prestige. Display sizes should utilize tighter letter spacing to maintain a "locked" premium look.
- **Body & UI:** Uses a soft, geometric sans-serif for maximum clarity in travel details and booking flows.
- **Labels:** Always set in the sans-serif, often with slight tracking (letter spacing) for a sophisticated, "branded" feel on buttons and small metadata.

## Layout & Spacing
The layout follows a **Fixed Grid** philosophy for desktop to maintain the "magazine" feel, while transitioning to a fluid model for mobile.

- **Desktop:** 12-column grid with generous 48px outer margins. Use large vertical section gaps (80px+) to allow the design to breathe.
- **Alignment:** Content should be center-aligned within the 1280px container.
- **Hierarchy:** Critical information (package price, dates) should be isolated with significant whitespace to emphasize importance.

## Elevation & Depth
Depth is created through "Luminous Layering" rather than traditional heavy shadows.

- **Tonal Layers:** The base is #000000. Elements raised one level use #18181B. 
- **Glassmorphism:** Navigation menus and modal overlays use a background blur (12px to 20px) with a 10% white tint and a 1px border of #D4AF37 at 20% opacity.
- **Glows:** Primary buttons and featured cards may feature a very soft, diffused gold outer glow (color: #D4AF37, alpha: 0.15, blur: 30px) to simulate a light source.

## Shapes
The shape language is **Soft and Structural**. 

We avoid fully rounded "bubble" shapes to maintain a professional, architectural aesthetic. Standard components use a 4px (0.25rem) radius, while larger containers like hero images or package cards use 8px (0.5rem). This subtle rounding retains the sharpness of a high-end brand while feeling approachable.

## Components

### Buttons
- **Primary:** Solid Gold (#D4AF37) background with Black text. No border. On hover, background shifts to a slightly lighter gold with a soft outer glow.
- **Secondary:** Transparent background with a 1px Gold border. Text is Gold. On hover, background becomes 10% Gold opacity.
- **Tertiary:** White text with a subtle underline that expands on hover.

### Cards (Travel Packages)
- Background: Zinc-900.
- Border: 1px solid at 10% Gold opacity.
- Imagery: Should feature high-quality photography with a subtle dark gradient overlay at the bottom for text legibility.

### Input Fields
- Background: Solid Black.
- Border: 1px Solid Zinc-700.
- Focus State: Border changes to Gold (#D4AF37) with a 2px inner shadow.

### Chips & Badges
- Used for "Featured," "Luxury," or "Trending."
- Small, uppercase text with 1px gold borders and 2px border radius.

### Navigation Bar
- Fixed top, using Glassmorphism (Backdrop blur) with a thin gold bottom-border stroke (10% opacity). 
- Brand logo should always be in Gold or White.