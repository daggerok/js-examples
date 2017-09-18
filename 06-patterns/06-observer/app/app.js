(function app() {

  class EventObserver {
    constructor() {
      this.subscribers = [];
    }

    // add listener
    subscribe(subscriber) {
      this.subscribers = [
        ...this.subscribers,
        subscriber,
      ];
      return () => this.unSubscribe(subscriber);
    }

    // remove listener
    unSubscribe(subscriber) {
      this.subscribers = this.subscribers.filter(
        s => s !== subscriber
      );
    }

    // fire event
    broadcast(data) {
      this.subscribers.forEach(s => s(data));
    }
  }

  document.addEventListener('DOMContentLoaded', function bootstrap() {

    // create listener
    const observer = new EventObserver();

    // send data
    document.querySelector('input[type="text"]').addEventListener('keyup', e => {
      e.preventDefault();
      const { keyCode, target } = e;
      if (!keyCode || keyCode !== 13) return;
      if (!target || !target.value|| !target.value.trim().length) return;
      observer.broadcast({
        message: target.value.trim(),
        time: new Date().toLocaleTimeString()
      });
      target.value = '';
    }, false);

    // receive data
    const messages = document.querySelector('#messages');

    const render = envelope => {
      const el = document.createElement('div');
      el.innerHTML = `<div>
        ${envelope.time}: ${envelope.message}
      </div>`;
      messages.prepend(el);
    };

    observer.subscribe(render);

  });

})();
