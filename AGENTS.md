# Landing Page Project Starter

This file defines the default implementation standards for all landing page projects in this workspace.

## Required Tech Stack
- Next.js
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Motion (for animations)

## Package Manager Standard
- Use **Bun** as the default package manager.
- Prefer `bun add`, `bun remove`, `bun run`, and `bunx`.
- Do not use npm, pnpm, or yarn unless explicitly required by a project constraint.
- If `bun` is not available in `PATH`, use `~/.bun/bin/bun` and `~/.bun/bin/bunx`.

## Project Setup Standard
- Initialize projects in the current root directory (same level as `AGENTS.md`).
- Do not create a nested app folder during bootstrap.
- Ensure `package.json` is at the root, alongside `AGENTS.md`.

## Fast Bootstrap (Non-Interactive)
Use this sequence for consistent setup speed:

1) Scaffold Next.js (TypeScript + Tailwind v4 + App Router + Bun)

```bash
bunx --bun create-next-app@latest . \
  --typescript --tailwind --eslint --app --use-bun --no-src-dir \
  --import-alias "@/*" --yes --skip-git
```

2) Initialize shadcn/ui (local project config + theme tokens)

```bash
bunx --bun shadcn@latest init --defaults --base-color neutral --yes
```

3) Add at least one shadcn/ui primitive used in the page

```bash
bunx --bun shadcn@latest add button --yes
```

4) Add Motion

```bash
bun add motion
```

## Setup Fallbacks (Important)
- If current folder name contains spaces/capital letters and `create-next-app` rejects `.`:
  - Scaffold into a temporary lowercase folder in the workspace, then move files to root.
  - Example:

```bash
bunx --bun create-next-app@latest landing-temp \
  --typescript --tailwind --eslint --app --use-bun --no-src-dir \
  --import-alias "@/*" --yes --skip-git
rsync -a landing-temp/ ./
rm -rf landing-temp
```

- If Bun fails with `unable to write files to tempdir` in sandboxed runs:
  - Re-run command with elevated permissions in Codex.
  - Do not switch package managers.

- Avoid `next/font/google` in initial scaffold if network access may be restricted.
  - Prefer local/system font variables first, then add hosted fonts later if needed.

## Asset Organization
- Store all image assets in Next.js `public/` directory.
- Use clear subfolders when needed (e.g. `public/images/hero`, `public/images/logos`).
- Reference images from root-relative paths (e.g. `/images/hero/main-visual.webp`).

## UI Defaults
- Default theme must be **light mode**.
- Do not ship dark mode unless explicitly requested for the project.

## Branch Naming Convention
- Use: `feature/xxx`
- Replace `xxx` with a short, descriptive kebab-case name.
- Examples:
  - `feature/hero-redesign`
  - `feature/pricing-section`
  - `feature/lead-form-optimization`

## Implementation Notes
- Prefer reusable, composable sections and components.
- Keep copy structure and layout optimized for conversion-focused landing pages.
- Keep TypeScript strict and avoid `any` unless unavoidable.
- For initial delivery, prioritize a complete hero section with one clear primary CTA.
- Keep setup commands non-interactive (`--yes`, `--defaults`) to reduce iteration time.

## Landing Page Best Practices

### Visual Direction
- Define a clear visual system before building: typography scale, spacing scale, color palette, and component style.
- Use intentional typography pairings; avoid generic default font stacks unless brand requires it.
- Use strong visual hierarchy: clear section headings, short supporting copy, and consistent CTA emphasis.
- Keep layouts clean and breathable with consistent spacing rhythm.
- Use tasteful gradients, textures, or shapes for depth instead of flat, lifeless backgrounds.

### Conversion-Focused Structure
- Use this high-converting section order by default:
  1. Hero (value proposition + primary CTA)
  2. Social proof (logos, testimonials, metrics)
  3. Features/benefits
  4. Product/service preview
  5. Objection handling (FAQ or guarantees)
  6. Final CTA
- Keep one primary CTA goal per page and repeat it consistently.
- Use specific, benefit-driven copy instead of vague marketing language.

### UX and Interaction
- Design mobile-first; then refine tablet and desktop layouts.
- Keep interactions subtle and meaningful (scroll reveals, hover states, CTA feedback).
- Avoid animation noise; motion should support clarity, not distract.
- Ensure clear states for interactive elements (default, hover, active, focus, disabled).

### Accessibility
- Meet WCAG contrast standards for text and key UI controls.
- Provide visible focus styles for keyboard users.
- Use semantic HTML landmarks and heading order.
- Add alt text for meaningful images and labels for form controls.

### Performance and SEO
- Optimize Core Web Vitals (especially LCP and CLS).
- Use `next/image` for responsive image delivery.
- Compress/resize media assets before shipping.
- Keep bundle size lean; avoid unnecessary dependencies.
- Add metadata, Open Graph tags, and structured page titles/descriptions.

### Component and Code Quality
- Build sections as reusable components under a clear structure (e.g. `components/sections/*`).
- Keep Tailwind utility usage consistent; extract repeated patterns into shared components.
- Use shadcn/ui primitives first, then customize for brand expression.
- Keep strict TypeScript types for props, APIs, and form data.

### Content Standards
- Headlines should be clear, specific, and outcome-driven.
- Paragraphs should be short and scannable.
- Use real, credible proof points wherever possible (customer quotes, metrics, outcomes).
- End every major section with a clear next action.
