import { serialize } from './LocalStorage';
import { mapOf, types } from './Actions';
import * as R from 'ramda';

/** main reducer */

export function reducer(action, state) {
  const { type } = action;

  switch (type) {

    case types.STORE_STATE: {
      serialize(state);
      return mapOf({ ...state });
    }

    default: {
      return mapOf({ ...state });
    }
  }

  return state;
}
