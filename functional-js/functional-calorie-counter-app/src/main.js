import { render } from './app/DOM';
import { deserialize } from './app/LocalStorage';

const initialState = deserialize();

render(
  initialState,
  document.querySelector('#app')
);
