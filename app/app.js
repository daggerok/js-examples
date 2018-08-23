(function app() {

  const logger = (strategy, level, ...rest) =>
    strategy(level, ...rest/* messages, etc...*/);

  const logToConsoleStrategy = (target, level, ...messages) =>
    target[level](...messages);

  const styles = {
    log: 'primary',
    info: 'info',
    warn: 'warning',
    error: 'danger',
  };

  const logToDomStrategy = (target, level, ...messages) =>
    target.innerHTML = messages.map(message => `
      <div class="badge badge-${styles[level]}">
        ${message}
      </div>
    `).join(`<br/>`);

  document.addEventListener('DOMContentLoaded', function bootstrap() {

    // 1) console logger:
    logger(
      logToConsoleStrategy,
      console,
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
      div,
      'warn',
      'DOM warn message 1',
      'DOM warn message 2',
      'DOM warn message 3...',
    );

    fragment.appendChild(div);
    app.appendChild(fragment);

  });

})();
