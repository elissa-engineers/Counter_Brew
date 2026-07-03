import { drinks }       from '../data/drinks.js';
import { coffeeFacts }  from '../data/coffeeFacts.js';
import { DrinkList }    from './DrinkList.js';
import { CoffeeFacts }  from './CoffeeFacts.js';

// Home page — coffee fact card
const coffeeFactEl = document.getElementById('coffee-fact-card');
if (coffeeFactEl) {
  new CoffeeFacts(coffeeFactEl, coffeeFacts).init();
}

// Home page — render featured drink cards
const featuredEl = document.getElementById('home-featured');
if (featuredEl) {
  const FEATURED_IDS = ['moka-espresso', 'japanese-iced', 'ca-phe-sua-da'];
  const featured = FEATURED_IDS
    .map(id => drinks.find(d => d.id === id))
    .filter(Boolean);

  featuredEl.innerHTML = featured.map(d => {
    const teaser = d.notes.length > 120
      ? d.notes.slice(0, 120).trimEnd() + '…'
      : d.notes;
    return `
      <div class="col">
        <div class="card home-featured-card h-100">
          <div class="card-header d-flex align-items-center gap-2">
            <span class="badge home-featured-badge">${d.brewMethod}</span>
          </div>
          <div class="card-body">
            <h3 class="h5 card-title">${d.name}</h3>
            <p class="card-text home-featured-notes">${teaser}</p>
          </div>
          <div class="card-footer bg-transparent border-0 pb-3">
            <a href="drinks.html" class="btn btn-sm home-featured-btn w-100">
              See how to make it
            </a>
          </div>
        </div>
      </div>`;
  }).join('');
}

// Browse page — only runs when #drink-grid exists
const grid = document.getElementById('drink-grid');
if (grid) {
  new DrinkList(grid, drinks).init();
}

// Explore page — dynamic imports keep config.js absence from breaking Browse
if (document.getElementById('explore-grid')) {
  const [{ SpoonacularService }, { ExploreApp }, { API_KEY }] = await Promise.all([
    import('./SpoonacularService.js'),
    import('./ExploreApp.js'),
    import('./config.js'),
  ]);
  new ExploreApp(new SpoonacularService(API_KEY)).init();
}
