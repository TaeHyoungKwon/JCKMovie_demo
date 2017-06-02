$(window).load(function() {
  $('.post-module').hover(function() {
    $(this).find('.description').stop().animate({
      height: "toggle",
      opacity: "toggle"
    }, 300);
  });
});


$(document).ready(function() {
  $('#media3').carousel({
    pause: true,
    interval: false,
  });
});

$(document).ready(function() {
  $('#media4').carousel({
    pause: true,
    interval: false,
  });
});
