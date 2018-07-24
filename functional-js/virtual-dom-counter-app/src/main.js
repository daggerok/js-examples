import hh from 'hyperscript-helpers';
import { h, diff, patch } from 'virtual-dom';
import createElement from 'virtual-dom/create-element';

const tags = hh(h);
const { div, h1, button } = tags;

/** pure */

function reduce(type, state) {
  switch (type) {
    case 'MINUS':
      return state - 1;
    case 'PLUS':
      return state + 1;
    case 'BYE':
      setStorage({ state });
      return state;
    default:
      return state;
  }
}

function view(dispatch, state) {
  return div({ className: 'sans-serif bg-white pa3 mv1' }, [
    h1({ className: 'mw5 w-100 center' }, `Counter: ${state}`),
    div({ className: 'center' }, [
      div({ className: 'w-100 w-100 pa2' }, [
        div({ className: 'mw5 center' }, [
          button({
            id: 'increase',
            className: 'dim bg-light-green pv3 ph4 mr2',
            onclick: () => dispatch('MINUS')
          }, '-'),
          button({
            id: 'decrease',
            className: 'dim bg-light-blue  pv3 ph4',
            onclick: () => dispatch('PLUS'),
          }, '+'),
        ]),
      ]),
    ]),
  ]);
}

/** state management */

const _key = 'daggerok.counter-app';

const getStorage = () =>
  JSON.parse(localStorage.getItem(_key) || '{ "state": 0 }');

const setStorage = (state) =>
  localStorage.setItem(_key, JSON.stringify(state));

/** impure */

function bootstrap(initialState, view, node) {
  let state = initialState;
  let currentView = view(dispatch, state);
  let virtualNode = createElement(currentView);

  node.appendChild(virtualNode);

  function dispatch(type) {
    const newState = reduce(type, state);
    const newView = view(dispatch, newState);
    const patches = diff(currentView, newView);

    virtualNode = patch(virtualNode, patches);
    currentView = newView;
    state = newState;
  }

  window.addEventListener('unload', () => dispatch('BYE'), false);
}

const app = document.querySelector('#app');
const { state = 0 } = getStorage();

bootstrap(state, view, app);
