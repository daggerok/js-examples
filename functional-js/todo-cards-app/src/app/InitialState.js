import { mapOf } from './Actions';

export const initialState = mapOf({
  enableLocalStorage: false,
  cards: [
    {
      id: 1,
      subject: {
        value: 'ololo',
        editMode: false,
      },
      body: {
        value: 'trololo',
        editMode: false,
      },
    }
  ],
  nextId: 2,
});
