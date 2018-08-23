(function app() {

  function createTitle(text) {
    var h1 = document.createElement('h1');
    h1.textContent = text;
    return h1;
  }

  function getRequest(toUrl) {
    var request = !!window.XMLHttpRequest
      ? new XMLHttpRequest()
      : new ActiveXObject('Microsoft.XMLHTTP');
    request.open('GET', toUrl);
    request.send();
    return request;
  }

  document.addEventListener('DOMContentLoaded', function bootstrap() {

    var app = document.querySelector('#app');
    var fragment = document.createDocumentFragment();
    var ul = document.createElement('ul');

    var request = getRequest('./app/data.json');
    request.addEventListener('readystatechange', function fetchData() {

      if (request.readyState !== 4) return;
      if (!request.responseText) return;

      var data = JSON.parse(request.responseText);
      data.map(function eachDataItem(item) {
        var value = item.url + '/' + item.username;
        var div = document.createElement('div');
        var li = document.createElement('li');
        div.textContent = value;
        li.appendChild(div);
        ul.appendChild(li);
      });

      fragment.appendChild(createTitle('Hey!'));
      fragment.appendChild(ul);
      app.appendChild(fragment);
    }, false);

  });

})();
