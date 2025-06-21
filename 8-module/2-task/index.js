import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.#render();
  }

  #render() {
    this.elem = createElement(`
      <div class="products-grid">
        <div class="products-grid__inner"></div>
      </div>
    `);

    this.gridInner = this.elem.querySelector('.products-grid__inner');
    this.renderProducts(this.products);
  }

  renderProducts(products) {
    this.gridInner.innerHTML = '';
    
    for (let product of products) {
      const productCard = new ProductCard(product);
      this.gridInner.append(productCard.elem);
    }
  }

  updateFilter(filters) {
    Object.assign(this.filters, filters);

    const filteredProducts = this.products.filter(product => {
      if (this.filters.noNuts === true && product.nuts === true) {
        return false;
      }

      if (this.filters.vegeterianOnly === true && product.vegeterian !== true) {
        return false;
      }

      if (this.filters.maxSpiciness !== undefined && product.spiciness > this.filters.maxSpiciness) {
        return false;
      }
      if (this.filters.category &&
        this.filters.category !== '' &&
        product.category !== this.filters.category) {
        return false;
      }

      return true;
    });
    this.renderProducts(filteredProducts);
  }
}
