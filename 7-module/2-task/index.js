import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.render();
    this.eventCloseModal();
  }

  render() {
    this.elem = createElement(`
      <div class="modal">
        <div class="modal__overlay"></div>
        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>
            <h1 class="modal__title"></h1>
          </div>
          <div class="modal__body"></div>
        </div>
      </div>
    `);
    
    this.modalTitle = this.elem.querySelector('.modal__title');
    this.modalBody = this.elem.querySelector('.modal__body');
  }

  eventCloseModal() {
    this.elem.querySelector('.modal__close').addEventListener('click', () => this.close());
    document.addEventListener('keydown', this.eventKeyDown);
  }

  open() {
    document.body.append(this.elem);
    document.body.classList.add('is-modal-open');
  }

  setTitle(title) {
    this.modalTitle.textContent = title;
  }

  setBody(node) {
    this.modalBody.innerHTML = '';
    this.modalBody.append(node);
  }

  close() {
    document.removeEventListener('keydown', this.eventKeyDown);
    document.body.classList.remove('is-modal-open');
    this.elem.remove();
  }

  eventKeyDown = (event) => {
    if (event.code === 'Escape') {
      event.preventDefault();
      this.close();
    }
  };
}