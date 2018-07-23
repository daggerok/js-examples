function greet(greeting = 'Hello') {
  return function greetFriend(name) {
    return `<p>${greeting} ${name}</p>`;
  }
}

const friends = ['Bob', 'Billy', 'Peter', 'Alice'];

const greetingHtmlResults = friends
  .map(name => greet('Hola')(name))
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
  .map(({ greeting, name }) => greet(greeting)(name))
  .reduce((acc, html) => acc + html);

const app = document.querySelector('#app');

app.innerHTML = greetingHtmlResults + studentsGradeHtmlResults;
