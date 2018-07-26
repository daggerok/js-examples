import { serialize } from './LocalStorage';
import { mapOf, types } from './Actions';
import * as R from 'ramda';

/** main reducer */

export function reducer(action, state) {
  const { type } = action;

  switch (type) {

    case types.STORE_STATE: {
      serialize(state);
      return state;
    }

    case types.CHANGE_BILL_AMOUNT: {
      const { billAmount: raw } = action;
      const { tip } = state;
      const billAmount = floatOf(raw);
      const tipAmount = calculateTipAmount(billAmount, tip);
      const totalAmount = billAmount + tipAmount;
      return mapOf({ ...state, tipAmount, totalAmount, billAmount });
    }

    case types.CHANGE_TIP: {
      const { tip: raw } = action;
      const { billAmount } = state;
      const tip = floatOf(raw);
      const tipAmount = calculateTipAmount(billAmount, tip);
      const totalAmount = billAmount + tipAmount;
      return mapOf({ ...state, tipAmount, totalAmount, tip });
    }

    default: {
      console.log(action);
      console.log(state);
      return state;
    }
  }
}

function calculateTipAmount(billAmount, tip) {
  return floatOf(billAmount) === 0.00
    ? 0.00 : floatOf(tip / 100 * billAmount);
}

const toFloat = R.pipe(
  parseFloat,
  R.defaultTo(0.00)
);

function floatOf(value) {
  return round(toFloat(value));
}

function round(value) {
  return Math.round(value * 100) / 100;
}
