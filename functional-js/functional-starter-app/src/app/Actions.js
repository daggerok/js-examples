export const mapOf = obj => Object.freeze({ ...obj });

export const types = mapOf({
  STORE_STATE: 'STORE_STATE',
});

export const storeLocalStorageStateAction = mapOf({
  type: types.STORE_STATE,
});
