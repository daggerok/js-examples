import * as R from 'ramda';
import { serialize } from './LocalStorage';
import { mapOf, types } from './Commands';

/** main reducer */

export function reducer(command, state) {
  const { type } = command;

  switch (type) {

    case types.TOGGLE_FORM:
      const { showForm } = command;
      return mapOf({ ...state, showForm });

    case types.SET_MEAL:
      const { meal } = command;
      return mapOf({ ...state, meal });

    case types.SET_CALORIES:
      // const { calories } = command;
      const calories = R.pipe(
        ({ calories }) => calories,
        parseInt,
        R.defaultTo(0),
      )(command);
      return mapOf({ ...state, calories });

    case types.SAVE_MEAL:
      const { meal: mealToSave, calories: caloriesToSave, meals, nextId } = state;
      const isInvalidState = !mealToSave || !mealToSave.trim().length;
      const nextIdToSave = isInvalidState ? nextId : nextId + 1;
      return mapOf({
        ...state,
        meals: [
          ...meals,
          isInvalidState ? undefined : {
            id: nextId,
            meal: mealToSave,
            calories: caloriesToSave,
          },
        ].filter(m => !!m),
        meal: isInvalidState ? mealToSave : '',
        calories: isInvalidState ? caloriesToSave : 0,
        showForm: isInvalidState,
        nextId: nextIdToSave,
      });

    case types.STORE_STATE:
      serialize(state);
      return mapOf({ ...state });

    default:
      return mapOf({ ...state });
  }
}
