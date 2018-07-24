import h from 'hyperscript';
import hh from 'hyperscript-helpers';
import { compose, pipe } from 'ramda';

const tags = hh(h);
const { p } = tags;

/** state management */

const _key = 'daggerok.counter-app._state';

const getStorageState = () =>
  JSON.parse(localStorage.getItem(_key) || '{ "counter": 0 }');

const setStorageState = (state) =>
  localStorage.setItem(_key, JSON.stringify(state));

let _inMemoryState = { counter: 0 };
const getApplicationState = () => ({ ..._inMemoryState });
const setApplicationState = (state) => _inMemoryState = { ...state };

/** DRY */

const extractCounter = ({ counter }) => counter;

function incrementCounter(state) {
  const counter = extractCounter(state) + 1;
  setApplicationState({ counter });
  return getApplicationState();
}

function decrementCounter(state) {
  const counter = extractCounter(state) - 1;
  setApplicationState({ counter });
  return getApplicationState();
}

const render = ({ innerHTML }) =>
  document.querySelector('#app').innerHTML = innerHTML;

/** high-order functions */

const renderCounter = compose(
  render,
  p,
  extractCounter,
);

const incrementPipeline = pipe(
  incrementCounter,
  renderCounter,
);

const decrementPipeline = pipe(
  decrementCounter,
  renderCounter,
);

/** main */

document.addEventListener('DOMContentLoaded', () => {
  setApplicationState({ ...getStorageState() });
  renderCounter(getApplicationState());
}, false);

document
  .querySelector('#increase')
  .addEventListener('click', () => incrementPipeline(getApplicationState()), false);

document
  .querySelector('#decrease')
  .addEventListener('click', () => decrementPipeline(getApplicationState()), false);

window.addEventListener('unload', () => {
  setStorageState({ ...getApplicationState() });
}, false);
