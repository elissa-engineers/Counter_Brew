import { FavoritesStore } from './FavoritesStore.js';

export class DrinkList {
  #container;
  #countEl;
  #favCountEl;
  #drinks;
  #favorites = new FavoritesStore();
  #filters = { temp: 'all', brewMethod: 'all', milk: 'all', sweetness: 'all', favoritesOnly: false };

  constructor(containerEl, allDrinks) {
    this.#container  = containerEl;
    this.#countEl    = document.getElementById('result-count');
    this.#favCountEl = document.getElementById('favorites-count');
    this.#drinks     = allDrinks;
  }

  init(onReady) {
    document.getElementById('filter-temp')
      .addEventListener('change', e => { this.#filters.temp = e.target.value; this.#render(); });
    document.getElementById('filter-brewMethod')
      .addEventListener('change', e => { this.#filters.brewMethod = e.target.value; this.#render(); });
    document.getElementById('filter-milk')
      .addEventListener('change', e => { this.#filters.milk = e.target.value; this.#render(); });
    document.getElementById('filter-sweetness')
      .addEventListener('change', e => { this.#filters.sweetness = e.target.value; this.#render(); });
    document.getElementById('filter-favorites-only')
      .addEventListener('change', e => { this.#filters.favoritesOnly = e.target.checked; this.#render(); });
    document.getElementById('filter-reset')
      .addEventListener('click', () => this.#resetFilters());
    this.#container
      .addEventListener('click', e => this.#handleFavoriteClick(e));
    this.#updateFavoritesCount();
    this.#render();
    onReady?.();
  }

  #resetFilters() {
    this.#filters = { temp: 'all', brewMethod: 'all', milk: 'all', sweetness: 'all', favoritesOnly: false };
    document.getElementById('filter-temp').value          = 'all';
    document.getElementById('filter-brewMethod').value    = 'all';
    document.getElementById('filter-milk').value          = 'all';
    document.getElementById('filter-sweetness').value     = 'all';
    document.getElementById('filter-favorites-only').checked = false;
    this.#render();
  }

  #handleFavoriteClick(e) {
    const btn = e.target.closest('.drink-fav-btn');
    if (!btn) return;
    this.#toggleFavorite(btn.dataset.id);
  }

  #toggleFavorite(id) {
    this.#favorites.toggle(id);
    this.#updateFavoritesCount();
    this.#render();
  }

  #updateFavoritesCount() {
    const count = this.#favorites.count();
    this.#favCountEl.innerHTML =
      `<i class="bi bi-star-fill"></i> ${count} favorite${count === 1 ? '' : 's'}`;
  }

  #applyFilters() {
    return this.#drinks.filter(d => {
      if (this.#filters.temp !== 'all' && d.temp !== this.#filters.temp) return false;
      if (this.#filters.brewMethod !== 'all' && d.brewMethod !== this.#filters.brewMethod) return false;
      if (this.#filters.milk === 'none' && d.milk !== 'none') return false;
      if (this.#filters.milk === 'some' && d.milk === 'none') return false;
      if (this.#filters.sweetness !== 'all' && d.sweetness !== this.#filters.sweetness) return false;
      if (this.#filters.favoritesOnly && !this.#favorites.isFavorite(d.id)) return false;
      return true;
    });
  }

  #renderCard(drink, index = 0) {
    const tempIcon  = drink.temp === 'hot' ? 'bi-fire' : 'bi-snow';
    const tempLabel = drink.temp === 'hot' ? 'Hot' : 'Iced';
    const strengthLabel = drink.strength.charAt(0).toUpperCase() + drink.strength.slice(1) + ' brew';
    const steps = drink.method.map(s => `<li>${s}</li>`).join('');
    const isFavorited = this.#favorites.isFavorite(drink.id);
    const starIcon = isFavorited ? 'bi-star-fill' : 'bi-star';

    return `
      <div class="col drink-card-enter" id="${drink.id}" style="animation-delay:${index * 35}ms">
        <div class="card drink-card h-100">
          <div class="card-header d-flex flex-wrap gap-2 align-items-center">
            <span class="badge drink-badge--temp">
              <i class="bi ${tempIcon}"></i> ${tempLabel}
            </span>
            <span class="badge drink-badge--strength">${strengthLabel}</span>
          </div>
          <div class="card-body">
            <div class="drink-card__title-row">
              <h5 class="card-title mb-0">${drink.name}</h5>
              <button type="button"
                      class="drink-fav-btn${isFavorited ? ' is-favorited' : ''}"
                      data-id="${drink.id}"
                      aria-pressed="${isFavorited}"
                      aria-label="${isFavorited ? 'Remove from favorites' : 'Add to favorites'}">
                <i class="bi ${starIcon}"></i>
              </button>
            </div>
            <dl class="drink-attrs">
              <dt>Brew method</dt> <dd>${drink.brewMethod}</dd>
              <dt>Milk</dt>        <dd>${drink.milk}</dd>
              <dt>Sweetness</dt>   <dd>${drink.sweetness}</dd>
              <dt>Equipment</dt>   <dd>${drink.equipment.join(', ')}</dd>
            </dl>
          </div>
          <div class="card-footer bg-transparent border-0 pb-3">
            <button class="btn btn-sm drink-card__method-btn w-100"
                    data-bs-toggle="collapse"
                    data-bs-target="#method-${drink.id}"
                    aria-expanded="false"
                    aria-controls="method-${drink.id}">
              How to make <i class="bi bi-chevron-down"></i>
            </button>
            <div class="collapse" id="method-${drink.id}">
              <ol class="method-steps mt-2 mb-0">
                ${steps}
              </ol>
            </div>
          </div>
        </div>
      </div>`;
  }

  #render() {
    const filtered = this.#applyFilters();

    this.#countEl.classList.remove('result-count--flash');
    void this.#countEl.offsetWidth; // force reflow so removing + re-adding the class re-triggers the animation
    this.#countEl.textContent = `Showing ${filtered.length} of ${this.#drinks.length} drinks`;
    this.#countEl.classList.add('result-count--flash');

    if (filtered.length === 0) {
      const heading = this.#filters.favoritesOnly
        ? 'No favorite drinks match these filters.'
        : 'No drinks match your filters.';
      this.#container.innerHTML = `
        <div class="col-12 drink-card-enter">
          <div class="empty-state text-center py-5">
            <i class="bi bi-cup-hot empty-state__icon d-block mb-3"></i>
            <p class="lead mb-1">${heading}</p>
            <p class="text-muted mb-0">Try adjusting or resetting the filters above.</p>
          </div>
        </div>`;
      return;
    }

    this.#container.innerHTML = filtered.map((d, i) => this.#renderCard(d, i)).join('');
  }
}
