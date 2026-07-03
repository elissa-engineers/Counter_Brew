
export class CoffeeFacts {
  constructor(container, facts) {
    this.textEl = container.querySelector('#coffee-fact-text');
    this.btnEl = container.querySelector('#coffee-fact-btn');
    this.facts = facts;
    this.currentIndex = -1;
  }

  init() {
    this.showRandomFact();
    this.btnEl.addEventListener('click', () => this.showRandomFact());
  }

  showRandomFact() {
    let nextIndex = this.currentIndex;
    while (nextIndex === this.currentIndex && this.facts.length > 1) {
      nextIndex = Math.floor(Math.random() * this.facts.length);
    }
    this.currentIndex = nextIndex;
    this.textEl.textContent = this.facts[this.currentIndex];
  }
}
