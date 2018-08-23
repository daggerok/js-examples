import 'babel-polyfill';
// const { safe, isNumber, isString } = require('crocks');
import safeLift from 'crocks/Maybe/safeLift'
const safe = require('crocks/Maybe/safe');
const curry = require('crocks/core/curry');
const isNumber = require('crocks/predicates/isNumber');
const isString = require('crocks/predicates/isString');

const app = document.querySelector('#app');

// addString :: s -> consumes Number
const addNumber = number => app.innerHTML += `<code>${JSON.stringify({
  hey: 'hey!',
  number,
}, null, 2)}</code>`;
// addSafeNumber :: n -> consumes Maybe Number
const addSafeNumber = safeLift(isNumber, num => addNumber(num));

// addString :: s -> consumes String
const addString = string => app.innerHTML += `<code>${JSON.stringify({
  ho: 'ho!',
  string,
}, null, 2)}</code><br/>`;
// addSafeString :: n -> consumes Maybe String
const addSafeString = safeLift(isString, str => addString(str));

// safe adding number if input is number
addSafeNumber(2);
addSafeNumber('ololo');

// safe adding string if input is string
addSafeString('ololo');
addSafeString(2);
