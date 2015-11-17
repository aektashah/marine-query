$(document).ready(function () {

  //Navigation Menu Slider
  $('#nav-expander').on('click', function (e) {
    e.preventDefault();
    $('.sidebar').toggleClass('sidebar-expanded');
    activateAndResetFields();
  });
  $('.sidebar .nav-close').on('click', function (e) {
    e.preventDefault();
    $('.sidebar').removeClass('sidebar-expanded');
  });
  $('.bottombar .nav-close').on('click', function (e) {
    e.preventDefault();
    $('.bottombar').removeClass('bottombar-expanded');
  });

  $('#generate').on('click', function(e) {
    e.preventDefault();
    if ($('.bottombar-expanded').length == 0) {
      $('.bottombar').addClass('bottombar-expanded');
    }
  });

  // Initialize navgoco with default options
  $(".main-menu").navgoco({
    caret: '<span class="caret"></span>',
    accordion: false,
    openClass: 'open',
    save: true,
    cookie: {
      name: 'navgoco',
      expires: false,
      path: '/'
    },
    slide: {
      duration: 300,
      easing: 'swing'
    }
  });


});