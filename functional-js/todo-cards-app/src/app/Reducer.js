import { backupState } from './LocalStorage';
import { mapOf, types } from './Actions';
import * as R from 'ramda';

/** main reducer */

export function reducer(action, state) {
  const { type } = action;

  switch (type) {

    case types.EDIT_SUBJECT:
      return toggle('subject', action, state);
    case types.CANCEL_SUBJECT:
      return toggle('subject', action, state);
    case types.SAVE_SUBJECT:
      return toggle('subject', action, state);
    case types.CHANGE_SUBJECT:
      return change('subject', action, state);

    case types.EDIT_BODY:
      return toggle('body', action, state);
    case types.CANCEL_BODY:
      return toggle('body', action, state);
    case types.SAVE_BODY:
      return toggle('body', action, state);
    case types.CHANGE_BODY:
      return change('body', action, state);

    case types.DELETE_CARD: {
      const { id } = action;
      const { cards } = state;
      return mapOf({
        ...state,
        cards: cards.filter(card => card.id !== id),
      });
    }

    case types.STORE_STATE: {
      backupState(state);
      return state;
    }

    default: {
      return state;
    }
  }
}

function toggle(name, action, state) {
  const { id } = action;
  const { cards } = state;
  return mapOf({
    ...state,
    cards: cards.map(card => {
      if (card.id !== id) return card;
      const newCard = { ...card };
      newCard[name].editMode = !newCard[name].editMode;
      return newCard;
    }),
  });
}

function change(name, action, state) {
  const { id, value } = action;
  const { cards } = state;
  return mapOf({
    ...state,
    cards: cards.map(card => {
      if (card.id !== id) return card;
      const newCard = { ...card };
      newCard[name].value = value;
      return newCard;
    }),
  });
}
