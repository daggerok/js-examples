import { diff, patch } from 'virtual-dom';
import createElement from 'virtual-dom/create-element';

import { reducer } from './Reducer';
import { view } from './Views';
import { registerLocalStorageOnUnloadDispatcher } from './LocalStorage';

/** impure */

export function render(initialState, rootNode) {
  let state = initialState;
  let currentView = view(dispatch, state);
  let virtualNode = createElement(currentView);

  rootNode.appendChild(virtualNode);

  registerLocalStorageOnUnloadDispatcher(dispatch);

  function dispatch(action) {
    const newState = reducer(action, state);
    const newView = view(dispatch, newState);
    const patches = diff(currentView, newView);

    virtualNode = patch(virtualNode, patches);
    currentView = newView;
    state = newState;
  }
}
