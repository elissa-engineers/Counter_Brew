# Engineering Notes — Counter Brew

This document describes the engineering process behind Counter Brew: the key decisions and why they were made, the architecture, and the significant problems encountered during development and how they were diagnosed and resolved.

## 1. Concept decisions

The project brief allowed any topic, but required real curated content plus a key-based public API with client-side search/filter/pagination. Several concepts were considered based on my own personal interests and imagination, and rejected before settling on Counter Brew, and the reasoning matters:

- **Museums / worldwide directory** — rejected because the rich, filterable museum APIs (Rijksmuseum, Harvard Art Museums) return *artworks from a single institution*, not a directory of museums by country. A worldwide "museums near you" directory would have needed a thin Places API with little to filter on, which conflicts with wanting a niche, content-rich site. The idea also exposed a real tension: "worldwide + niche + rich data" can't all be satisfied at once with free APIs.
- **Music / Instruments**  — rejected because i could not find an API which met my personal vision for a website whose content is unseen before (not a search engine like Anghami for example, and not just a Youtube video dump).
- **Invented / fictional concepts (e.g. a "multiverse archive" which documented what life on earth would look like in different scenarios, like "Universe 64: The roman empire still rules" or "Universe 901: AI became the dominant species")** — rejected because the brief requires *real* content, and no key-based data API can meaningfully drive fictional content, so the API would have been decorative rather than integral.
- **Coffee drinks you can make at home without an espresso machine** — chosen because it allows genuinely curated content (a fixed set of real drinks with real methods) and a naturally filterable dataset, and because the "no espresso machine" angle gives the project a distinctive hook.

A second important decision was how to use the API. The site was split into two halves so the API integration and the curated content stay independent and each satisfies its own requirement (details in the Architecture section).

## 2. Architecture

The site is deliberately built around **two separate data sources**:

- **Local curated data** (`data/drinks.js`) — a JavaScript array of 20 drink objects, each with structured attributes (brew method, milk, temperature, sweetness, strength, equipment) and step-by-step instructions. This powers the **Browse** page and provides the client-side filtering. It is never fetched — it ships with the site.
- **Remote API data** (Spoonacular) — fetched at runtime on the **Explore** page, providing live search, pagination over fetched results, a recipe-detail modal, and loading/error/empty states.

Keeping these separate means the filtering feature (over local data) and the API integration (over fetched data) are cleanly distinct rather than tangled together.

Other structural choices:

- **ES6 classes and modules throughout**, no jQuery. Logic is separated into modules under `js/` (e.g. `DrinkList` for Browse rendering and filtering, `SpoonacularService` for API calls, `ExploreApp` for the Explore UI/state), and data is separated into `data/` files. This mirrors a data/logic separation and keeps each concern in its own file.
- **Bootstrap 5 + hand-written CSS**, with the custom stylesheet loaded *after* Bootstrap so local rules win on conflicts. Colours are defined once as CSS custom properties (a coffee palette) so the theme is consistent and adjustable from one place.
- **Static, backend-less deployment** on GitHub Pages — all JavaScript runs in the browser and the API is called client-side.

## 3. Problems encountered and how they were solved

### Folder-name casing broke the deployed site
Stylesheet and script folders were at one point referenced with uppercase names (`CSS/`, `JS/`) while the actual folders were lowercase. On Windows this made no difference (case-insensitive filesystem), so it worked locally. GitHub Pages runs on Linux, which is case-sensitive, so the deployed site would fail to load its styles and scripts. This was caught by noticing the mismatch between the referenced paths and the real folder names. Fixed by renaming the folders to lowercase in Git — using a temporary name to work around Git's own case-insensitivity (`git mv CSS css-tmp` then `git mv css-tmp css`) — and correcting every reference. The lowercase-folder rule was then documented in the project's context file to prevent it recurring.

### Empty search results were cached, so failed searches never retried
On the Explore page, a search that returned no results was being stored in the in-memory cache. Re-searching the same term then returned the cached empty result and never called the API again, so the search appeared permanently broken for that query. This was diagnosed using the browser's Network tab: a repeat search fired *zero* network requests, which pointed to the cache short-circuiting the call. Fixed by only caching responses that actually returned results, so a query that came back empty retries on the next search.

### The API key file was missing from the deployed site
After deployment, the Explore page failed silently and the console showed a "disallowed MIME type (text/html)" error for `js/config.js`. The cause: the key file was still gitignored, so it was never committed and GitHub returned its HTML 404 page in place of the missing JavaScript file (hence the MIME-type error). Because this is a static site with no backend, the key was committed (and regenerated), and the "running locally" and limitations sections of the README document that the client-side key is an accepted constraint for this kind of deployment.

### Multi-word searches returned nothing
Searching a single word worked but a two-word query (e.g. "cold brew") returned no results. Inspecting the request URL in the Network tab showed the query string needed proper URL-encoding so the space didn't break the request. Fixed by encoding the query when building the request URL.

### Spoonacular is thin on actual drinks
Testing revealed that Spoonacular, being a general recipe database, returns coffee-*flavoured* recipes and desserts rather than coffee drinks. Rather than fight this, the Explore page was reframed to present "coffee recipes and desserts" (with an on-page note), while the curated Browse page remains the source of actual drinks. This kept the API integration honest about what it returns.

### Favorites had to survive re-renders
The favorites feature stores starred drinks in `localStorage`. Because the Browse grid is rebuilt (its HTML replaced) on every filter change, a naive implementation would show favorited stars resetting whenever a filter changed. This was handled by having each card re-read the favorites store on every render, so the correct star state is restored after every rebuild, and by delegating the click handler on the container once rather than re-binding it per render.

### Deep-link scroll had to run after render
The Home featured cards deep-link to a specific drink on the Browse page and auto-open its instructions. The scroll-and-expand had to run *after* the initial card render (or it would target elements that didn't exist yet), and the scroll was decoupled from the expand so that if expanding failed, the page would still scroll to the correct drink rather than jumping to nothing.

## 4. Version control and workflow

Work was committed incrementally in small, single-purpose commits with descriptive messages, staging files by name rather than committing everything at once — a discipline adopted after an early commit accidentally bundled unrelated changes. A project context file (`CLAUDE.md`) was maintained at the repository root to keep AI-assisted code consistent with the project's architecture and constraints across sessions.

## 5. Testing

The site was checked across mobile, tablet, and desktop widths using browser dev tools, with fixes made for issues found (for example, a contact email that overflowed its footer column on narrow screens was fixed by allowing the text to wrap and stacking the footer columns on small screens). Screenshots at the three widths are included in the repository as evidence of responsive behaviour.
