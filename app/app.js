(function app() {

  class Coffee {
    cost() {
      return 5;
    }
  }

  const sugar = coffee => {
    const cost = coffee.cost();
    return {
      ...coffee,
      cost: () => cost + 0.5,
    }
  };

  const milk = coffee => {
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
      'small coffee with sugar': small(sugar(coffee)),
      'small coffee with milk': small(milk(coffee)),
      'small coffee with sugar and milk': small(sugar(milk(coffee))),
      'coffee': coffee,
      'coffee with sugar': sugar(coffee),
      'coffee with milk': milk(coffee),
      'coffee with sugar and milk': sugar(milk(coffee)),
      'double coffee': double(coffee),
      'double coffee with sugar': double(sugar(coffee)),
      'double coffee with milk': double(milk(coffee)),
      'double coffee with sugar and milk': double(sugar(milk(coffee))),
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
