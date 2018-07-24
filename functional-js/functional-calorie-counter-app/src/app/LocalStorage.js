import { initialState } from './InitialState';
import { version, name } from '../../package.json';
import { storeLocalStorageStateCommand } from './Commands';

/** state management */

const _key = `com.github.daggerok:${name}:${version}`;

function restoreState(json) {
  if (!json || '{}' === json) {
    return JSON.stringify(initialState);
  }
  return json;
}

export const deserialize = () =>
  JSON.parse(restoreState(localStorage.getItem(_key)));

export const serialize = state =>
  localStorage.setItem(_key, JSON.stringify(state));

export const registerLocalStorageOnUnloadDispatcher = dispatch =>
  window.addEventListener('unload', () => dispatch(storeLocalStorageStateCommand), false);
