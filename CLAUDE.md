# Counter Brew

> Café drinks you can make on your kitchen counter — no espresso machine.

This file is context for Claude Code. Read it before making changes. It describes an individual, graded, full-stack **front-end** project (Lebanese University, Faculty of Engineering — Full Stack Development Final Project 2026).

---

## Concept

A small, deployed website about café-style coffee drinks that can be made at home **without an espresso machine**. Cheap tools stand in for the machine — moka pot, AeroPress, Vietnamese phin filter, cezve, handheld milk frother. The "no machine" angle is the project's distinctive hook and shows up in the UI and copy, not just the data.

## Architecture — two separate data sources

These are graded on **different** rubric lines and stay distinct. Do not merge them.

- **Source A — local, curated content.** A JS array of 20 drink objects in `data/drinks.js`, shipped in the repo. Powers the **Browse** page. This is the graded "your own content." It is never fetched.
- **Source B — remote API.** The Spoonacular recipe API, called from the browser at runtime. Powers the **Explore** page with search and pagination over the *fetched* data, plus loading/error/empty states. This is the graded "API integration."

## Pages

- `index.html` — Home: concept intro, the no-machine hook, hero, two-way section, featured drinks, links into both sections.
- `drinks.html` — Browse: renders the 20 curated drinks as cards; client-side **filtering** over the local list (brew method, milk, hot/iced, sweetness); a "How to make" detail on each card; live result count.
- `explore.html` — Explore: search box queries Spoonacular; results render as cards with **pagination**; clicking a result fetches full recipe details in a modal.

## Tech requirements (hard constraints)

- Semantic HTML5; hand-written CSS3 in `css/styles.css`, loaded **after** Bootstrap so local rules win on conflict.
- **Bootstrap 5** and **Flexbox** for layout; responsive across mobile / tablet / desktop.
- All JavaScript as **ES6 classes** using modules (`import`/`export`). **No jQuery**, no pre-ES6 syntax.
- Consistent navbar on every page; routing via plain `<a href>` anchors between the three HTML files.
- Live site must load on a phone with **no console errors**. Deployed on GitHub Pages.

## Custom front-end requirement (assigned, graded)

**Sticky footer with social links and contact info.** Sticks to the bottom of the viewport even on short pages, identical on every page, built once and reused. Implemented via a Flexbox column layout on the page body (not `position: fixed`). Explained in a code comment and in the README.

## API spec (Explore page)

- **Spoonacular** — requires free registration + API key (satisfies the "key-based public API" rule).
- Demonstrates: fetch -> display in a styled interface -> search + pagination **over fetched data** -> proper **loading, error, and empty** states.
- Free tier is limited per day: results are cached in memory to avoid redundant calls (empty results are NOT cached, so failed searches retry).
- **Key handling:** the key lives in `js/config.js`. Because this is a static, backend-less site deployed on GitHub Pages, `config.js` is committed so the live site works, and the key is therefore visible in the browser — an accepted constraint for a client-side project, disclosed in the README. The key carries no billing and is rate-limited.
- Note: Spoonacular is a general recipe database, so results are coffee-flavoured recipes and desserts, not only drinks. The Explore page is framed accordingly; the curated Browse page holds the actual drinks.

## Drink object schema (`data/drinks.js`)

```js
{
  id: "cold-brew",              // unique slug
  name: "Cold brew",
  brewMethod: "cold steep",     // canonical: moka pot / french press / pour-over / cold steep / boiled / instant/whisked
  temp: "iced",                 // hot / iced
  milk: "none",                 // none / a description (steamed, frothed, condensed, ...)
  sweetness: "none",            // none / low / sweet   (filterable)
  strength: "medium",           // light / medium / strong
  equipment: ["jar", "strainer"],
  method: ["Step 1 ...", "Step 2 ..."],  // ordered home instructions
  notes: ""                     // short description / origin
}
```

The 20 entries were drafted with AI assistance from real, sourced facts (ratios, origins, methods), **with the instructor's explicit permission**, and reviewed and edited by the student. This is disclosed in the README's AI-use appendix.

## Repository structure

```
counter-brew/
├── index.html            Home
├── drinks.html           Browse — curated 20
├── explore.html          Explore — Spoonacular API
├── css/styles.css        hand-written, loaded after Bootstrap
├── js/
│   ├── main.js           entry; ES6 modules
│   ├── SpoonacularService.js   API calls + in-memory cache
│   ├── ExploreApp.js     Explore UI, state, pagination, modal
│   ├── DrinkList.js      Browse cards + filtering
│   └── config.js         Spoonacular key (committed for static deploy)
├── data/drinks.js        20 curated entries
├── assets/img/           logo, hero image
├── .gitignore
└── README.md             includes AI-use appendix
```

## Constraints & gotchas

- **Serve over http, not `file://`.** ES6 modules and `fetch` fail on double-click. Use VS Code Live Server in dev.
- **Lowercase folder names** (`css/`, `js/`) — GitHub Pages runs on Linux and is case-sensitive; uppercase paths break the live site even though they work on Windows.
- **Commit discipline is graded.** Small, meaningful, descriptive commits across the whole period.
- **Originality is checked.** Near-identical projects are flagged; keep code and content original.
- **Evidence:** screenshots at mobile, tablet, desktop widths go in the repo.

## Build constraints (every task)

- **No console errors.** Every page must load and run with a clean browser console — a hard grading line.
- **Static front-end only.** No backend, server, database, build step, or Node runtime. All JS runs in the browser; the API is called client-side.

## Search / filter / pagination split (do not rearrange)

- **Browse page (drinks.html)** — client-side **filtering** over the local curated list: brew method, milk, hot/iced, sweetness.
- **Explore page (explore.html)** — **search + pagination** over the *fetched* Spoonacular results, with loading/error/empty states.

Keep filtering on Browse and search+pagination on Explore.

## How to work in this repo

- Prefer small, single-purpose changes that map to one descriptive commit; suggest a commit message after each.
- When unsure about page names, schema fields, or scope, ask rather than assume.