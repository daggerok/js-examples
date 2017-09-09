document.addEventListener('DOMContentLoaded', function main() {
  var app = document.querySelector('#app');
  var fragment = document.createDocumentFragment();
  var container = document.createElement('h1');
  container.textContent = 'Hello!';
  fragment.appendChild(container);
  app.appendChild(fragment);
});
