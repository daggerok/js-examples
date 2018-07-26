import { render } from './app/VirtualDOM';
import { restoreState } from './app/LocalStorage';

const initialState = restoreState();

render(
  initialState,
  document.querySelector('#app')
);
