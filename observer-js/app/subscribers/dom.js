export class DOM {
  constructor(selector) {
    this._element = document.querySelector(selector);
  }
  on(oldValue, newValue) {
    this._element.textContent = `old value: ${oldValue}; new value: ${newValue}`;
  }
}
