import { h, diff, patch } from 'virtual-dom';
import createElement from 'virtual-dom/create-element';
import { storeLocalStorageStateCommand } from './Commands';

/** impure */

export function bootstrap(initialState, view, reduce, node) {
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

  window.addEventListener('unload', () => dispatch(storeLocalStorageStateCommand), false);
}
