import { backupState } from './LocalStorage';
import { mapOf, types } from './Actions';
import * as R from 'ramda';

/** main reducer */

export function reducer(action, state) {
  const { type } = action;

  switch (type) {

    case types.STORE_STATE: {
      backupState(state);
      return state;
    }

    default: {
      return state;
    }
  }
}
