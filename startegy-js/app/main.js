'use strict';

import { ErrorHandler } from './strategies/error-handler';
import { ConsoleErrorHandler } from './strategies/handlers/log-handler';
import { ToastrErrorHandler } from './strategies/handlers/toastr-handler';

try {
  throw Error('Ololo, Trololo!');
}
catch (error) {
  const errorHandlerFactory = () => new ErrorHandler(
    window.location.href.endsWith('console')
      ? new ConsoleErrorHandler()
      : new ToastrErrorHandler()
  );
  errorHandlerFactory().handle('oops', error.message || 'O.o', error);
}
