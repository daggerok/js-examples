$(function ready() {

  function createTitle(text) {
    var h1 = document.createElement('h1');
    h1.textContent = text;
    return h1;
  }

  var app = document.querySelector('#app');
  var fragment = document.createDocumentFragment();
  var ul = document.createElement('ul');

  $.getJSON('./app/data.json').then(function onData(data) {
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
  });

});
