import h from 'hyperscript';
import hh from 'hyperscript-helpers';
import { map, partial, pipe, reduce } from 'ramda';

const tags = hh(h);
const { tr, th, td, tbody, thead, table } = tags;

const _data = require('./data.json');

/** computed */

function fetchData() {
  return _data;
}

function totalCalories(mealsItems) {
  /*
  return data.map(({ calories }) => calories)
    .reduce((acc, calories) => acc + calories);
  */
  const computeTotal = pipe(
    // 1) extract calories field:
    map(({ calories }) => calories),
    // 2) sum calories:
    reduce((acc, calories) => acc + calories, 0),
  );
  return computeTotal(mealsItems);
}

/** components */

// cell
function cell(tag, className, value) {
  return tag({ className }, value);
}

// heading row and meal header
const mealHeader = thead(tr([
  cell(th, 'b pa3 tl', 'Meal'),
  cell(th, 'b pa3 tr', 'Calories'),
]));

// meal row
function mealRow(className, mealsItem) {
  return tr({ className }, [
    cell(td, 'pa2', mealsItem.meal),
    cell(td, 'pa2 tr', mealsItem.calories),
  ]);
}

// summary row
function summaryRow(className, mealsItems) {
  return tr({ className }, [
    cell(td, 'pa2 tr', 'Total:'),
    cell(td, 'pa2 tl', totalCalories(mealsItems)),
  ]);
}

// meal body
function mealsBody(mealsItems) {
  // create partial fn to pass array of classes as 1st arg:
  const mealRowPartialFn = partial(mealRow, ['stripe-dark']);
  // map each meals item el to previously created partial fn:
  const rows = map(mealRowPartialFn, mealsItems);
  // count total calories for all meal items and map it to summary row element:
  const summary = summaryRow('bt b', mealsItems);
  return tbody([rows, summary]);
}

// meals table
function mealsTable(className, values) {
  return table({ className }, values)
}

// main rendering:
document.body.appendChild(mealsTable('mw5 center w-100 collapse', [
  mealHeader,
  mealsBody(fetchData()),
]));
