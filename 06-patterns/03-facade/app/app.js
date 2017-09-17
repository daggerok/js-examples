(function app() {

  class SuperComplexLogic1 {
    calculate(_skip) {
      // super complex logic here... we don't want to deep dive into it
      return Date.now() % 1000 < 500;
    }
  }

  class VeryComplexLogic2 {
    calculate(_skip) { // same
      return Date.now() % 9 > 5;
    }
  }

  class AcademicLogic3 {
    calculate(_skip) { // same
      return Date.now() % 2 === 0;
    }
  }

  class Facade {
    constructor(name) {
      this.name = name;
    }

    /**
     * API method (to reduce complexity)
     * @param value
     * @returns {string}
     */
    html(_whatever) {
      const result1 = new SuperComplexLogic1().calculate(_whatever);
      const result2 = new VeryComplexLogic2().calculate({_whatever});
      const result3 = new AcademicLogic3().calculate([_whatever]);
      return `
      <div>
        <p>${this.name} results:</p>
        <ul>
          <li>${result1}</li>
          <li>${result2}</li>
          <li>${result3}</li>
        </ul>
      </div>
      `;
    }
  }

  document.addEventListener('DOMContentLoaded', function bootstrap() {

    const app = document.querySelector('#app');
    const fragment = document.createDocumentFragment();
    const addTo = innerHTML => {
      const el = document.createElement('div');
      el.innerHTML = innerHTML;
      fragment.appendChild(el);
    };

    ['Max', 'Bob', 'Nobody']
      .map(name => new Facade(name))
      .map(facade => facade.html())
      .forEach(addTo);

    app.appendChild(fragment);

  });

})();
