(function app() {

  class Coffee {
    cost() {
      return 5;
    }
  }

  const withSugar = coffee => {
    const cost = coffee.cost();
    return {
      ...coffee,
      cost: () => cost + 0.5,
    }
  };

  const withMilk = coffee => {
    const cost = coffee.cost();
    return {
      ...coffee,
      cost: () => cost + 1,
    }
  };

  const small = coffee => {
    const cost = coffee.cost();
    return {
      ...coffee,
      cost: () => cost - 1,
    }
  };

  const double = coffee => {
    const cost = coffee.cost();
    return {
      ...coffee,
      cost: () => cost + 1,
    }
  };

  document.addEventListener('DOMContentLoaded', function bootstrap() {

    const app = document.querySelector('#app');
    const fragment = document.createDocumentFragment();
    const render = innerHTML => {
      const el = document.createElement('div');
      el.innerHTML = innerHTML;
      fragment.appendChild(el);
    };

    const coffee = new Coffee();

    const menu = {
      'small coffee': small(coffee),
      'small coffee with sugar': withSugar(small(coffee)),
      'small coffee with milk': withMilk(small(coffee)),
      'small coffee with sugar and milk': withSugar(withMilk(small(coffee))),
      'coffee': coffee,
      'coffee with sugar': withSugar(coffee),
      'coffee with milk': withMilk(coffee),
      'coffee with sugar and milk': withSugar(withMilk(coffee)),
      'double coffee': double(coffee),
      'double coffee with sugar': withSugar(double(coffee)),
      'double coffee with milk': withMilk(double(coffee)),
      'double coffee with sugar and milk': withSugar(withMilk(double(coffee))),
    };

    render(`<h2>Decorators</h2>`);
    Object.keys(menu).forEach(key => render(`
      <div>
        ${key}: ${menu[key].cost()}
      </div>`
    ));

    app.appendChild(fragment);

  });

})();
