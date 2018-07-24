import * as R from 'ramda';
import { setStorage } from './Storage';

/** commands */

export const types = Object.freeze({
  SHOW_FORM: 'SHOW_FORM',
  SET_MEAL: 'SET_MEAL',
  SET_CALORIES: 'SET_CALORIES',
  SAVE_MEAL: 'SAVE_MEAL',
  STORE_STATE: 'STORE_STATE',
});

// STORE_STATE:
export const storeLocalStorageStateCommand = Object.freeze({
  type: types.STORE_STATE,
});

// SAVE_MEAL:
export const saveMealCommand = Object.freeze({
  type: types.SAVE_MEAL,
});

// SET_CALORIES_INPUT:
export function setMealCommand(meal) {
  return {
    type: types.SET_MEAL,
    meal,
  };
}
// SET_CALORIES:
export function setCaloriesCommand(calories) {
  return {
    type: types.SET_CALORIES,
    calories,
  };
}

// SHOW_FORM
export function hideFormCommand(showForm = false) {
  return {
    type: types.SHOW_FORM,
    showForm,
  };
}
export function showFormCommand(showForm = true) {
  return {
    type: types.SHOW_FORM,
    showForm,
  };
}

/** main reducer */

export function reduce(command, state) {
  console.log(command, state);

  const { type } = command;

  switch (type) {

    case types.STORE_STATE:
      setStorage(state);
      return { ...state };

    case types.SHOW_FORM:
      const { showForm } = command;
      return { ...state, showForm };

    case types.SET_MEAL:
      const { meal } = command;
      return { ...state, meal };

    case types.SET_CALORIES:
      // const { calories } = command;
      const calories = R.pipe(
        ({ calories }) => {
          console.log(calories);
          return calories;
        },
        parseInt,
        R.defaultTo(0),
      )(command);
      return { ...state, calories };

    case types.SAVE_MEAL:
      const { meal: newMeal, calories: newCalories, meals } = state;
      return {
        ...state,
        meals: [
          ...meals,
          {
            meal: newMeal,
            calories: newCalories,
          },
        ],
        meal: '',
        calories: 0,
        showForm: false,
      };

    default:
      return { ...state };
  }
}
