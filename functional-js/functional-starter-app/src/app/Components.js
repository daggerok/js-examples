import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
import { pipe, map, sum, partial } from 'ramda';

import { } from './Actions';

const { div, h1, pre, } = hh(h);

export function view(dispatch, state) {
  return div({ className: 'mw6 center' }, [
    h1({ className: 'f2 pv2 bb' }, 'Functional Starter'),
    pre(JSON.stringify(state, null, 2)),
  ]);
}
