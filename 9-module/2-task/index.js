import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {
  constructor() {
    this.cart = null;
    this.cartIcon = null;
    this.productsGrid = null;
    this.stepSlider = null;
    this.ribbonMenu = null;
  }

  async render() {
    return new Promise(async (resolve) => {
      this.renderCarousel();
      this.renderRibbonMenu();
      this.renderStepSlider();
      this.renderCartIcon();
      this.renderCart();
      await this.renderProducts();
      this.setupFilters();
      this.setupEventListeners();

      resolve();
    });
  }

  renderCarousel() {
    const carouselHolder = document.querySelector('[data-carousel-holder]');
    const carousel = new Carousel(slides);
    carouselHolder.append(carousel.elem);
  }

  renderRibbonMenu() {
    const ribbonHolder = document.querySelector('[data-ribbon-holder]');
    this.ribbonMenu = new RibbonMenu(categories);
    ribbonHolder.append(this.ribbonMenu.elem);
  }

  renderStepSlider() {
    const sliderHolder = document.querySelector('[data-slider-holder]');
    this.stepSlider = new StepSlider({ steps: 5, value: 3 });
    sliderHolder.append(this.stepSlider.elem);
  }

  renderCartIcon() {
    const cartIconHolder = document.querySelector('[data-cart-icon-holder]');
    this.cartIcon = new CartIcon();
    cartIconHolder.append(this.cartIcon.elem);
  }

  renderCart() {
    this.cart = new Cart(this.cartIcon);
  }

  async renderProducts() {
    const productsGridHolder = document.querySelector('[data-products-grid-holder]');
    productsGridHolder.innerHTML = ''; 
    const response = await fetch('products.json');
    const products = await response.json();

    this.productsGrid = new ProductsGrid(products);
    productsGridHolder.append(this.productsGrid.elem);
  }

  setupFilters() {
    this.productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value
    });
  }

  setupEventListeners() {
    document.body.addEventListener('product-add', (event) => {
      const productId = event.detail;
      const product = this.productsGrid.products.find(item => item.id === productId);
      if (product) {
        this.cart.addProduct(product);
      }
    });

    
    this.stepSlider.elem.addEventListener('slider-change', (event) => {
      this.productsGrid.updateFilter({
        maxSpiciness: event.detail
      });
    });

    this.ribbonMenu.elem.addEventListener('ribbon-select', (event) => {
      this.productsGrid.updateFilter({
        category: event.detail
      });
    });

    document.getElementById('nuts-checkbox').addEventListener('change', (event) => {
      this.productsGrid.updateFilter({
        noNuts: event.target.checked
      });
    });

    document.getElementById('vegeterian-checkbox').addEventListener('change', (event) => {
      this.productsGrid.updateFilter({
        vegeterianOnly: event.target.checked
      });
    });
  }
}