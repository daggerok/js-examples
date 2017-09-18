(function app() {

  // bad

  class BadSendMail {
    send(params) {
      if (!params || !params.email) return;
      console.log('bad message sent to', params.email);
    }
  }

  class BadOrder {
    constructor(params) {
      this.params = params;
    }

    save() {
      console.log('bad order created');
      this.notify();
    }

    notify() {
      const sendMail = new BadSendMail();
      sendMail.send(this.params);
    }
  }

  new BadOrder({
    email: 'bad@gmail.com'
  }).save();

  // event-bus

  const EventBus = {
    channels: {},

    subscribe(name, subscriber) {
      if (!this.channels) this.channels = {};
      if (!this.channels[name]) this.channels[name] = [];
      this.channels[name] = [
        ...this.channels[name],
        subscriber,
      ];
    },

    publish(name, data) {
      if (!this.channels ||!this.channels[name] || !this.channels[name].length) return;
      this.channels[name].forEach(
        subscriber => subscriber(data)
      );
    },
  };

  // good

  class GoodSendMail {
    constructor() {
      EventBus.subscribe('send-mail', this.send);
    }
    send(params) {
      if (!params || !params.email) return;
      console.log('good message sent to', params.email);
    }
  }

  class GoodOrder {
    constructor(params) {
      this.params = params;
    }

    save() {
      console.log('good order created');
      this.notify();
    }

    notify() {
      EventBus.publish('send-mail', this.params);
    }
  }

  new GoodSendMail();
  new GoodOrder({
    email: 'good@gmail.com',
  }).save();

  document.addEventListener('DOMContentLoaded', function bootstrap() {

    const app = document.querySelector('#app');

    const render = content => {
      const el = document.createElement('div');
      el.innerHTML = content;
      app.prepend(el);
    };

    // read more: PubSubJS
    EventBus.subscribe('new-order', data => {
      render(`<pre>${JSON.stringify(data, null, 1)}</pre>`);
    });

    document.querySelector('body').addEventListener('click', () => {
      EventBus.publish('new-order', {
        email: 'daggerok@gmail.com',
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
      });
    }, false);

  }, false);

})();
