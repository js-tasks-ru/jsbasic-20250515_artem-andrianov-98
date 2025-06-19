import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = this.#render();
    this.#initRibbon();
    this.#addEventRibbon();
  }

  #render() {
    const ribbon = createElement(`
      <div class="ribbon">
        <button class="ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
        <nav class="ribbon__inner">
          ${this.categories.map(category => `
            <a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>
          `).join('')}
        </nav>
        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>
    `);
    return ribbon;
  }

  #initRibbon() {
    this.ribbonInner = this.elem.querySelector('.ribbon__inner');
    this.arrowLeft = this.elem.querySelector('.ribbon__arrow_left');
    this.arrowRight = this.elem.querySelector('.ribbon__arrow_right');

    this.#updateArrows();
  }

  #updateArrows() {
    const scrollLeft = this.ribbonInner.scrollLeft;
    const scrollWidth = this.ribbonInner.scrollWidth;
    const clientWidth = this.ribbonInner.clientWidth;
    const scrollRight = scrollWidth - scrollLeft - clientWidth;

    const isRightEnd = scrollRight < 1;
    const isLeftEnd = scrollLeft === 0;

    this.arrowLeft.classList.toggle('ribbon__arrow_visible', !isLeftEnd);
    this.arrowRight.classList.toggle('ribbon__arrow_visible', !isRightEnd);
  }

  #addEventRibbon() {
    this.arrowLeft.addEventListener('click', () => {
      this.ribbonInner.scrollBy(-350, 0);
    });

    this.arrowRight.addEventListener('click', () => {
      this.ribbonInner.scrollBy(350, 0);
    });

    this.ribbonInner.addEventListener('scroll', () => {
      this.#updateArrows();
    });

    this.ribbonInner.addEventListener('click', (event) => {
      const item = event.target.closest('.ribbon__item');
      if (!item) {return;}

      event.preventDefault();

      this.ribbonInner.querySelectorAll('.ribbon__item').forEach(el => {
        el.classList.remove('ribbon__item_active');
      });

      item.classList.add('ribbon__item_active');

      this.elem.dispatchEvent(new CustomEvent('ribbon-select', {
        detail: item.dataset.id,
        bubbles: true
      }));
    });
  }
}