# ExoQuest — Official Landing Platform

The next-generation cyber simulation, dynamic attack-defense range, and cybersecurity verification platform for universities, enterprises, and elite security operators.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: [Next.js](https://nextjs.org/) (App Router, React 19)
- **Language**: TypeScript (`.tsx`)
- **Graphics & Visuals**:
  - WebGL Procedural GLSL Shaders (`DarkVeil.tsx`)
  - WebGL 3D Curved Cylinder Gallery (`CircularGallery.tsx`)
  - 3D Spring-Physics Stacked Carousel (`CardSwap.tsx`)
  - Glitch & Pointer-Distortion Canvas (`FuzzyText.tsx`)
- **Styling**: Cyberpunk design system, CSS variables, glassmorphism, responsive media queries
- **Typography**: Space Grotesk & JetBrains Mono

---

## 📂 Project Structure

```text
ExoQuest-LandingPage/
├── public/
│   ├── favicon.ico
│   └── images/
│       ├── into-the-void-2.jpg
│       ├── logo.png
│       └── operation-blackout.jpg
├── src/
│   ├── app/
│   │   ├── globals.css         # Global tailwind & stylesheet imports
│   │   ├── layout.tsx          # Root layout & font configuration
│   │   └── page.tsx            # SPA controller & hash route manager
│   ├── components/
│   │   ├── effects/
│   │   │   ├── DarkVeil.tsx    # WebGL neural shader background
│   │   │   └── FuzzyText.tsx   # Canvas glitch text effect
│   │   ├── events/
│   │   │   └── CircularGallery.tsx # 3D WebGL event cards carousel
│   │   ├── layout/
│   │   │   ├── Footer.tsx      # 5-column navigation & legal triggers
│   │   │   └── SiteHeader.tsx  # Sticky header & responsive mobile drawer
│   │   ├── legal/
│   │   │   └── LegalModals.tsx # Terms, Privacy, and Refund policy dialogs
│   │   ├── sandbox/
│   │   │   └── InteractiveTerminal.tsx # Exploit typing simulation
│   │   ├── solutions/
│   │   │   └── CardSwap.tsx    # 3D spring-physics solution cards
│   │   └── views/
│   │       ├── ContactView.tsx # Contact channels & inquiry form
│   │       ├── HomeView.tsx    # Hero, stats, vision/mission, events
│   │       ├── ProductsView.tsx# Practice platform, CTF-as-a-service, learn
│   │       └── SolutionsView.tsx # Solutions by audience host
│   └── styles/
│       ├── CardSwap.css        # 3D stack carousel CSS
│       ├── CircularGallery.css # WebGL events gallery CSS
│       └── style.css           # Core cyberpunk design system
├── next.config.mjs
├── package.json
└── tsconfig.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm

### Development
```powershell
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```powershell
npm run build
npm start
```
