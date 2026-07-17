# SYJ EDUCATE

**Learn Modern Software Engineering by Building Real Projects with Open Source AI.**

SYJ EDUCATE is a free, open-source learning ecosystem teaching AI Engineering, Backend Development, Database Engineering, Frontend Engineering, Cybersecurity, OSINT, Automation, SaaS Development, and CRM Development through production-grade projects — not toy tutorials.

Live site: https://shalimoosavi.github.io/SYJ-Educate/

## What's inside

- **9 learning tracks** — each with a description, skills learned, technologies, difficulty, estimated duration, and real projects.
- **13 industry projects** — healthcare, agriculture, logistics, transportation, cloud kitchen, restaurant, retail, education, finance, real estate, manufacturing, customer support, and small business.
- **A fully static site** — pure HTML, CSS, and JavaScript, deployable to GitHub Pages with zero build step.

## Tech stack (this website)

- HTML5 (semantic, accessible markup)
- CSS3 (custom design system, no framework)
- Vanilla JavaScript (theme toggle, mobile nav, terminal animation, counters)
- Zero external JS dependencies

## Running locally

This is a static site with no build step. Clone the repository and open `index.html` in a browser, or serve it locally:

```bash
git clone https://github.com/SHalimoosavi/SYJ-Educate.git
cd SYJ-Educate
python3 -m http.server 8080
# visit http://localhost:8080
```

## Project structure

```
SYJ-Educate/
├── index.html
├── about.html
├── tracks.html
├── projects.html
├── roadmap.html
├── community.html
├── open-source.html
├── faq.html
├── contact.html
├── privacy.html
├── terms.html
├── 404.html
├── css/main.css
├── js/main.js
├── images/
├── icons/
├── robots.txt
├── sitemap.xml
├── site.webmanifest
├── browserconfig.xml
├── humans.txt
├── LICENSE
└── README.md
```

## Deploying to GitHub Pages

1. Push this repository to GitHub.
2. In **Settings → Pages**, set the source to the `main` branch, root directory.
3. Update the canonical URLs, Open Graph URLs, and JSON-LD `@id`/`url` fields across the HTML files if you deploy under a different domain or path than `https://shalimoosavi.github.io/SYJ-Educate/`.
4. Replace the favicon, apple-touch-icon, and `images/og-cover.png` placeholders with your final brand assets if desired — the current versions are generated SVG/PNG marks, not stock imagery.

## Contributing

Contributions are welcome — new lessons, bug fixes, new industry projects, or entirely new tracks.

1. Open an issue or discussion first for anything beyond a small fix.
2. Fork the repository and create a feature branch.
3. Submit a pull request describing what changed and why.

See the [Open Source](https://shalimoosavi.github.io/SYJ-Educate/open-source.html) page for the full contribution guide.

## License

MIT © Syed Ali Hasan Moosavi / SAYANJALI NEXUS PRIVATE LIMITED — see [LICENSE](./LICENSE).
