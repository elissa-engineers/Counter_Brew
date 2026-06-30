import { drinks }    from '../data/drinks.js';
import { DrinkList } from './DrinkList.js';

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
