export class ErrorHandler {
  constructor(handler) {

    if (!handler)
      throw Error('Handler is required.');

    if (!handler.handle)
      throw Error('Wrong error handler contract: Please, implement handle method: `handle(title, body, errObj): void`');

    this.handler = handler;
  }

  handle(title, body, errObj) {
    this.handler.handle(title, body);
  }
}
