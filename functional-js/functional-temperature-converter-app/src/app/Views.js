import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
import { changeTemperatureAction } from './Actions';

const { div, h1, pre, input, } = hh(h);

export function view(dispatch, state) {
  return contentWrapper('', [
    applicationHeader(),
    contentWrapper('mw7 center tc', [
      celsiusComponent(dispatch, state),
      ' = ',
      fahrenheitComponent(dispatch, state),
      resultComponent(state),
    ]),
    // debugAppState(state),
  ]);
}

function debugAppState(state) {
  return pre(JSON.stringify(state, null, 2));
}

function resultComponent(state) {
  const { celsius, fahrenheit } = state;
  return div({
    className: 'mw7 center tc pa4',
    innerHTML: `${celsius} &#186; C  =  ${fahrenheit} &#186; F`,
  });
}

function inputComponent(dispatch, value, onchange) {
  return input({
    className: 'pv2 dib w-20',
    value,
    onchange,
  });
}

function temperatureChanged(name, dispatch, state) {
  const value = state[name];
  const onChangeHandler = e => {
    const { target } = e;
    dispatch(changeTemperatureAction(name, target.value));
  };
  return div({ className: 'pv2 di' }, [
    inputComponent(dispatch, value, onChangeHandler),
    name,
  ]);
}

function fahrenheitComponent(dispatch, state) {
  return temperatureChanged('fahrenheit', dispatch, state);
}

function celsiusComponent(dispatch, state) {
  return temperatureChanged('celsius', dispatch, state);
}

function applicationHeader() {
  return h1({ className: 'f1 pv2 bb tc' }, 'Temperature Converter');
}

function contentWrapper(className, elements) {
  return div({ className }, [
    ...elements,
  ]);
}
