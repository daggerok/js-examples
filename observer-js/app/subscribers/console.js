export class Console {
  on(oldValue, newValue) {
    console.log(`handling changes in console:
old value: ${oldValue}, new value: ${newValue}`);
  }
}
