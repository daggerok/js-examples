export const mapOf = obj => Object.freeze({ ...obj });

export const types = mapOf({
  CHANGE_BILL_AMOUNT: 'CHANGE_BILL_AMOUNT',
  CHANGE_TIP: 'CHANGE_TIP',
  STORE_STATE: 'STORE_STATE',
});

export const changeBillAmountAction = billAmount => mapOf({
  type: types.CHANGE_BILL_AMOUNT,
  billAmount,
});

export const changeTipAction = tip => mapOf({
  type: types.CHANGE_TIP,
  tip,
});

export const storeLocalStorageStateAction = mapOf({
  type: types.STORE_STATE,
});
