$(function ready() {

  function compile(selector, data) {
    var template = $(selector).html();
    return Mustache.to_html(template, data);
  }

  var title = compile('#title-template', { title: 'Hi!'});
  $('#title').html(title);

  $.getJSON('./app/data.json').then(function onData(data) {
    var html = compile('#data-template', { users: data });
    $('#app').html(html);
    $('#app').cycle({
      // fx: 'fade',
      pause: 1,
      next: '#next',
      prev: '#prev',
      speed: 500,
      timeout: 5000,
      opacity: 0.5,
    });
  });

});
