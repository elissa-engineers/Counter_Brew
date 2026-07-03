const STORAGE_KEY = 'cb-favorite-drinks';

export class FavoritesStore {
  #ids;

  constructor() {
    this.#ids = new Set(this.#load());
  }

  #load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  #save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...this.#ids]));
    } catch {
      // localStorage unavailable (e.g. private browsing quota) — favorites just won't persist
    }
  }

  isFavorite(id) {
    return this.#ids.has(id);
  }

  toggle(id) {
    if (this.#ids.has(id)) {
      this.#ids.delete(id);
    } else {
      this.#ids.add(id);
    }
    this.#save();
  }

  count() {
    return this.#ids.size;
  }
}
