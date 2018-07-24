import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
import { hideFormCommand, showFormCommand, setCaloriesCommand, setMealCommand, saveMealCommand } from './Commands';

const { div, h1, hr, button, form, label, input, pre } = hh(h);

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
  return div({ className: 'center w-100 mw5 cf' }, [
    button({
      className: 'f3 pv2 ph3 bg-blue white bn dim fl mr2',
      type: 'submit',
    }, 'Save'),
    button({
      className: 'f3 pv2 ph3 bg-blue white bn dim fr ',
      type: 'button',
      onclick: () => dispatch(hideFormCommand()),
    }, 'Cancel'),
  ]);
}

function formView(dispatch, state) {
  const { meal, calories, showForm } = state;
  if (showForm) {
    return form({ onsubmit: e => {
        e.preventDefault();
        dispatch(saveMealCommand);
    }}, [
      fieldSetView('Meal', meal, e => dispatch(setMealCommand(e.target.value))),
      fieldSetView('Calories', calories || '', e => dispatch(setCaloriesCommand(e.target.value))),
      buttonSetView(dispatch),
    ]);
  }
  return button({
    className: 'f1 pv2 ph3 bg-blue white bn dim',
    onclick: () => dispatch(showFormCommand()),
  }, 'Add meal');
}

export function view(dispatch, state) {
  return div({ className: 'sans-serif bg-white pa3 mv1' }, [
    h1({ className: 'mw5 w-100 center' }, 'Calories Counter'),
    div({ className: 'w-100 center mw5' },
      formView(dispatch, state)
    ),
    pre(JSON.stringify(state, null, 2)),
  ]);
}
