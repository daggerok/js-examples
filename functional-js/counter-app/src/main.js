import h from 'hyperscript';
import hh from 'hyperscript-helpers';
import { pipe, compose } from 'ramda';

const tags = hh(h);
const { p } = tags;

/** mutate computed */
let _state = {
  counter: 0,
};

const _mutateState = state => _state = { ...state };

const getState = () => ({ ..._state });

function incrementCounter(state) {
  const { counter = 0 } = state;
  _mutateState({ counter: counter + 1 });
  return getState();
}

function decrementCounter(state) {
  const { counter = 0 } = state;
  _mutateState({ counter: counter - 1 });
  return getState();
}

const render = ({ innerHTML }) =>
  document.querySelector('#app').innerHTML = innerHTML;

const extractCounter = ({ counter }) => counter;

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

document.addEventListener('DOMContentLoaded', () => renderCounter(getState()), false);

document
  .querySelector('#increase')
  .addEventListener('click', () => incrementPipeline(getState()), false);

document
  .querySelector('#decrease')
  .addEventListener('click', () => decrementPipeline(getState()), false);
