# Counter Brew

Café drinks you can make on your kitchen counter — no espresso machine required.

**Live site:** https://kalse3.github.io/Counter_Brew/
**Repository:** https://github.com/kalse3/Counter_Brew

## Author

Elissa Kastoun

## Disclaimer
I am not a big fan of coffee, in fact I rarely have any. This project was inspired solely by my best friend and my sisters' big admiration (addiction) of coffee.

## API used

**Spoonacular API** (https://spoonacular.com/food-api) — a key-based public API requiring free registration.

It powers the **Explore** page, where a live search queries Spoonacular's `complexSearch` endpoint and displays results with pagination over the fetched data, plus a detail view (a second API call) for each recipe's ingredients and instructions. The page handles loading, error, and empty states.

Note on scope: Spoonacular is a general recipe database, so a coffee search returns coffee-*flavoured* recipes and desserts (bakes, sweets, treats) rather than only drinks. This is deliberate and disclosed on the page — the curated **Browse** page holds the actual home drinks, while **Explore** is framed as the wider world of coffee-flavoured cooking.

## Project description

Counter Brew is a small website about café-style coffee drinks that can be made at home **without an espresso machine**, using inexpensive tools like a moka pot, AeroPress, Vietnamese phin filter, a french press, cezve, and a handheld milk frother.

The site has two distinct halves:

- **Browse** — a curated catalogue of 20 coffee drinks, each with attributes (brew method, milk, temperature, sweetness, strength, equipment) and step-by-step home instructions. The page supports client-side filtering by brew method, temperature, milk, and sweetness, with a live result count. It also includes a favorites system: drinks can be starred, favorites persist across sessions via `localStorage`, a "show favorites only" toggle filters the grid to saved drinks, and a live counter shows the total. A curated **tutorials section** links to hand-picked YouTube videos, with a jump link near the top for quick access.
- **Explore** — a live search of the Spoonacular recipe API (search, pagination, recipe-detail modal, and loading/error/empty states).

The **Home** page introduces the concept and links to both sections. It features sample drink cards that **deep-link** directly to a specific drink's instructions on Browse, a rotating **random coffee facts** widget, and a section of hand-picked coffee introductory videos. The navigation bar on Home is transparent so the hero image shows through behind it.

## Project context file (CLAUDE.md)

To keep the AI-generated code consistent across a long project, I maintained a `CLAUDE.md` file at the repository root. Claude Code reads this file automatically at the start of every session, so I did not have to re-explain the project each time. It documented the site's architecture (the split between the curated Browse data and the live Explore API), the technical constraints (ES6 classes, no jQuery, Bootstrap 5 and Flexbox, custom CSS loaded after Bootstrap, lowercase folder names, static-only with no backend), the coffee colour-palette approach, the drink data schema, and the intended page structure and feature split. Keeping these standing rules in one file that the tool read every session kept the generated code aligned with my decisions and reduced repeated mistakes — for example, it is where I documented the lowercase-folder rule after the casing issue described above, so the tool would stop reintroducing it.

## Custom front-end requirement

**Assigned requirement:** *Add a sticky footer with social links and contact info.*

The footer appears identically on every page and displays social links (Instagram, Twitter/X, Facebook) and contact information (email and location), organised into columns with a copyright bar.

It is implemented as a **sticky footer** using a Flexbox column layout on the page body: the body is set to `min-height: 100vh` with `display: flex; flex-direction: column`, the main content is given `flex: 1 0 auto` so it expands to fill available space, and the footer sits as the last child. This pushes the footer to the bottom of the viewport even on short pages with little content, rather than letting it float up under the navigation. (This is deliberately different from a `position: fixed` footer, which would overlap page content.) The technique is explained in a comment in `css/styles.css`.

## Technologies

- Semantic HTML5
- Hand-written CSS3 (loaded after Bootstrap so custom rules take precedence), with a coffee-themed palette defined as CSS custom properties (`--cb-espresso`, `--cb-caramel`, `--cb-cream`, `--cb-latte`, `--cb-mocha`)
- Bootstrap 5 and Flexbox for layout and responsiveness
- JavaScript written as ES6 classes and modules (`import`/`export`); no jQuery
- Google Fonts (Fraunces for headings, Nunito Sans for body)
- Spoonacular API for live data
- Deployed on GitHub Pages
Client-side state is handled with localStorage (the favorites feature persists across sessions), and interactivity is built with ES6 classes throughout — no jQuery or external JS libraries.

## Running locally
The site uses ES6 modules, so it must be served over HTTP, not opened directly as a file:// page — for example, with the Live Server extension in VS Code (right-click index.html → "Open with Live Server").
The Spoonacular API key is included in js/config.js, so the site works on clone with no additional setup.
Note: because this is a static, backend-less site, the API key is committed to the repository and visible in the browser. This is an accepted constraint for a client-side project on a static host; the key carries no billing and is limited to a **free daily quota**.

## AI-use appendix

I used AI tools during this project, disclosed here honestly and specifically.

### Tools used

- **Claude** (chat) — project planning and scoping, evaluating and choosing the concept and the API, researching real facts (ratios, origins, methods) for the drink entries, and help debugging issues as they came up.
- **Claude Code** — generating and editing most of the page code (the shared navbar and sticky footer, the Browse page cards and filtering, the Explore page and its Spoonacular integration, the Home page, and the visual-polish styling). I reviewed every implementation plan and every diff before approving, and made all commits myself.
Beyond the initial pages, Claude Code was also used to build several additional front-end features, which I reviewed and tested before committing: the favorites system (localStorage persistence, star toggles, a show-favorites-only filter, and a live counter), the coffee-facts widget, the curated YouTube tutorial sections, and the deep-linking from the Home featured cards to specific drinks on the Browse page.
- **ChatGPT** — edited a hero background image based on a source image I provided (it did not create the image from scratch).
- **Canva AI** — generated the logo.

The 20 drink entries in `data/drinks.js` were drafted with AI assistance from real, sourced facts, and then reviewed and edited by me.

### Sample prompts

**Prompt 1 — building the Browse page:**
> Build the Browse page (drinks.html) for Counter Brew. It renders coffee drinks as cards from the local data in data/drinks.js and lets the user filter them client-side.
> Requirements:
>- Define an ES6 class (e.g. DrinkCard or a DrinkList renderer) in a module under js/, imported by main.js. No jQuery, no inline scripts.
>- Read the drinks array from data/drinks.js and render each drink as a Bootstrap card: name, a few key attributes (base, milk, temp, sweetness), and the method. Use a responsive card grid (Bootstrap + Flexbox per Chapter 2).
>- Add client-side filtering over the local list: let the user filter by temp (hot/iced), milk (none/some), and sweetness. Filtering happens in JS over the array — no page reload.
>- Handle the empty state: if the array is empty or a filter matches nothing, show a friendly "no drinks found" message, not a blank page.
>- For now data/drinks.js may contain only 2–3 placeholder example drinks so I can see rendering and filtering work — do NOT invent or fill in real drink content; I'm authoring the 15+ entries myself. Keep the array structure matching the schema in CLAUDE.md.
>- Match the existing coffee palette (CSS variables) and the shared navbar/footer already built. Styling goes in css/styles.css.
>- No console errors. Show me the implementation plan first and wait for my approval before writing code.


**Prompt 2 — refining the Browse filters:**
> Edit the Browse page (drinks.html) and its supporting JS/CSS. Five focused changes, no new features beyond these:
>- Rename the "Base" field to "Method" everywhere it appears (data schema comment, card rendering, labels). It represents the brew method, not the bean.
>- Add a Method filter alongside the existing filters. Options: All · Moka pot · French press · Pour-over / drip · Cold steep · Boiled · Instant/whisked. It filters the local drinks array by each drink's method value, same pattern as the other filters.
>- Change the Milk filter wording to: All · No milk · With milk. ("With milk" matches any milk value that isn't "none".)
>- Fix the card badges: show only two badges — temperature and strength — and label them clearly so they're not bare values (e.g. a flame/icon or "Hot", and "Medium strength"). Remove the milk badge from the badge row; milk still appears in the card details below.
>- Add a result count above the grid, e.g. "Showing X of Y drinks", that updates live as filters change.    
> Keep "All" as the default on every filter — do not pre-select Hot or any narrowing value; the page must show all drinks on load. Keep lowercase folder names (js/, css/). All filtering stays client-side over the local array — no API. Styling in css/styles.css using the existing --cb-* variables. No console errors. Show me the plan first and wait for approval.


**Prompt 3 — building the Explore page (API integration):**
> Build the Explore page (explore.html) for Counter Brew — a live search of the Spoonacular API with paginated results. This is the project's API-integration requirement.
>Requirements:
>- ES6 class architecture in modules under js/: a SpoonacularService class for the API calls, plus a renderer (class or methods) for the UI. Imported via main.js. No jQuery.
>- Read the API key from js/config.js via import (it's gitignored). Never hardcode the key.
>- Search: a text input + submit button. On submit, call Spoonacular's complexSearch endpoint with the query; render results as Bootstrap cards (image + title) matching the coffee palette and the shared navbar/footer.
>- Pagination over the fetched data using the API's offset and number params (Load more or page numbers); display totalResults.
>- States: a loading indicator while fetching; a friendly error message on failure; an empty state when a search returns nothing.
>- Clicking a card fetches that recipe's full details (second API call) and shows ingredients/instructions in a modal or detail area.
>- Only fetch on submit (not per keystroke) and cache results in memory — the free tier is ~150 requests/day.
>- Lowercase folders (js/, css/). Styling in css/styles.css using --cb-* variables. No console errors.
>- Show me the implementation plan first and wait for approval.


### What the AI got wrong, and how I found and fixed it

**1. Folder-name casing that would break on deployment.**
Claude Code repeatedly referenced the stylesheet and script folders with uppercase names (`CSS/`, `JS/`) instead of the lowercase `css/` and `js/` that were actually on disk. On my Windows machine this made no difference, because Windows treats folder names as case-insensitive — so everything looked fine locally. The problem is that GitHub Pages runs on Linux, which is case-sensitive: the deployed site would have failed to load its styles and scripts. I caught it while reviewing the generated code and noticing the mismatch between the file paths and the real folder names. I fixed it by renaming the folders to lowercase in Git (using a temporary name to get around Git's own case-insensitivity: `git mv CSS css-tmp` then `git mv css-tmp css`), correcting the references in every HTML file, and adding a note to my project instructions so the tool would stop reintroducing it.

**2. Empty search results were cached permanently, so failed searches never retried.**
On the Explore page, a search that returned no results (for example, a term Spoonacular has no recipes for) was being stored in the in-memory cache. This meant that re-searching the same term never fired a new request — it just returned the cached empty result — so the search appeared permanently broken for that query, with nothing happening at all. I found it while debugging: I opened the browser's Network tab and noticed that a repeat search fired **zero** network requests, which told me the code was short-circuiting on the cache rather than calling the API. The fix was to only cache responses that actually returned results, so a query that came back empty will retry the API the next time it is searched.

## Known limitations

- The API key runs client-side and is visible in the browser — an accepted constraint for a static, backend-less deployment.
- The Explore page depends on the live Spoonacular API; if the service is temporarily unavailable or the daily quota is exhausted, the page shows its error state by design.