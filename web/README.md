# Mobile Landing Templates (Next.js)

This project contains multiple mobile app landing page templates built with Next.js and shadcn/ui.

## Templates

- `app/template1` - Premium iOS-style marketing layout (Lumina copy style)
- `app/template2` - Modern SaaS-style animated layout (Clarity copy style)

## Entry Routes

- `/` - Template hub / selector page
- `/template1`
- `/template2`

## Included Content Per Template

Each template includes:
- Landing page
- Collapsible FAQ section
- Legal pages:
  - `privacy`
  - `terms`
  - `contact`

## Press Kit Content

### Template 1 Press Kit

- `app/template1/presskit/reddit.md` - Long-form Reddit launch post templates
- `app/template1/presskit/reddit-short-comments.md` - Short Reddit reply snippets
- `app/template1/presskit/ios-app-description.md` - App Store-ready iOS description templates

### Template 2 Press Kit

- `app/template2/presskit/reddit.md` - Long-form Reddit launch post templates
- `app/template2/presskit/reddit-short-comments.md` - Short Reddit reply snippets
- `app/template2/presskit/ios-app-description.md` - App Store-ready iOS description templates

## Adding shadcn/ui Components

```bash
npx shadcn@latest add button
```

Components are added under `components/ui`.

## Using Components

```tsx
import { Button } from "@/components/ui/button";
```
