'use strict';

import { Counter } from './observers/counter';
import { Console } from './subscribers/console';
import { DOM } from './subscribers/dom';

const counterObserver = new Counter();
const increment = (value = 1) => counterObserver.counter += value;
const decrement = (value = 1) => counterObserver.counter -= value;

document.body.innerHTML = `
  <h3 onclick="counterObserver.counter += 1">Counter App</h3>
  <div id="counter">click on plus or minus</div>
  <button onclick="increment()"> + </button>
  <button onclick="decrement()"> - </button>
`;

const consoleSubscriber = new Console();
const domSubscriber = new DOM('#counter');

counterObserver.subscribe(consoleSubscriber);
counterObserver.subscribe(domSubscriber);

window.increment = increment;
window.decrement = decrement;
