import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';

const { div, h1, pre, } = hh(h);

export function view(dispatch, state) {
  return contentWrapper([
    applicationHeader(),
    div({ className: '' }, [
      celsiusComponent(dispatch, state),
      fahrenheitComponent(dispatch, state),
    ]),
    debugAppState(state),
  ]);
}

function debugAppState(state) {
  return pre(JSON.stringify(state, null, 2));
}

function fahrenheitComponent(dispatch, state) {
  return div({ className: 'f2 pv2' }, 'TODO: fahrenheit');
}

function celsiusComponent(dispatch, state) {
  return div({ className: 'f2 pv2' }, 'TODO: celsius');
}

function applicationHeader() {
  return h1({ className: 'f1 pv2 bb' }, 'Temperature Converter');
}

function contentWrapper(elements) {
  return div({ className: 'mw6 center' }, [
    ...elements,
  ]);
}
