import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
import { pipe, map, sum, partial } from 'ramda';

import { } from './Actions';

const { div, h1, pre, } = hh(h);

export function view(dispatch, state) {
  return div({ className: 'mw6 center' }, [
    h1({ className: 'f1 pv2 bb' }, 'App'),
    debugAppState(state),
  ]);
}

function debugAppState(state) {
  return pre(JSON.stringify(state, null, 2));
}
