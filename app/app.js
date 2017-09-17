(function app() {

  class FullStack {
    constructor() {
      this.rate = '15.00'
    }
  }

  class Backend {
    constructor() {
      this.rate = '13.00'
    }
  }

  class Frontend {
    constructor() {
      this.rate = '12.00'
    }
  }

  class Designer {
    constructor() {
      this.rate = '10.00'
    }
  }

  class QA {
    constructor() {
      this.rate = '11.00'
    }
  }

  class EngineerFactory {
    static create(kind) {
      let engineer;
      switch ((kind || '').toLowerCase()) {
        case 'qa':
          engineer = new QA(); break;
        case 'designer':
          engineer = new Designer(); break;
        case 'frontend':
          engineer = new Frontend(); break;
        case 'backend':
          engineer = new Backend(); break;
        case 'full-stack':
        default:
          engineer = new FullStack();
      }
      engineer.cost = () => `${engineer.constructor.name} rate: \$${engineer.rate}/hour`;
      return engineer;
    }
  }

  document.addEventListener('DOMContentLoaded', function bootstrap() {

    const app = document.querySelector('#app');
    const fragment = document.createDocumentFragment();

    ['qa', 'designer', 'frontend', 'backend', 'lazy-man'].forEach(kind => {
      const div = document.createElement('div');
      const engineer = EngineerFactory.create(kind);
      div.textContent = engineer.cost();
      fragment.appendChild(div);
    });

    app.appendChild(fragment);

  });

})();
