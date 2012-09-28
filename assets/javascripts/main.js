var load_github_user = function(username, callback) {
  $.getJSON('https://api.github.com/users/' + username + '?callback=?', callback);
}

var participant_view = '<strong>{{name}} from {{location}}</strong> (<a href="{{html_url}}">@{{login}}</a>)<br>{{bio}}'

$('#participants li').each( function() {
  var $el  = $(this),
      user = $el.text();

  console.log('$el', $el)
  load_github_user(user, function(data){
    console.log('data', data, data.data)
    $el.html(Mustache.to_html(participant_view, data.data))
  })
});