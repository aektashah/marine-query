/**
* Front end Javascript code
**/

<<<<<<< HEAD
  //Navigation Menu Slider
    function toggleSidebar() {
        $('.sidebar').toggleClass('sidebar-expanded');
        if($('.sidebar-expanded').length <= 0) {
            $('.bottombar-expanded > nav').width('97%');
            $('.bottombar-expanded > nav').css('margin-left', '-26%');
        }
        if($('.sidebar-expanded').length > 0) {
            $('.bottombar-expanded > nav').width('70%');
            $('.bottombar-expanded > nav').css('margin-left', '1%');
        }
=======
<<<<<<< HEAD
//Navigation Menu Slider
function toggleSidebar() {
    $('.sidebar').toggleClass('sidebar-expanded');
    if($('.sidebar-expanded').length <= 0) {
        $('.bottombar-expanded > nav').width('97%');
        $('.bottombar-expanded > nav').css('margin-left', '-26%');
    }
    if($('.sidebar-expanded').length > 0) {
        $('.bottombar-expanded > nav').width('71%');
        $('.bottombar-expanded > nav').css('margin-left', '0px');
>>>>>>> origin/frontend2.0
    }
}

/*$('#nav-expander').on('click', function () {
    if($('.sidebar-expanded').length <= 0) {
        $('.bottombar-expanded > nav').width('97%');
        $('.bottombar-expanded > nav').css('margin-left', '-26%');
    }
    if($('.sidebar-expanded').length > 0) {
        $('.bottombar-expanded > nav').width('71%');
        $('.bottombar-expanded > nav').css('margin-left', '0px');
=======
    /*$('#nav-expander').on('click', function () {
        if($('.sidebar-expanded').length <= 0) {
            $('.bottombar-expanded > nav').width('97%');
            $('.bottombar-expanded > nav').css('margin-left', '-26%');
        }
        if($('.sidebar-expanded').length > 0) {
            $('.bottombar-expanded > nav').width('71%');
            $('.bottombar-expanded > nav').css('margin-left', '0px');
        }
    });
*/
    // expand bottom bar when sidebar collapse
    function sidebarCollapse() {
        $('.bottombar-expanded > nav').width('97%');
        $('.bottombar-expanded > nav').css('margin-left', '-26%')
        activateAndResetFields();
    }
    // remove sidebar from screen
    function removeSidebar() {
        $('.sidebar').removeClass('sidebar-expanded');
        $('.bottombar-expanded > nav').width('97%');
        $('.bottombar-expanded > nav').css('margin-left', '-26%');
    }
    // collapse bottom bar
    function bottombarCollapse() {
        $('.bottombar-expanded > nav').height('27%');
        $('.bottombar').removeClass('bottombar-expanded');
    }
    // expand bottom bar when generate is clicked
    function generate() {
        if ($('.bottombar-expanded').length == 0) {
            $('.bottombar').addClass('bottombar-expanded');
        }
>>>>>>> a9b530f70eac692ad0ead5a629dff81f6123e284
    }
});
*/
function sidebarCollapse() {
    $('.bottombar-expanded > nav').width('97%');
    $('.bottombar-expanded > nav').css('margin-left', '-26%')
    activateAndResetFields();
}
function removeSidebar() {
    $('.sidebar').removeClass('sidebar-expanded');
    $('.bottombar-expanded > nav').width('97%');
    $('.bottombar-expanded > nav').css('margin-left', '-26%');
    console.log("remove");
}
function bottombarCollapse() {
    $('.bottombar-expanded > nav').height('27%');
    $('.bottombar').removeClass('bottombar-expanded');
}

function generate() {
    if ($('.bottombar-expanded').length == 0) {
        $('.bottombar').addClass('bottombar-expanded');
    }
}

<<<<<<< HEAD
// Initialize navgoco with default options
function initNavgoco() {
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
=======
    // toggle between graph and data
    function bottombarContent() {
        if($("#data").css("display") == "inline") {
            $("#data").css("display", "none");
            $("#graphs").css("display", "inline");
        } else {
            $("#data").css("display", "inline");
            $("#graphs").css("display", "none");
>>>>>>> a9b530f70eac692ad0ead5a629dff81f6123e284
        }
    });
}

function bottombarContent() {
    if($("#data").css("display") == "inline") {
        $("#data").css("display", "none");
        $("#graphs").css("display", "inline");
    } else {
        $("#data").css("display", "inline");
        $("#graphs").css("display", "none");
    }
<<<<<<< HEAD
}

function main() {
    $('#nav-expander').on('click', function (e) {
        e.preventDefault();
        toggleSidebar();
    });
=======
    
    function main() {
        $('#nav-expander').on('click', function (e) {
            e.preventDefault();
            toggleSidebar();
        });
>>>>>>> a9b530f70eac692ad0ead5a629dff81f6123e284

    $('.sidebar-expanded').on('collapse', function(){
        sidebarCollapse();
    });
    
    $('.sidebar .nav-close').on('click', function (e) {
        e.preventDefault();
        removeSidebar();
    });
    
    $('.bottombar .nav-close').on('click', function (e) {
        e.preventDefault();
        bottombarCollapse();
    });
    
    $('#generate').on('click', function(e) {
        e.preventDefault();
        generate();
    });
    
    initNavgoco();

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
    $("#myonoffswitch").on("click", function() {
        bottombarContent();
    });
}

$(document).ready(function () {
    main();
});


