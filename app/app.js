(function app() {

  const logger = (strategy, level, ...rest) =>
    strategy(level, ...rest/* message, etc...*/);

  const logToConsoleStrategy = (level, ...rest) =>
    console[level](...rest);

  document.addEventListener('DOMContentLoaded', function bootstrap() {

    // 1) console logger:
    logger(
      logToConsoleStrategy,
      'warn',
      'some info message...'
    );

    const app = document.querySelector('#app');
    const fragment = document.createDocumentFragment();

  });

})();
