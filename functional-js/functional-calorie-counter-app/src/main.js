import { bootstrap } from './app/Bootstrap';
import { getStorage } from './app/Storage';
import { reduce } from './app/Reducer';
import { view } from './app/View';

const app = document.querySelector('#app');
const state = getStorage();

bootstrap(state, view, reduce, app);
