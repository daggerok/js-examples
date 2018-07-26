import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
import { mapOf
  , deleteCardAction
  , editSubjectAction
  , editBodyAction
  , changeSubjectAction
  , changeBodyAction
  , cancelSubjectAction
  , cancelBodyAction
  , saveSubjectAction
  , saveBodyAction
} from './Actions';

const { div, h1, p, ul, li, input, button, pre } = hh(h);

export function view(dispatch, state) {
  return div({ className: 'sans-serif pa4' }, [
    div({ className: 'mw9 f3' }, [
      cardHeaderComponent(dispatch, state),
      cardListComponent(dispatch, state),
    ]),
    // debugAppState(state),
  ]);
}

function cardHeaderComponent(dispatch, state) {
  return h1({ className: 'pv2 bb tc' }, [
    'TODO Cards',
  ]);
}

function cardListComponent(dispatch, state) {
  const { cards } = state;
  return ul({ className: 'list' }, [
    ...cards.map(card => cardComponent(
      card,
      _ => dispatch(editSubjectAction(card.id)),
      e => onkeyupHandler(e, card, dispatch, changeSubjectAction, saveSubjectAction, cancelSubjectAction),
      _ => dispatch(editBodyAction(card.id)),
      e => onkeyupHandler(e, card, dispatch, changeBodyAction, saveBodyAction, cancelBodyAction),
      _ => dispatch(deleteCardAction(card.id)),
    )),
  ])
}

const keyCodes = mapOf({
  enter: 13,
  escape: 27,
});

function onkeyupHandler(e, card, dispatch, changeAction, saveAction, cancelAction) {
  const { id } = card;
  const { keyCode, target } = e;
  const changeComplete = Object.values(keyCodes)
    .find(code => code === keyCode);

  if (!changeComplete)
    dispatch(changeAction(id, target.value));

  if (keyCode === keyCodes.enter)
    dispatch(saveAction(id));

  if (keyCode === keyCodes.escape)
    dispatch(cancelAction(id));
}

function cardComponent(card, startEditSubject, editSubject,
                             startEditBody   , editBody,
                       deleteCard) {

  const { id, subject, body } = card;

  return li({ id, className: 'mw5 hidden ba mv4' }, [
    deleteComponent(deleteCard),
    subjectComponent(subject, startEditSubject, editSubject, deleteCard),
    bodyComponent(   body   , startEditBody   , editBody),
  ]);
}

function deleteComponent(onclick) {
  return button({
    className: 'na2 absolute f6 br-100 bg-dark-red hover-bg-light-red',
    onclick,
  }, 'x');
}

function subjectComponent(subject, startEdit, edit) {
  const { value, editMode } = subject;

  return editMode
    ? writeSubjectComponent(value, edit)
    : readSubjectComponent(value, startEdit);
}

function writeSubjectComponent(value, edit) {
  return input({
    className: 'f3 bg-near-black white mv0 pv3 ph3 hover-moon-gray',
    placeholder: 'enter subject',
    value,
    onkeyup: edit,
  });
}

function readSubjectComponent(value, startEdit) {
  return h1({
    className: 'f3 bg-near-black white mv0 pa3 hover-moon-gray tc',
    onclick: startEdit
  }, value);
}

function bodyComponent(body, startEdit, updateChanged) {
  const { value, editMode } = body;
  return editMode
    ? writeBodyComponent(value, updateChanged)
    : readBodyComponent(value, startEdit);
}

function writeBodyComponent(value, updateChanged) {
  return input({
    className: 'f6 lh-copy measure mv0 pv3 ph3',
    placeholder: 'enter body',
    value,
    onkeyup: updateChanged,
  });
}

function readBodyComponent(value, startEdit) {
  return h1({
    className: 'f6 lh-copy measure mv0 pv3 ph3 hover-bg-washed-blue',
    onclick: startEdit
  }, value);
}

function debugAppState(state) {
  return pre(JSON.stringify(state, null, 2));
}
