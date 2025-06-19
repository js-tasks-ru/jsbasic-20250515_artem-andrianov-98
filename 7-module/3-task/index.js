export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;

    this.elem = this.#createSlider();
    this.eventClickSlider();
  }

  #createSlider() {
    const slider = document.createElement('div');
    slider.className = 'slider';

    const thumb = document.createElement('div');
    thumb.className = 'slider__thumb';

    const thumbValue = document.createElement('span');
    thumbValue.className = 'slider__value';
    thumbValue.textContent = this.value;
    thumb.appendChild(thumbValue);

    const progress = document.createElement('div');
    progress.className = 'slider__progress';

    const stepsContainer = document.createElement('div');
    stepsContainer.className = 'slider__steps';

    for (let i = 0; i < this.steps; i++) {
      const step = document.createElement('span');
      step.dataset.index = i;
      if (i === this.value) {
        step.classList.add('slider__step-active');
      }
      stepsContainer.appendChild(step);
    }

    const segments = this.steps - 1;
    const valuePercents = this.value / segments * 100;
    
    thumb.style.left = `${valuePercents}%`;
    progress.style.width = `${valuePercents}%`;
    
    slider.appendChild(thumb);
    slider.appendChild(progress);
    slider.appendChild(stepsContainer);
    
    return slider;
  }

  eventClickSlider() {
    this.elem.addEventListener('click', (event) => {
      const left = event.clientX - this.elem.getBoundingClientRect().left;
      const leftRelative = left / this.elem.offsetWidth;
      
      const segments = this.steps - 1;
      const approximateValue = leftRelative * segments;
      const newValue = Math.round(approximateValue);
      
      if (newValue !== this.value) {
        this.value = newValue;
        this.updateSlider();
        this.dispatchEventSlider();
      }
    });
  }

  updateSlider() {
    const thumb = this.elem.querySelector('.slider__thumb');
    const progress = this.elem.querySelector('.slider__progress');
    const thumbValue = this.elem.querySelector('.slider__value');
    const steps = this.elem.querySelectorAll('.slider__steps span');
    
    thumbValue.textContent = this.value;
    
    steps.forEach((step, index) => {
      if (index === this.value) {
        step.classList.add('slider__step-active');
      } else {
        step.classList.remove('slider__step-active');
      }
    });
    
    const segments = this.steps - 1;
    const valuePercents = this.value / segments * 100;
    
    thumb.style.left = `${valuePercents}%`;
    progress.style.width = `${valuePercents}%`;
  }

  dispatchEventSlider() {
    this.elem.dispatchEvent(
      new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true
      })
    );
  }
}
