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
      const calories = R.pipe(
        ({ calories }) => calories,
        parseInt,
        R.defaultTo(0),
      )(command);
      return mapOf({ ...state, calories });

    case types.SAVE_MEAL:
      const { nextId, editId: idToSave, meal: mealToSave, calories: caloriesToSave, meals } = state;
      const isInvalidState = !mealToSave || !mealToSave.trim().length;
      const itemToSave = {
        id: idToSave || nextId,
        meal: mealToSave,
        calories: caloriesToSave,
      };
      if (isInvalidState) {
        return mapOf({
          ...state,
        });
      }
      if (!idToSave) {
        return mapOf({
          ...state,
          meals: [
            ...meals,
            {
              ...itemToSave,
            },
          ],
          meal: '',
          calories: 0,
          showForm: false,
          nextId: nextId + 1,
        });
      }
      return mapOf({
        ...state,
        meals: [
          ...meals.filter(({ id }) => id < idToSave),
          {
            ...itemToSave,
          },
          ...meals.filter(({ id }) => id > idToSave),
        ],
        meal: '',
        calories: 0,
        showForm: false,
        editId: null,
      });

    case types.EDIT_MEAL:
      const { id: editId } = command;
      const { meals: editMeals } = state;
      const editMeal = editMeals.find(({ id }) => id === editId);
      return {
        ...state,
        showForm: true,
        meal: editMeal.meal,
        calories: editMeal.calories,
        editId,
      };

    case types.DELETE_MEAL:
      const { id: deleteId } = command;
      const { meals: currMeals } = state;
      const newMeals = R.filter(
        ({ id: mId }) => deleteId !== mId,
        currMeals,
      );
      return mapOf({
        ...state,
        meals: [
          ...newMeals
        ],
      });

    case types.STORE_STATE:
      serialize(state);
      return mapOf({ ...state });

    default:
      return mapOf({ ...state });
  }
}
