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
│  │  ├─ config/site.json
│  │  ├─ course/
│  │  ├─ index/index.md
│  │  ├─ join/
│  │  ├─ news/index.md
│  │  ├─ publication/
│  │  ├─ research/
│  │  └─ team/
│  ├─ layout/
│  │  ├─ BaseLayout.astro
│  │  └─ PublicationItem.astro
│  ├─ lib/content.ts
│  ├─ pages/
│  │  ├─ course/
│  │  ├─ research/
│  │  ├─ index.astro
│  │  ├─ join.astro
│  │  ├─ publication.astro
│  │  └─ team.astro
│  ├─ styles/global.css
│  └─ content.config.ts
├─ astro.config.mjs
├─ package-lock.json
├─ package.json
├─ README.md
└─ tsconfig.json
```
