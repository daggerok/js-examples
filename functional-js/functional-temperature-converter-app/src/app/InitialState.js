import { mapOf } from './Commands';

export const initialState = mapOf({
  meal: '',
  calories: 0,
  showForm: false,
  nextId: 1,
  editId: null,
  meals: [],
});
