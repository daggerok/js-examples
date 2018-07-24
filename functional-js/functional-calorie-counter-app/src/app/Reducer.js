import * as R from 'ramda';
import { setStorage } from './Storage';
import { types } from './Commands';

/** main reducer */

export function reduce(command, state) {
  const { type } = command;

  switch (type) {

    case types.TOGGLE_FORM:
      const { showForm } = command;
      return { ...state, showForm };

    case types.SET_MEAL:
      const { meal } = command;
      return { ...state, meal };

    case types.SET_CALORIES:
      // const { calories } = command;
      const calories = R.pipe(
        ({ calories }) => calories,
        parseInt,
        R.defaultTo(0),
      )(command);
      return { ...state, calories };

    case types.SAVE_MEAL:
      const { meal: mealToSave, calories: caloriesToSave, meals, nextId } = state;
      const isInvalidState = !mealToSave || !mealToSave.trim().length;
      const nextIdToSave = isInvalidState ? nextId : nextId + 1;
      return {
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
      };

    case types.STORE_STATE:
      setStorage(state);
      return { ...state };

    default:
      return { ...state };
  }
}
