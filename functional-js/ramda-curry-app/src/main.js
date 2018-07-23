import { curry } from 'ramda';

// function greet(greeting = 'Hello') {
//   return function greetFriend(name) {
//     return `<p>${greeting} ${name}</p>`;
//   }
// }

// DO NOT DO THIS! Default param value wont work:
//const greet = curry((greeting = 'Hello', name) => `<p>${greeting} ${name}</p>`);

const greet = curry((greeting, name) => `<p>${greeting} ${name}</p>`);

const friends = ['Bob', 'Billy', 'Peter', 'Alice'];

const greetingHtmlResults = friends
  .map(greet('Hola'))
  .reduce((acc, html) => acc + html);

const results = [
  { name: 'Bob', grade: 88 },
  { name: 'Alice', grade: 99 },
];

const reduced = results.map(res => {
  const { name, grade } = res;
  if (grade >= 90) return { name, greeting: 'Excellent' };
  else return { name, greeting: 'Good job' };
});

const studentsGradeHtmlResults = reduced
  .map(({ greeting, name }) => greet(greeting, name))
  .reduce((acc, html) => acc + html);

const app = document.querySelector('#app');

app.innerHTML = greetingHtmlResults + studentsGradeHtmlResults;
