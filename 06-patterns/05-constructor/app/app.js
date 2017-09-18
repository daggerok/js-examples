(function app() {

  /**
   * ES6
   */
  class ES6User {
    constructor(username, password, email) {
      this.username = username;
      this.password = password;
      this.email = email;
    }
  }

  /**
   * ES5
   */
  function ES5User(username, password, email) {
    this.username = username;
    this.password = password;
    this.email = email;
  }

  const stringMe = obj => JSON.stringify(obj, null, 2);
  const pre = content => `<pre>${content}</pre>`;

  document.addEventListener('DOMContentLoaded', function bootstrap() {

    const app = document.querySelector('#app');
    const fragment = document.createDocumentFragment();
    const render = innerHTML => {
      const el = document.createElement('div');
      el.innerHTML = innerHTML;
      fragment.appendChild(el);
    };

    const es6User = new ES6User('Max', 'es6', 'daggerok@gmail.com');
    const es5User = new ES5User('Max', 'es5', 'daggerok@gmail.com');

    render(`<h2>Constructor</h2>`);

    [es6User, es5User,]
      .map(stringMe)
      .map(pre)
      .forEach(render);

    app.appendChild(fragment);

  });

})();
