# Design System

Centralized design tokens and system for the Marefat Pilgrimage brand.

## Brand Colors

### Ivory (Primary Background)
- `ivory.DEFAULT`: `#f7f3eb` - Main background color
- `ivory.50-500`: Shades from light to darker

### Charcoal (Primary Text)
- `charcoal.DEFAULT`: `#151515` - Main text color
- `charcoal.50-900`: Full scale from light to dark

### Gold (Accent)
- `gold.DEFAULT`: `#c7a56a` - Primary accent
- `gold.dark`: `#a0844f` - Darker variant
- `gold.soft`: `#e3cfa0` - Soft, lighter variant
- `gold.light`: `#f0e4c8` - Light variant
- `gold.pale`: `#f7f0e0` - Pale variant

## Typography

### Font Families
- **Display**: For headings and brand elements (uppercase, letter-spaced)
- **Sans**: For body text and UI elements

### Font Sizes
- `xs`: 12px (0.75rem)
- `sm`: 14px (0.875rem)
- `base`: 16px (1rem)
- `lg`: 18px (1.125rem)
- `xl`: 20px (1.25rem)
- `2xl`: 24px (1.5rem)
- `3xl`: 30px (1.875rem)
- `4xl`: 36px (2.25rem)
- `5xl`: 48px (3rem)

### Font Weights
- `normal`: 400
- `medium`: 500
- `semibold`: 600
- `bold`: 700

## Spacing Scale

- `xs`: 8px (0.5rem)
- `sm`: 12px (0.75rem)
- `md`: 16px (1rem)
- `lg`: 24px (1.5rem)
- `xl`: 32px (2rem)
- `2xl`: 48px (3rem)
- `3xl`: 64px (4rem)
- `4xl`: 96px (6rem)

## Border Radius

- `sm`: 8px
- `md`: 12px
- `lg`: 16px
- `xl`: 20px
- `2xl`: 28px
- `3xl`: 32px
- `full`: 9999px (for pills/capsules)

## Shadows

- `sm`: Subtle shadow for cards
- `md`: Medium shadow
- `lg`: Large shadow
- `xl`: Extra large shadow
- `soft`: Custom soft shadow (brand-specific)
- `2xl`: Extra large shadow

## Transitions

- `fast`: 150ms
- `base`: 200ms
- `slow`: 300ms
- `slower`: 500ms

## Usage in Tailwind

All tokens are available as Tailwind utilities:

```tsx
// Colors
<div className="bg-ivory text-charcoal border-gold">
  
// Spacing
<div className="p-md m-lg">
  
// Typography
<h1 className="text-2xl font-semibold">
  
// Shadows
<div className="shadow-soft">
```

## Design Principles

1. **Minimal Luxury**: Clean whitespace, elegant typography
2. **Calm & Trustworthy**: Soft colors, smooth transitions
3. **Accessibility First**: High contrast, readable sizes
4. **Consistency**: Same patterns throughout
