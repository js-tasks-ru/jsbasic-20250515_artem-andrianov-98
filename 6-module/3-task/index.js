import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.currentSlide = 0;
    this.elem = this.render();
    this.initCarousel();
    this.createEvents();
  }

  render() {
    const carousel = createElement(`
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left" style="display: none">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner"></div>
      </div>
    `);

    const carouselInner = carousel.querySelector('.carousel__inner');

    this.slides.forEach(slide => {
      const slideElement = createElement(`
        <div class="carousel__slide" data-id="${slide.id}">
          <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€${slide.price.toFixed(2)}</span>
            <div class="carousel__title">${slide.name}</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>
      `);
      carouselInner.appendChild(slideElement);
    });

    return carousel;
  }

  initCarousel() {
    this.carouselInner = this.elem.querySelector('.carousel__inner');
    this.arrowRight = this.elem.querySelector('.carousel__arrow_right');
    this.arrowLeft = this.elem.querySelector('.carousel__arrow_left');
    this.slidesCount = this.slides.length;

    this.arrowRight.addEventListener('click', () => {
      this.#next();
    });

    this.arrowLeft.addEventListener('click', () => {
      this.#back();
    });

    this.#update();
  }

  #next() {
    this.currentSlide++;
    this.#update();
  }

  #back() {
    this.currentSlide--;
    this.#update();
  }

  #update() {
    let offset = -this.currentSlide * this.elem.offsetWidth;
    this.carouselInner.style.transform = `translateX(${offset}px)`;

    this.arrowLeft.style.display = this.currentSlide === 0 ? 'none' : '';
    this.arrowRight.style.display = this.currentSlide === this.slidesCount - 1 ? 'none' : '';
  }

  createEvents() {
    this.elem.addEventListener('click', (event) => {
      const button = event.target.closest('.carousel__button');
      if (button) {
        const slide = button.closest('.carousel__slide');
        const productId = slide.dataset.id;

        this.elem.dispatchEvent(new CustomEvent('product-add', {
          detail: productId,
          bubbles: true
        }));
      }
    });
  }
}