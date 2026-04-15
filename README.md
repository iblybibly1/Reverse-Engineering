# 🏆 EquineShow Online — Online Horse Show Platform

A modern, production-ready online horse show platform built with Next.js 15 and Tailwind CSS v4.

## ✨ Features

- **Homepage** — Hero slideshow, featured competitions, stats, how-it-works, CTA
- **Competitions Page** — Grid view of all shows (upcoming & past)
- **Competition Detail** — Class listing with entry counts
- **Class Gallery** — Winner highlighted + all entries with modal zoom viewer
- **Image Modal** — Fullscreen viewer with keyboard navigation (← → Escape)
- **Slideshow** — Auto-play with pause on hover, arrows + dot controls
- **Sponsors** — Sponsor showcase + package tiers
- **About** — Mission, values, contact
- **Responsive** — Mobile-first design for all screen sizes
- **SEO** — Meta tags, OpenGraph, semantic HTML

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build for production

```bash
npm run build
npm start
```

---

## 📂 Project Structure

```
horse-show-platform/
├── app/                        # Next.js App Router pages
│   ├── page.tsx                # Homepage
│   ├── competitions/
│   │   ├── page.tsx            # All competitions
│   │   └── [id]/
│   │       ├── page.tsx        # Competition detail
│   │       └── classes/[classId]/page.tsx  # Class gallery
│   ├── about/page.tsx
│   ├── sponsors/page.tsx
│   └── layout.tsx
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── ui/
│   │   ├── Slideshow.tsx       # Auto-play slideshow
│   │   ├── ImageModal.tsx      # Fullscreen image viewer
│   │   ├── SkeletonCard.tsx
│   │   └── Badge.tsx
│   ├── competitions/
│   │   ├── CompetitionCard.tsx
│   │   └── ClassCard.tsx
│   └── gallery/
│       └── GalleryGrid.tsx     # Winner + entries grid
├── data/
│   └── competitions.json       # ← EDIT THIS to add shows
├── lib/
│   ├── data.ts                 # Data helpers
│   └── imageLoader.ts          # Image URL utilities
└── public/
    └── images/
        ├── competitions/       # ← PUT COMPETITION IMAGES HERE
        │   └── {show-id}/
        │       ├── banner.jpg
        │       └── {class-id}/
        │           ├── winner.jpg
        │           ├── entry1.jpg
        │           └── entry2.jpg
        └── slideshow/          # ← Homepage slideshow images
            ├── slide1.jpg
            ├── slide2.jpg
            └── slide3.jpg
```

---

## 🖼️ Adding a New Competition

### Step 1 — Add images

```
public/images/competitions/my-new-show/
├── banner.jpg
├── class-best-mare/
│   ├── winner.jpg      ← must be named winner.jpg
│   ├── entry1.jpg
│   └── entry2.jpg
```

### Step 2 — Update competitions.json

```json
{
  "id": "my-new-show",
  "name": "My New Show 2025",
  "date": "July 10, 2025",
  "description": "Description here.",
  "status": "upcoming",
  "banner": "/images/competitions/my-new-show/banner.jpg",
  "classes": [
    {
      "id": "class-best-mare",
      "name": "Best Mare",
      "description": "Class description.",
      "folder": "/images/competitions/my-new-show/class-best-mare/",
      "winner": "winner.jpg",
      "entries": ["entry1.jpg", "entry2.jpg"]
    }
  ]
}
```

---

## 🌐 Deploy to Vercel

1. Push to GitHub
2. Import repo at [vercel.com](https://vercel.com)
3. Click **Deploy** — no configuration needed

## 🌐 Deploy to GitHub Pages

In `next.config.ts`, add:

```ts
output: 'export',
images: { unoptimized: true }
```

Then `npm run build` — deploy the `out/` folder.

---

## 🎨 Customisation

- **Brand colours**: Edit `app/globals.css`
- **Logo**: Edit `components/layout/Navbar.tsx`
- **Slideshow images**: Drop files into `public/images/slideshow/` and update `data/competitions.json`
- **Sponsors**: Update the sponsors array in `data/competitions.json`
