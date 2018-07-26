import { render } from './app/VirtualDOM';
import { deserialize } from './app/LocalStorage';

const initialState = deserialize();

render(
  initialState,
  document.querySelector('#app')
);
