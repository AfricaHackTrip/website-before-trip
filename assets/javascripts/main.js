var load_github_user = function(username, callback) {
  $.getJSON('https://api.github.com/users/' + username + '?callback=?', callback);
}
load_github_user_questionary = function(username, callback) {
  $.getJSON('https://api.github.com/repos/AfricaHackTrip/africahacktrip.github.com/contents/participants/' + username.toLowerCase() + '.md?callback=?', function(data){
    callback(atob(data.data.content.replace(/\n/g, "")))
  });
}

var participant_view = '<img src="{{avatar_url}}" style="float: left; width: 100px;"/><strong>{{name}} from {{location}}</strong> (<a href="{{html_url}}">@{{login}}</a>)<br>{{bio}}<br><a href="#" class="more" data-user="{{login}}">more...</a>'

$('#participants li').each( function() {
  var $el  = $(this),
      user = $el.text();

  load_github_user(user, function(data){
    $el.html(Mustache.to_html(participant_view, data.data))
  })
});

$('#participants').on('click', '.more', function(event) {
  var user = $(event.currentTarget).data('user');
  load_github_user_questionary(user, alert)
  return false
})