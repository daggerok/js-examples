import 'toastr/build/toastr.min.css';
import * as toastr from 'toastr';

export class ToastrErrorHandler {
  handle(title, body, errObj) {
    toastr.error(`title: ${title} | body: ${body}`);
  }
}
