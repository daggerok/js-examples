import h from 'hyperscript';
import hh from 'hyperscript-helpers';
import { compose, pipe } from 'ramda';

const tags = hh(h);
const { p } = tags;

/** storage: managing application state */

const _key = 'daggerok.counter-app._state';
const getState = () => JSON.parse(localStorage.getItem(_key) || '{ "counter": 0 }');
const setState = (state) => localStorage.setItem(_key, JSON.stringify(state));

let _inMemoryState = { counter: 0 };
const getApplicationState = () => ({ ..._inMemoryState });
const setApplicationState = (state) => _inMemoryState = { ...state };

/** internal (private) implementation API */

function incrementCounter(state) {
  const { counter = 0 } = state;
  setApplicationState({ counter: counter + 1 });
  return getApplicationState();
}

function decrementCounter(state) {
  const { counter = 0 } = state;
  setApplicationState({ counter: counter - 1 });
  return getApplicationState();
}

const render = ({ innerHTML }) =>
  document.querySelector('#app').innerHTML = innerHTML;

const extractCounter = ({ counter }) => counter;

/** public API */

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
  setApplicationState({ ...getState() });
  renderCounter(getApplicationState());
/*  // backup each 5 seconds:
  setInterval(function backup() {
    setState({ ...getApplicationState() });
  }, 5000);
*/
}, false);

document
  .querySelector('#increase')
  .addEventListener('click', () => incrementPipeline(getApplicationState()), false);

document
  .querySelector('#decrease')
  .addEventListener('click', () => decrementPipeline(getApplicationState()), false);

window.addEventListener('unload', () => {
  setState({ ...getApplicationState() });
}, false);
