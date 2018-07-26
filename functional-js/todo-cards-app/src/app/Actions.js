export const mapOf = obj => Object.freeze({ ...obj });

export const types = mapOf({
  EDIT_SUBJECT: 'EDIT_SUBJECT',
  EDIT_BODY: 'EDIT_BODY',
  CHANGE_SUBJECT: 'CHANGE_SUBJECT',
  CHANGE_BODY: 'CHANGE_BODY',
  CANCEL_SUBJECT: 'CANCEL_SUBJECT',
  CANCEL_BODY: 'CANCEL_BODY',
  SAVE_SUBJECT: 'SAVE_SUBJECT',
  SAVE_BODY: 'SAVE_BODY',
  DELETE_CARD: 'DELETE_CARD',
  STORE_STATE: 'STORE_STATE',
});

export const editSubjectAction = id => mapOf({
  type: types.EDIT_SUBJECT,
  id,
});

export const editBodyAction = id => mapOf({
  type: types.EDIT_BODY,
  id,
});

export const changeSubjectAction = (id, value) => mapOf({
  type: types.CHANGE_SUBJECT,
  value,
  id,
});

export const changeBodyAction = (id, value) => mapOf({
  type: types.CHANGE_BODY,
  value,
  id,
});

export const cancelSubjectAction = id => mapOf({
  type: types.CANCEL_SUBJECT,
  id,
});

export const cancelBodyAction = id => mapOf({
  type: types.CANCEL_BODY,
  id,
});

export const saveSubjectAction = id => mapOf({
  type: types.SAVE_SUBJECT,
  id,
});

export const saveBodyAction = id => mapOf({
  type: types.SAVE_BODY,
  id,
});

export const deleteCardAction = id => mapOf({
  type: types.DELETE_CARD,
  id,
});

export const storeLocalStorageStateAction = mapOf({
  type: types.STORE_STATE,
});
