import { serialize } from './LocalStorage';
import { mapOf, types } from './Actions';
import * as R from 'ramda';

/** main reducer */

export function reducer(action, state) {
  const { type } = action;

  switch (type) {

    case types.STORE_STATE: {
      serialize(state);
      return mapOf({ ...state });
    }

    case types.CHANGE_TEMPERATURE: {
      const { name, value } = action;
      const celsius = toCelsius(name, value);
      const fahrenheit = toFahrenheit(name, value);
      return mapOf({ ...state, celsius, fahrenheit });
    }

    default: {
      console.log(action);
      console.log(state);
      return mapOf({ ...state });
    }
  }

  return state;
}

function toCelsius(name, value) {
  return 'celsius' === name
    ? value : fahrenheitToCelsius(value);
}

function toFahrenheit(name, value) {
  return 'fahrenheit' === name
    ? value : celsiusToFahrenheit(value);
}

// T(°C) = (T(°F) - 32) / 1.8
// T(°F) = T(°C) × 1.8 + 32

function celsiusToFahrenheit(celsius) {
  return round(celsius * 1.8 + 32);
}

function fahrenheitToCelsius(fahrenheit) {
  return round((fahrenheit - 32) / 1.8);
}

function round(value) {
  return Math.round(value * 100) / 100;
}
