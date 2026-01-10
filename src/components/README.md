# Component Library

This directory contains all reusable components for the Marefat Pilgrimage website, organized following a component-based architecture.

## Structure

```
components/
├── ui/              # Base UI components (Button, Input, Card, etc.)
├── layout/          # Layout components (Container, Section, PageHeader)
└── index.ts         # Central export point
```

## Design System

All components use the centralized design system defined in `/src/design-system/`:

- **Colors**: `ivory`, `charcoal`, `gold` with variants
- **Typography**: Consistent font sizes, weights, and spacing
- **Spacing**: Standardized spacing scale
- **Shadows**: Pre-defined shadow utilities
- **Border Radius**: Consistent rounded corners

## Usage Examples

### Button Component

```tsx
import { Button } from "@/components/ui";

<Button variant="primary" size="md">
  Click me
</Button>

<Button variant="outline" size="sm" fullWidth>
  Submit
</Button>
```

### Input Component

```tsx
import { Input } from "@/components/ui";

<Input
  label="Email"
  type="email"
  placeholder="you@example.com"
  required
  error="Please enter a valid email"
/>
```

### Layout Components

```tsx
import { Container, Section, PageHeader } from "@/components/layout";

<Section variant="bordered" padding="lg">
  <Container size="xl">
    <PageHeader
      badge="Category"
      title="Page Title"
      description="Page description"
    />
    {/* Content */}
  </Container>
</Section>
```

## Component Props

All components are fully typed with TypeScript and support:
- Custom className overrides
- Standard HTML attributes
- Forward refs for direct DOM access
- Accessible by default (ARIA attributes, keyboard navigation)

## Design Principles

1. **Composability**: Components are designed to be combined
2. **Consistency**: All components follow the same design patterns
3. **Accessibility**: WCAG 2.1 AA compliant by default
4. **Performance**: Optimized with React.forwardRef and memo where appropriate
5. **Type Safety**: Full TypeScript support
