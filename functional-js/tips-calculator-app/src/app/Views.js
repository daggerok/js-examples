import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';

import { changeBillAmountAction, changeTipAction } from './Actions';

// const changeBillAmountHandler = ({ target }) => changeBillAmountAction(target.value);
// const changeTipHandler = ({ target }) => changeTipAction(target.value);

const { div, h1, pre, label, input, } = hh(h);

export function view(dispatch, state) {
  const { billAmount, tip, tipAmount, totalAmount } = state;
  return div([
    h1({ className: 'f1 pv2 bb tc' }, 'Tips calculator'),
    div({ className: 'mw5 center' }, [
      div({ className: 'dt ba b--transparent ph0 mh0' }, [
        fieldSetComponent('Bill amount', billAmount, e => dispatch(changeBillAmountAction(e.target.value))),
        fieldSetComponent('Tip %', tip, e => dispatch(changeTipAction(e.target.value))),
      ]),
      div([
        labelComponent('Tip amount', tipAmount),
        labelComponent('Total amount', totalAmount),
      ]),
    ]),
    // debugAppState(state),
  ]);
}

function debugAppState(state) {
  return pre(JSON.stringify(state, null, 2));
}

function labelComponent(fieldName, value) {
  return label({ className: 'db mv3' }, `${fieldName}: ${value}`)
}

function fieldSetComponent(fieldName, value, oninput) {
  console.log('on input', fieldName, value);
  return div({ className: 'mv3' }, [
    label({ className: 'dtc fw6 lh-copy f6' }, `${fieldName}: `),
    input({
      className: 'dtc',
      type: 'text',
      oninput,
      value,
    }),
  ]);
}
