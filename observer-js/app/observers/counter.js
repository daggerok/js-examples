export class Counter {
  constructor() {
    this._counter = 0;
    this._observers = [];
  }

  validate(observer) {
    if (!observer.on)
      throw Error(`Invalid observer contract. Method on is missing. 
Please implement next contract: on(oldValue, newValue): void`);
  }

  subscribe(observer) {
    this.validate(observer);
    this._observers = [
      ...this._observers,
      observer,
    ];
  }

  unsubscribe(observer) {
    this.validate(observer);
    const index = this._observers.indexOf(observer);
    if (index > 0) {
      this._observers.splice(index, 1);
    }
  }

  onCounter(oldValue, newValue) {
    this._observers.forEach(o => o.on(oldValue, newValue));
  }

  get counter() {
    return this._counter;
  }

  set counter(newValue) {
    const oldValue = this._counter;
    this._counter = newValue;
    if (this._counter != oldValue)
      this.onCounter(oldValue, newValue);
  }
}
