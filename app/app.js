$(function ready() {

  $.getJSON('./app/data.json').then(function onData(data) {
    var template = $('#data-template').html();
    var users = { title: 'Hello!', users: data };
    var html = Mustache.to_html(template, users);
    $('#app').html(html);
  });

});
