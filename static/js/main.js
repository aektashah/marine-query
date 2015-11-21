$(document).ready(function () {

  //Navigation Menu Slider
  $('#nav-expander').on('click', function (e) {
    e.preventDefault();
      $('.sidebar').toggleClass('sidebar-expanded');
    });

  $('#nav-expander').on('click', function () {
    if($('.sidebar-expanded').length <= 0) {
      $('.bottombar-expanded > nav').width('97%');
      $('.bottombar-expanded > nav').css('margin-left', '-26%');
    }
    if($('.sidebar-expanded').length > 0) {
      $('.bottombar-expanded > nav').width('71%');
      $('.bottombar-expanded > nav').css('margin-left', '0px');
    }
  });

  $('.sidebar-expanded').on('collapse', function(){
    $('.bottombar-expanded > nav').width('97%');
    $('.bottombar-expanded > nav').css('margin-left', '-26%')
    activateAndResetFields();
  })

  $('.sidebar .nav-close').on('click', function (e) {
    e.preventDefault();
    $('.sidebar').removeClass('sidebar-expanded');
    $('.bottombar-expanded > nav').width('97%');
    $('.bottombar-expanded > nav').css('margin-left', '-26%');
  });
  $('.bottombar .nav-close').on('click', function (e) {
    e.preventDefault();
    $('.bottombar-expanded > nav').height('27%');
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

  $('#drag').on('mousedown', function(e){
        var $dragable = $(this).parent(),
            startHeight = $dragable.height(),
            startWidth = $dragable.width(),
            pY = e.pageY;
        
        $(document).on('mouseup', function(e){
            $(document).off('mouseup').off('mousemove');
        });
        $(document).on('mousemove', function(me){
            var my = (me.pageY - pY);
            
            $dragable.css({
                height: startHeight - my, 
                width:startWidth
            });
        });
                
    });
	
		$("#myonoffswitch").on("click", function(e) {            
				if($("#data").css("display") == "inline") {
						$("#data").css("display", "none");
						$("#graphs").css("display", "inline");
				} else {
						$("#data").css("display", "inline");
						$("#graphs").css("display", "none");
				}
		});

});
