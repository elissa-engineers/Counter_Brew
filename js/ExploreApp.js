export class ExploreApp {
  #service;

  // DOM nodes
  #form;
  #input;
  #statusEl;
  #loadingEl;
  #errorEl;
  #emptyEl;
  #gridEl;
  #paginationEl;
  #loadMoreBtn;
  #modalEl;
  #modalTitle;
  #modalBody;
  #bsModal;

  // Search state
  #query      = '';
  #offset     = 0;
  #total      = 0;
  #pageSize   = 9;
  #results    = [];

  constructor(service) {
    this.#service      = service;
    this.#form         = document.getElementById('explore-form');
    this.#input        = document.getElementById('explore-input');
    this.#statusEl     = document.getElementById('explore-status');
    this.#loadingEl    = document.getElementById('explore-loading');
    this.#errorEl      = document.getElementById('explore-error');
    this.#emptyEl      = document.getElementById('explore-empty');
    this.#gridEl       = document.getElementById('explore-grid');
    this.#paginationEl = document.getElementById('explore-pagination');
    this.#loadMoreBtn  = document.getElementById('load-more');
    this.#modalEl      = document.getElementById('recipe-modal');
    this.#modalTitle   = document.getElementById('recipe-modal-title');
    this.#modalBody    = document.getElementById('recipe-modal-body');
    this.#bsModal      = new bootstrap.Modal(this.#modalEl);
  }

  init() {
    this.#form.addEventListener('submit', e => {
      e.preventDefault();
      const q = this.#input.value.trim();
      if (!q) return;
      this.#query = q;
      this.#offset = 0;
      this.#results = [];
      this.#gridEl.innerHTML = '';
      this.#search();
    });

    this.#loadMoreBtn.addEventListener('click', () => this.#search());

    // Delegated click: catches "View recipe" buttons inside the grid
    this.#gridEl.addEventListener('click', e => {
      const btn = e.target.closest('[data-recipe-id]');
      if (btn) this.#showDetail(Number(btn.dataset.recipeId));
    });
  }

  async #search() {
    this.#setState('loading');
    try {
      const { results, totalResults } = await this.#service.search(
        this.#query, this.#offset, this.#pageSize
      );

      this.#results.push(...results);
      this.#total   = totalResults;
      this.#offset += results.length;

      if (this.#results.length === 0) {
        this.#setState('empty');
        return;
      }

      this.#gridEl.insertAdjacentHTML('beforeend', this.#renderCards(results));
      this.#setState('results');

    } catch (err) {
      this.#setState('error', err.message);
    }
  }

  #setState(state, errorMsg = '') {
    // Hide all toggled elements first
    this.#loadingEl.hidden    = true;
    this.#errorEl.hidden      = true;
    this.#emptyEl.hidden      = true;
    this.#paginationEl.hidden = true;
    this.#statusEl.textContent = '';

    if (state === 'loading') {
      this.#loadingEl.hidden = false;
      return;
    }

    if (state === 'error') {
      this.#errorEl.querySelector('.explore-error__msg').textContent = errorMsg;
      this.#errorEl.hidden = false;
      return;
    }

    if (state === 'empty') {
      this.#statusEl.textContent = 'No recipes found. Try a different search term.';
      this.#emptyEl.hidden = false;
      return;
    }

    if (state === 'results') {
      this.#statusEl.textContent =
        `Showing ${this.#results.length} of ${this.#total} results`;
      const allLoaded = this.#results.length >= this.#total;
      this.#paginationEl.hidden = allLoaded;
    }
  }

  #renderCards(batch) {
    return batch.map(recipe => {
      const img = recipe.image
        ? `<img src="${recipe.image}" alt="${recipe.title}" class="card-img-top explore-card__img">`
        : `<div class="explore-card__img-placeholder d-flex align-items-center justify-content-center">
             <i class="bi bi-cup-hot"></i>
           </div>`;

      return `
        <div class="col">
          <div class="card explore-card h-100">
            ${img}
            <div class="card-body d-flex flex-column">
              <h5 class="card-title explore-card__title">${recipe.title}</h5>
              <button class="btn btn-sm explore-card__view-btn mt-auto"
                      data-recipe-id="${recipe.id}">
                View recipe <i class="bi bi-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>`;
    }).join('');
  }

  async #showDetail(id) {
    this.#modalTitle.textContent  = 'Loading…';
    this.#modalBody.innerHTML     = `
      <div class="text-center py-4">
        <div class="spinner-border" role="status" style="color: var(--cb-caramel)">
          <span class="visually-hidden">Loading…</span>
        </div>
      </div>`;
    this.#bsModal.show();

    try {
      const recipe = await this.#service.getDetails(id);
      this.#modalTitle.textContent = recipe.title;
      this.#modalBody.innerHTML    = this.#renderDetail(recipe);
    } catch (err) {
      this.#modalTitle.textContent = 'Error';
      this.#modalBody.innerHTML    =
        `<p class="text-danger">${err.message}</p>`;
    }
  }

  #renderDetail(recipe) {
    const img = recipe.image
      ? `<img src="${recipe.image}" alt="${recipe.title}"
              class="img-fluid rounded mb-3 d-block mx-auto">`
      : '';

    // Ingredients
    const ingredients = (recipe.extendedIngredients || [])
      .map(i => `<li>${i.original}</li>`)
      .join('');

    // Instructions — prefer parsed steps, fall back to plain HTML
    let instructions = '<p class="text-muted">No instructions available.</p>';
    const steps = recipe.analyzedInstructions?.[0]?.steps;
    if (steps && steps.length) {
      instructions = `<ol class="recipe-instructions">${
        steps.map(s => `<li>${s.step}</li>`).join('')
      }</ol>`;
    } else if (recipe.instructions) {
      instructions = `<div class="recipe-instructions">${recipe.instructions}</div>`;
    }

    return `
      ${img}
      <h6 class="recipe-section-heading">Ingredients</h6>
      <ul class="recipe-ingredients">${ingredients}</ul>
      <h6 class="recipe-section-heading mt-3">Instructions</h6>
      ${instructions}`;
  }
}
