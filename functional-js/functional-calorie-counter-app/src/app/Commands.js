export const types = Object.freeze({
  TOGGLE_FORM: 'TOGGLE_FORM',
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

// TOGGLE_FORM (hide)
export function hideFormCommand(showForm = false) {
  return {
    type: types.TOGGLE_FORM,
    showForm,
  };
}

// TOGGLE_FORM (show)
export function showFormCommand(showForm = true) {
  return {
    type: types.TOGGLE_FORM,
    showForm,
  };
}
