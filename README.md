<div align="center">

# HopWINS-Pages

Website for HopWINS Lab at Johns Hopkins University

Powered by Astro&nbsp;&nbsp;&nbsp;&nbsp;Deployed via Cloudflare

</div>

## Architecture

```text
HopWINS-Pages/
├─ public/
├─ src/
│  ├─ content/
│  │  ├─ course/
│  │  │  ├─ [...course]/
│  │  │  │  ├─ assets/
│  │  │  │  ├─ index.md
│  │  │  │  └─ [...course-page].md
│  │  │  └─ index.md
│  │  ├─ index/
│  │  │  ├─ assets/
│  │  │  └─ index.md
│  │  ├─ join/
│  │  │  └─ index.md
│  │  ├─ news/
│  │  │  └─ index.md
│  │  ├─ publication/
│  │  │  ├─ [...publication]/
│  │  │  │  ├─ assets/
│  │  │  │  └─ index.md
│  │  │  └─ index.md
│  │  ├─ research/
│  │  │  ├─ [...research]/
│  │  │  │  ├─ assets/
│  │  │  │  └─ index.md
│  │  │  └─ index.md
│  │  ├─ site/
│  │  │  ├─ assets/
│  │  │  └─ index.md
│  │  └─ team/
│  │  │  ├─ alumni/
│  │  │  |  └─ index.md
│  │  │  ├─ intern/
│  │  │  |  └─ index.md
│  │  │  ├─ phd/
│  │  │  │  ├─ assets/
│  │  │  |  ├─ index.md
│  │  │  |  └─ [...phd].md
│  │  │  ├─ pi/
│  │  │  │  ├─ assets/
│  │  │  │  ├─ index.md
│  │  │  |  └─ [...pi].md
│  │  │  └─ index.md
│  ├─ layout/
│  │  ├─ BaseLayout.astro
│  │  └─ PublicationItem.astro
│  ├─ lib/
│  │  ├─ asset-routes.ts
│  │  └─ content.ts
│  ├─ pages/
│  │  ├─ course/
│  │  ├─ project/
│  │  ├─ publication/
│  │  ├─ research/
│  │  ├─ index.astro
│  │  ├─ join.astro
│  │  ├─ publication.astro
│  │  └─ team.astro
│  ├─ styles
│  │  └─ global.css
│  └─ content.config.ts
├─ astro.config.mjs
├─ package-lock.json
├─ package.json
├─ README.md
└─ tsconfig.json
```
