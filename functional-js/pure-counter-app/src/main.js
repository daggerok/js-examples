import h from 'hyperscript';
import hh from 'hyperscript-helpers';

const tags = hh(h);
const { div, h1, span, button } = tags;

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
  node.appendChild(currentView);

  function dispatch(type) {
    const newState = reduce(type, state);
    const newChild = view(dispatch, newState);

    node.replaceChild(newChild, currentView);
    currentView = newChild;
    state = newState;
  }

  window.addEventListener('unload', () => dispatch('BYE'), false);
}

const app = document.querySelector('#app');
const { state = 0 } = getStorage();

bootstrap(state, view, app);
