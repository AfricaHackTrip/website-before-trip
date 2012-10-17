var load_github_user = function(username, callback) {
  $.getJSON('https://api.github.com/users/' + username + '?callback=?', callback);
};
load_github_user_questionary = function(username, callback) {
  $.getJSON('https://api.github.com/repos/AfricaHackTrip/africahacktrip.github.com/contents/participants/' + username.toLowerCase() + '.md?callback=?', function(data){
    callback(atob(data.data.content.replace(/\n/g, "")));
  });
};

var showMoreorLess = function($el, markdown) {
  if($el.html().length) {
    $el.html('').hide();
  } else {
    var converter = new Showdown.converter();
    $el.html(converter.makeHtml(markdown)).show();
  }
};

var participant_view = '<img src="{{avatar_url}}" style="float: left; width: 100px;"/><strong>{{name}} from {{location}}</strong> (<a href="{{html_url}}">@{{login}}</a>)<br>{{bio}}<br><div class="more-content"></div><a href="#" class="more" data-user="{{login}}">more...</a>';

$('#participants li').each( function() {
  var $el  = $(this),
      user = $el.text();

  load_github_user(user, function(data){
    $el.html(Mustache.to_html(participant_view, data.data));
  });
});

$('#participants').on('click', '.more', function(event) {
  var user = $(event.currentTarget).data('user'),
    $el  = $(this).parents('li');
  load_github_user_questionary(user, function(text) {
    showMoreorLess($el.find('.more-content'), text);
  });
  return false;
});
