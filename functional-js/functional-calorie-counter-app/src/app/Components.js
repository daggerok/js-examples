import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
import { pipe, map, sum, partial } from 'ramda';
import {
  hideFormCommand,
  showFormCommand,
  setCaloriesCommand,
  setMealCommand,
  saveMealCommand,
  deleteMealCommand,
  editMealCommand
} from './Commands';

const { div, h1, button, form, label, input, pre, thead, tr, th, table, tbody, td, i } = hh(h);

function fieldSetView(labelText, inputValue, oninput) {
  return div([
    label({ className: 'db mb1' }, labelText),
    input({
      className: 'pa2 input-reset ba w-100 mb2',
      type: 'text',
      value: inputValue,
      oninput,
    }),
  ]);
}

function buttonSetView(dispatch) {
  return div([
    button({
      className: 'f3 pv2 ph3 bg-blue white bn dim mr2',
      type: 'submit',
    }, 'Save'),
    button({
      className: 'f3 pv2 ph3 bn bg-light-gray dim',
      type: 'button',
      onclick: () => dispatch(hideFormCommand),
    }, 'Cancel'),
  ]);
}

function formView(dispatch, state) {
  const { meal, calories, showForm, id } = state;
  if (showForm) {
    return form({
      className: 'w-100 mv2',
      onsubmit: e => {
        e.preventDefault();
        dispatch(saveMealCommand);
    }}, [
      fieldSetView('Meal', meal, e => dispatch(setMealCommand(e.target.value))),
      fieldSetView('Calories', calories || '', e => dispatch(setCaloriesCommand(e.target.value))),
      buttonSetView(dispatch),
    ]);
  }
  return button({
    className: 'f3 pv2 ph3 bg-blue white bn',
    onclick: () => dispatch(showFormCommand),
  }, 'Add meal');
}

function cell(tag, className, value) {
  return tag({ className }, value);
}

const tableHeader = thead([
  tr([
    cell(th, 'pa2 tl', 'Meal'),
    cell(th, 'pa2 tr', 'Calories'),
    cell(th, '', ''),
  ]),
]);

function mealRow(dispatch, className, { id, meal, calories}) {
  return tr({ className, id }, [
    cell(td, 'pa2', meal),
    cell(td, 'pa2 tr', calories),
    cell(td, 'pa2', [
      i({
        className: 'ph1 fa fa-trash-o pointer tr',
        onclick: () => dispatch(deleteMealCommand(id)),
      }),
      i({
        className: 'ph1 fa fa-pencil-square-o pointer tr',
        onclick: () => dispatch(editMealCommand(id)),
      }),
    ]),
  ]);
}

function totalRow(meals) {
  const total = pipe(
    map(({ calories }) => calories),
    sum,
  )(meals);
  return tr({ className: 'bt b' }, [
    cell(td, 'pa2 tr', 'Total:'),
    cell(td, 'pa2 tr', total),
    cell(td, '', ''),
  ]);
}

function mealsBody(dispatch, className, meals) {
  const rows = map(
    partial(mealRow, [dispatch, 'stripe-dark']),
    meals
  );

  const rowsWithTotal = [...rows, totalRow(meals)];

  return tbody({ className }, rowsWithTotal);
}

function tableView(dispatch, meals) {
  if (meals.length === 0) {
    return div({ className: 'mv2 i black-50' }, 'No meals to display...');
  }
  return table({ className: 'mv2 w-100 collapse' }, [
    tableHeader,
    mealsBody(dispatch, '', meals),
  ]);
}

export function view(dispatch, state) {
  return div({ className: 'mw6 center' }, [
    h1({ className: 'f2 pv2 bb' }, 'Calories Counter'),
    formView(dispatch, state),
    tableView(dispatch, state.meals),
    pre(JSON.stringify(state, null, 2)),
  ]);
}
