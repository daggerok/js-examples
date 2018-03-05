(function app() {

  function createTitle(text) {
    const h1 = document.createElement('h1');
    h1.textContent = text;
    return h1;
  }

  document.addEventListener('DOMContentLoaded', function bootstrap() {

    const app = document.querySelector('#app');
    const fragment = document.createDocumentFragment();
    const ul = document.createElement('ul');

    fetch('/app/data.json')
      .then(data => data.json())
      .then(items => items.map(item => {
        const value = item.url + '/' + item.username;
        const div = document.createElement('div');
        const li = document.createElement('li');
        div.textContent = value;
        li.appendChild(div);
        ul.appendChild(li);
      }));

    fragment.appendChild(createTitle('Hey!'));
    fragment.appendChild(ul);
    app.appendChild(fragment);

  });

})();
