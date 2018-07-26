import { initialState } from './InitialState';
import { version, name } from '../../package.json';
import { storeLocalStorageStateAction } from './Actions';

/** impure: state management by using browser local storage for backup / restore last user session */

const _key = `com.github.daggerok:${name}:${version}`;

export function restoreState() {
  if (!initialState.enableLocalStorage) {
    return initialState;
  }
  const json = localStorage.getItem(_key);
  if (!json || '{}' === json) {
    return initialState;
  }
  return JSON.parse(json);
}

export const backupState = state => !initialState.enableLocalStorage ? {} :
  localStorage.setItem(_key, JSON.stringify(state));

export const registerLocalStorageOnUnloadDispatcher = dispatch => !initialState.enableLocalStorage ? {} :
  window.addEventListener('unload', () => dispatch(storeLocalStorageStateAction), false);
