import { initialState } from './Model';
import { version, name } from '../../package.json';

/** state management */

export const _key = `com.github.daggerok:${name}:${version}`;

function fallback(json) {
  if (!json || '{}' === json) {
    return JSON.stringify(initialState);
  }
  return json;
}

export const getStorage = () =>
  JSON.parse(fallback(localStorage.getItem(_key)));

export const setStorage = (state) =>
  localStorage.setItem(_key, JSON.stringify(state));
