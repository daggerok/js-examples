'use strict';

import 'material-design-icons/iconfont/material-icons.css';
import 'material-design-lite/dist/material.css';
import 'material-design-lite/dist/material.min.js';

const button = document.createElement('button');
const textNode = document.createTextNode('Click Me!');

button.appendChild(textNode);
button.className = 'mdl-button mdl-js-button mdl-js-ripple-effect';

componentHandler.upgradeElement(button);
document.querySelector('#app').appendChild(button);
