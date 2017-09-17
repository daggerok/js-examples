(function app() {

  const logger = (strategy, level, ...rest) =>
    strategy(level, ...rest/* message, etc...*/);

  const logToConsoleStrategy = (level, ...rest) =>
    console[level](...rest);

  const styles = {
    log: 'primary',
    info: 'info',
    warn: 'warning',
    error: 'danger',
  };

  const logToDomStrategy = (level, message, node) =>
    node.innerHTML = `<div class="badge badge-${styles[level]}">
        ${message}
      </div>
    `;

  document.addEventListener('DOMContentLoaded', function bootstrap() {

    // 1) console logger:
    logger(
      logToConsoleStrategy,
      'warn',
      'some warn message...'
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
      'some warn message...',
      div
    );

    fragment.appendChild(div);
    app.appendChild(fragment);

  });

})();
