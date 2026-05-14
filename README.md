<h1 align="center">HopWINS Pages</h1>

<p align="center">
Webpage for HopWINS Lab at Johns Hopkins University<br>
Powered by Astro&nbsp;&nbsp;&nbsp;&nbsp;Deployed via Cloudflare
</p>

## Structure

```text
HopWINS-Pages/
├─ public/
│  ├─ favicon.ico
│  └─ robots.txt
├─ src/
│  ├─ content/
│  │  ├─ course/
│  │  │  ├─ index.md
│  │  │  └─ <course-id>/
│  │  │     ├─ assets/
│  │  │     ├─ index.md
│  │  │     └─ <course-page>.md
│  │  ├─ index/
│  │  │  ├─ assets/
│  │  │  └─ index.md
│  │  ├─ join/
│  │  │  └─ index.md
│  │  ├─ news/
│  │  │  └─ index.md
│  │  ├─ publication/
│  │  │  ├─ index.md
│  │  │  └─ <publication-id>/
│  │  │     ├─ assets/
│  │  │     └─ index.md
│  │  ├─ research/
│  │  │  ├─ index.md
│  │  │  └─ <research-id>/
│  │  │     ├─ assets/
│  │  │     └─ index.md
│  │  ├─ site/
│  │  │  ├─ assets/
│  │  │  └─ index.md
│  │  └─ team/
│  │     ├─ index.md
│  │     ├─ alumni/
│  │     │  └─ index.md
│  │     ├─ intern/
│  │     │  └─ index.md
│  │     ├─ phd/
│  │     │  ├─ assets/
│  │     │  ├─ index.md
│  │     │  └─ <person>.md
│  │     └─ pi/
│  │        ├─ assets/
│  │        ├─ index.md
│  │        └─ <person>.md
│  ├─ layout/
│  │  ├─ BaseLayout.astro
│  │  └─ PublicationItem.astro
│  ├─ lib/
│  │  ├─ asset-routes.ts
│  │  └─ content.ts
│  ├─ pages/
│  ├─ styles/
│  │  └─ global.css
│  └─ content.config.ts
├─ astro.config.mjs
├─ package-lock.json
├─ package.json
├─ README.md
└─ tsconfig.json
```

## Routes

| Route | Content source | Notes |
| --- | --- | --- |
| `/` | `src/content/index/index.md` and `src/content/news/index.md` | Home page with rotating images and news list |
| `/research` | `src/content/research/index.md` | Research overview page |
| `/research/<research-id>` | `src/content/research/<research-id>/index.md` | Research detail page |
| `/publication` | `src/content/publication/index.md` | Publication list grouped by year |
| `/publication/<publication-id>/<asset>` | `src/content/publication/<publication-id>/assets/` | Publication assets such as PDFs |
| `/project/<publication-id>` | `src/content/publication/<publication-id>/index.md` | Project page generated only when the publication has `project: true` |
| `/project/<publication-id>/<asset>` | `src/content/publication/<publication-id>/assets/` | Project assets |
| `/team` | `src/content/team/` | Team page |
| `/course` | `src/content/course/index.md` | Course list and teaching history |
| `/course/<course-id>` | `src/content/course/<course-id>/index.md` | Course detail page |
| `/course/<course-id>/<course-page>` | `src/content/course/<course-id>/<course-page>.md` | Course extra pages |
| `/course/<course-id>/<asset>` | `src/content/course/<course-id>/assets/` | Course assets such as PDFs, images, and slides |
| `/join` | `src/content/join/index.md` | Join page |

## Content Rules

### General

All website content should live under `src/content`. Most page-level content files use this shape:

```md
---
title: "Page Title"
---

## Section Heading

Markdown body content goes here.
```

The page template usually owns the visible page title, so Markdown body sections should normally start with `##`. Course detail pages and course subpages can omit frontmatter and start directly with Markdown body content. Markdown body rendering supports headings through `######`, links, lists, blockquotes, inline code, fenced code blocks, images, and tables.

Use `public/` only for site-root files such as:

- `favicon.ico`
- `robots.txt`

Put content-specific binary files next to their content:

- Home images: `src/content/index/assets/`
- Site icons and logos: `src/content/site/assets/`
- Research images: `src/content/research/<research-id>/assets/`
- Publication PDFs and project images: `src/content/publication/<publication-id>/assets/`
- Course PDFs and images: `src/content/course/<course-id>/assets/`
- Team photos: `src/content/team/<category>/assets/`

Astro optimizes imported images that go through `astro:assets`. PDF, ZIP, and similar files are served as static responses by the asset routes in `src/pages/**/[...asset].ts`.

Prefer compressed `webp` or well-compressed `jpg` files for large photos. Keep large original editable images outside the repository.

`alt` text is written to the rendered `<img alt="...">` attribute. Use useful alt text for meaningful images and an empty string for decorative logos or icons.

### Site Settings

Global site settings live in `src/content/site/index.md`.

This file controls:

- `siteUrl`: canonical site URL used by Astro and the sitemap
- `labName`: lab name shown in the header and metadata
- `labIcon`: optional lab logo in `src/content/site/assets`
- `nav`: navigation items in display order
- `footer.contact`: address, email, and contact icons
- `footer.school`: school logo and department name

Example:

```yaml
---
siteUrl: "https://example-lab.edu"
labName: "Example Lab"
labIcon:
    src: "lab-logo.svg"
nav:
    - id: "home"
      label: "Home"
    - id: "research"
      label: "Research"
    - id: "publication"
      label: "Publication"
    - id: "team"
      label: "Team"
    - id: "course"
      label: "Course"
    - id: "join"
      label: "Join"
footer:
    contact:
        location: "Building Name, Street Address, City, State ZIP, Country"
        email: "contact@example-lab.edu"
        addressIcon:
            src: "address-icon.svg"
            alt: ""
        emailIcon:
            src: "email-icon.svg"
            alt: ""
    school:
        name: "Department Name\nSchool Name"
        logo:
            src: "school-logo.svg"
            alt: "School logo"
---
```

### Home Page

Home page content lives in `src/content/index/index.md`.

Supported fields:

- `title`: large home page title
- `description`: optional short lab description; empty means hidden
- `newsLimit`: number of news entries shown before the "Show more" button
- `heroImages`: rotating home images belong in `src/content/index/assets/`

Example:

```yaml
---
title: "Example Lab"
description: "A concise lab description for the home page."
newsLimit: 6
heroImages:
    - src: "hero-01.webp"
      alt: "Short description of the first hero image"
    - src: "hero-02.webp"
      alt: "Short description of the second hero image"
---
```

Use wide landscape images for the home hero. The layout center-crops images, so keep the most important visual content near the center.

### News List

News lives in `src/content/news/index.md`.

Example:

```yaml
---
title: "News"
news:
    - date: 2026-01
      text: "A lab update with an optional [external link](https://example.org)."
    - date: 2025-12
      text: "Another short one-sentence update."
---
```

Notes:

- The home page uses `title` from this file for the news section heading
- Dates are displayed as month plus year
- `text` supports Markdown links
- Keep each news item short, ideally one sentence

### Research Page

Research overview content lives in `src/content/research/index.md`.

Each research area is listed in `areas`. The `id` must match a folder under `src/content/research/`.

Example:

```yaml
---
title: "Research"
pubLimit: 2
areas:
    - id: "research-area-id"
      name: "Research Area Name"
      description: "Short overview for the research overview page."
      pubLimit: 3
      image:
          - src: "overview.webp"
            alt: "Short description of the research image"
---
```

Research detail pages live in `src/content/research/<research-id>/index.md`, with images in `src/content/research/<research-id>/assets/`.

Example research detail page:

```md
---
title: "Research Detail Title"
---

## Overview

Research detail content.
```

The overview page can show recent publications on the right side of each research row. Publications are linked to research areas by each paper's `research` field in `src/content/publication/index.md`. Use `pubLimit` on the research page for a default limit, or on an individual area to override it. Use `0` to hide recent publications for a specific area.

### Publication Page

The publication list lives in `src/content/publication/index.md`.

Example:

```yaml
---
title: "Publication"
publication:
    - id: "2026-CONF-example-paper"
      title: "Full Example Paper Title"
      shortTitle: "Short Example Paper Title"
      authors:
          - "Author A"
          - "Author B"
      date: "2026-01-15"
      venue: "Conference Name '26"
      award: "Optional Award Name"
      highlight: true
      research:
          - "research-area-id"
      project: true
      links:
          website: "https://example.org/paper"
          PDF: "paper.pdf"
          Code: "https://example.org/code"
          YouTube: "https://example.org/video"
---
```

Field notes:

- `id` should match the publication folder name when local assets or a project page are needed
- `title` is the full paper title
- `shortTitle` is used only in compact research-page publication lists
- `date` controls sorting and year grouping
- `venue` is displayed above the title
- `award` is displayed as a highlighted badge
- `highlight: true` gives the publication block stronger visual emphasis
- `research` links the paper to research areas by research `id`
- `project: true` creates a `/project/<id>/` page from `src/content/publication/<id>/index.md` and adds a Project action link first
- `links.website` is the primary paper URL; when set, the paper title links to it and `website` is not repeated as a separate button
- Other `links` entries become action buttons in the same order they are written

Publication assets belong in `src/content/publication/<publication-id>/assets/`.

Relative publication links such as `PDF: "paper.pdf"` resolve to `/publication/<publication-id>/paper.pdf`.

PDF action links include a download hint. Browser behavior can still vary depending on browser settings and PDF handling.

### Project Page

A publication project page is generated when:

1. The paper in `src/content/publication/index.md` has `project: true`
2. `src/content/publication/<publication-id>/index.md` exists

Example:

```md
---
title: "Example Project Title"
---

## Overview

Project description.

![System overview](overview.webp)
```

Project page Markdown images can reference files by filename. Image files should be stored in `src/content/publication/<publication-id>/assets/`.

### Team Page

Team content lives in `src/content/team/`.

The top-level page title is in `src/content/team/index.md`.

Example:

```yaml
---
title: "Team"
---
```

The supported team sections are currently:

- `pi`
- `phd`
- `intern`
- `alumni`

Each section has an `index.md` whose `title` controls the section heading.

#### PI and PhD Members

PI and PhD section titles live in `src/content/team/pi/index.md` and `src/content/team/phd/index.md` respectively.

Example section index:

```yaml
---
title: "Section Title"
---
```

Individual PI and PhD files live in `src/content/team/pi/<person>.md` and `src/content/team/phd/<person>.md`.

Example:

```yaml
---
title: "Member Name"
name: "Member Name"
role: "Member Role"
order: 1
homepage: "https://example.org/member"
email: "member@example-lab.edu"
photo:
    src: "member-photo.webp"
    alt: "Member Name"
---
```

Photos belong in the corresponding category assets folder `src/content/team/pi/assets/` and `src/content/team/phd/assets/`

`order` controls ordering inside PI and PhD card sections. If omitted, entries fall back to alphabetical sorting by title or name after ordered entries. If `photo` is omitted, the site renders initials from the member name.

#### Interns

Interns are grouped by role in `src/content/team/intern/index.md`.

Example:

```yaml
---
title: "Intern"
members:
    Master Student:
        - name: "Student Name A"
          homepage: "https://example.org/student-a"
    Undergrad Student:
        - name: "Student Name B"
          homepage: "https://example.org/student-b"
        - "Student Name C"
    Visiting: []
---
```

Empty lists are allowed. Multiple people in the same role are displayed in one row, separated by commas.

#### Alumni

Alumni are listed in `src/content/team/alumni/index.md`.

Example:

```yaml
---
title: "Alumni"
columns:
    name: "Name"
    role: "Role"
    period: "Period"
    position: "Current Position"
alumni:
    - name: "Alumni Name"
      role: "Former Role"
      period: "2025/01 - 2025/12"
      position: "Current position or affiliation"
      homepage: "https://example.org/alumni"
---
```

`columns` maps internal field names to visible table headers.

### Course Page

The course overview lives in `src/content/course/index.md`.

This file controls the course list and teaching history.

Example:

```yaml
---
title: "Course"
courses:
    - id: "example-course"
      title: "Example Course Title"
      shortName: "Example Course"
      code: "XX.000.000"
      semester: "2026 Spring"
      description: "Short course description."
teaching:
    - semester: "2026 Spring"
      id: "example-course"
---
```

Field notes:

- `id` must match a folder under `src/content/course`
- `title` is the course title shown in the course card and detail page title band
- `shortName` is used in the teaching history list
- `code` and `semester` are shown under the course detail page title
- Course cards and teaching rows follow the order written in this file

Each course folder should contain at least `src/content/course/<course-id>/index.md` and `src/content/course/<course-id>/assets/`.

Additional Markdown files become subpages:

```text
src/content/course/example-course/schedule.md  -> /course/example-course/schedule
src/content/course/example-course/project.md   -> /course/example-course/project
```

Inside course Markdown:

- Link to another course page with `./schedule` or `./project`
- Link to a course asset with `slides.pdf`
- Add an image with `![Caption](figure.webp)`

Course assets should be stored in `src/content/course/<course-id>/assets/`.

Example:

```text
src/content/course/example-course/assets/
├─ lecture-01.pdf
├─ overview.webp
└─ reading-list.pdf
```

Example course detail page:

```md
## Overview

Course description and policy content.
```

### Join Page

The join page lives in `src/content/join/index.md`.

Example:

```md
---
title: "Join"
---

## Prospective Students

Short application guidance with an optional [external link](https://example.org/apply).
```

The join page is intentionally simple and is fully driven by Markdown body content.

## Development Notes

### Styling

Global styling lives in `src/styles/global.css`.

The current visual system is based on JHU-inspired colors:

- `lab-blue`
- `lab-blue-dark`
- `lab-sky`
- `lab-teal`
- `lab-gold`

Reusable layout components live in `src/layout/`.

Page-specific rendering lives in `src/pages/`.

### SEO and Sitemap

The sitemap is generated by `@astrojs/sitemap` during build. The canonical site URL is read from `src/content/site/index.md`.

Keep this value synchronized with `public/robots.txt`.

### Cloudflare Pages Deployment

Cloudflare Pages build configuration:

```text
Build command: npm run build
Build output: dist
```

Configure the Cloudflare Pages to monitor the GitHub repository so that new commits to `main` will automatically trigger a build and update the CDN deployment.

## Maintenance Notes

### Local Setup

Requirements:

- Node.js `>=22.12.0`
- npm

Quick start:

```bash
git clone git@github.com:HopWINS/HopWINS-Pages.git
cd HopWINS-Pages
npm install
npm run dev
```

### Available Commands

| Command | Purpose |
| ------- | ------- |
| `npm run dev` | Start the local development server |
| `npm run check` | Run Astro content and type checks |
| `npm run build` | Build the static site into `dist/` |
| `npm run preview` | Preview the production build locally |

### Git Workflow

Suggested commit prefixes:

- `content:` content-only changes under `src/content`
- `feat:` new site behavior or layout features
- `fix:` bug fixes
- `docs:` README or documentation updates
- `release:` release preparation

Before pushing:

```bash
git status --short
npm run check
npm run build
```
