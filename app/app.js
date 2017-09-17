(function app() {

  const logger = (strategy, level, ...rest) =>
    strategy(level, ...rest/* message, etc...*/);

  const logToConsoleStrategy = (level, ...messages) =>
    console[level](...messages);

  const styles = {
    log: 'primary',
    info: 'info',
    warn: 'warning',
    error: 'danger',
  };

  const logToDomStrategy = (level, node, ...messages) =>
    node.innerHTML = messages.map(message => `<div class="badge badge-${styles[level]}">
        ${message}
      </div>
    `).join(`<br/>`);

  document.addEventListener('DOMContentLoaded', function bootstrap() {

    // 1) console logger:
    logger(
      logToConsoleStrategy,
      'warn',
      'console warn message 1',
      'and console warn message 2',
    );

    const app = document.querySelector('#app');
    const fragment = document.createDocumentFragment();

    const p = document.createElement('p');
    p.textContent = 'also check browser console';
    fragment.appendChild(p);

    const div = document.createElement('div');

    logger(
      logToDomStrategy,
      'warn',
      div,
      'DOM warn message 1',
      'DOM warn message 2',
      'DOM warn message 3...',
    );

    fragment.appendChild(div);
    app.appendChild(fragment);

  });

})();
