// !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");

function showQuestionaire(event) {
  $('article.more').removeClass('more')

  if (location.hash) {
    $(location.hash).addClass('more')
    scrollToTop( $(location.hash).offset().top )
    
  } else {
    if (event.oldURL) {
      var anchor = event.oldURL.split('#')[1]

      if (anchor) {
        scrollToTop( $( '#' + anchor).offset().top )
      }
    }
  }
}
function scrollToTop(top) {
  window.setTimeout( function() {
    window.scrollTo(0, top - 20)
  }, 100)
}
window.onhashchange = showQuestionaire;
showQuestionaire({})