import { initialState } from './InitialState';
import { version, name } from '../../package.json';
import { storeLocalStorageStateAction } from './Actions';

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

export const serialize = state => !initialState.enableLocalStorage ? {} :
  localStorage.setItem(_key, JSON.stringify(state));

export const registerLocalStorageOnUnloadDispatcher = dispatch => !initialState.enableLocalStorage ? {} :
  window.addEventListener('unload', () => dispatch(storeLocalStorageStateAction), false);
