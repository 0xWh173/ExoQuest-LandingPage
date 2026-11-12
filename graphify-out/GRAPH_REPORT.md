# Graph Report - ExoQuest-LandingPage  (2026-11-02)

## Corpus Check
- 40 files · ~51,791 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 4 file(s) not represented in the graph (top: .css 2, (none) 1, .ico 1)

## Summary
- 166 nodes · 277 edges · 11 communities (9 shown, 2 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Navbar.tsx
- package.json
- LegalModalContext.tsx
- compilerOptions
- cn
- dependencies
- Footer.tsx
- Button.tsx
- devDependencies
- next
- postcss.config.mjs

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `cn()` - 12 edges
3. `react` - 11 edges
4. `Container()` - 9 edges
5. `Footer()` - 9 edges
6. `lucide-react` - 7 edges
7. `next` - 7 edges
8. `Navbar()` - 6 edges
9. `scripts` - 5 edges
10. `GridBackground()` - 5 edges

## Surprising Connections (you probably didn't know these)
- `Container()` --calls--> `cn()`  [EXTRACTED]
  src/shared/components/layout/Container.tsx → src/shared/lib/cn.ts
- `Button` --calls--> `cn()`  [EXTRACTED]
  src/shared/components/ui/Button.tsx → src/shared/lib/cn.ts
- `CardHeader` --calls--> `cn()`  [EXTRACTED]
  src/shared/components/ui/Card.tsx → src/shared/lib/cn.ts
- `CardTitle` --calls--> `cn()`  [EXTRACTED]
  src/shared/components/ui/Card.tsx → src/shared/lib/cn.ts
- `CardDescription` --calls--> `cn()`  [EXTRACTED]
  src/shared/components/ui/Card.tsx → src/shared/lib/cn.ts

## Import Cycles
- None detected.

## Communities (11 total, 2 thin omitted)

### Community 0 - "Navbar.tsx"
Cohesion: 0.12
Nodes (23): lucide-react, TeamMember, CATEGORIES, FAQ_DATA, FAQItem, CTASection(), Hero(), StatsSection() (+15 more)

### Community 1 - "package.json"
Cohesion: 0.09
Nodes (20): eslintConfig, name, private, scripts, build, dev, lint, start (+12 more)

### Community 2 - "LegalModalContext.tsx"
Cohesion: 0.12
Nodes (16): react-hot-toast, react-markdown, remark-gfm, src_app_globals, jetbrainsMono, metadata, spaceGrotesk, viewport (+8 more)

### Community 3 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 4 - "cn"
Cohesion: 0.21
Nodes (12): FeatureGrid(), features, Card, CardContent, CardDescription, CardFooter, CardHeader, CardProps (+4 more)

### Community 5 - "dependencies"
Cohesion: 0.17
Nodes (12): dependencies, clsx, framer-motion, lucide-react, motion, next, react, react-dom (+4 more)

### Community 6 - "Footer.tsx"
Cohesion: 0.24
Nodes (10): framer-motion, InteractiveTerminal(), sequence, TerminalLine, Footer(), GithubIcon(), InstagramIcon(), LinkedinIcon() (+2 more)

### Community 7 - "Button.tsx"
Cohesion: 0.20
Nodes (9): motion, react, CountUp(), CountUpProps, ButtonProps, ButtonSize, ButtonVariant, sizeStyles (+1 more)

### Community 8 - "devDependencies"
Cohesion: 0.22
Nodes (9): devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @types/node, @types/react, @types/react-dom (+1 more)

## Knowledge Gaps
- **78 isolated node(s):** `eslintConfig`, `nextConfig`, `name`, `version`, `private` (+73 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 86 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `Button.tsx` to `Navbar.tsx`, `package.json`, `LegalModalContext.tsx`, `cn`, `Footer.tsx`?**
  _High betweenness centrality (0.176) - this node is a cross-community bridge._
- **Why does `next` connect `next` to `Navbar.tsx`, `package.json`, `LegalModalContext.tsx`, `Footer.tsx`?**
  _High betweenness centrality (0.121) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.112) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `name` to the rest of the system?**
  _78 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Navbar.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.12222222222222222 - nodes in this community are weakly interconnected._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.09486166007905138 - nodes in this community are weakly interconnected._
- **Should `LegalModalContext.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.11904761904761904 - nodes in this community are weakly interconnected._