export const mapOf = obj => Object.freeze({ ...obj });

export const types = mapOf({
  CHANGE_TEMPERATURE: 'CHANGE_TEMPERATURE',
  STORE_STATE: 'STORE_STATE',
});

export const changeTemperatureAction = (name, value) => mapOf({
  type: types.CHANGE_TEMPERATURE,
  name,
  value,
});

export const storeLocalStorageStateAction = mapOf({
  type: types.STORE_STATE,
});
