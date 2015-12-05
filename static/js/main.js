
//Navigation Menu Slider
function toggleSidebar() {
    $('.sidebar').toggleClass('sidebar-expanded');
    if($('.sidebar-expanded').length <= 0) {
        $('.sidebar > nav').width('20%');
        $('.bottombar-expanded > nav').width('97%');
        $('.bottombar-expanded > nav').css('margin-left', '-26%');
    }
    if($('.sidebar-expanded').length > 0) {
        $('.sidebar > nav').width('25%');
        $('.bottombar-expanded > nav').width('70%');
        $('.bottombar-expanded > nav').css('margin-left', '1%');
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
    }
});
*/
// expand bottom bar when sidebar collapse
function sidebarCollapse() {
    $('.sidebar > nav').width('20%');
    $('.bottombar-expanded > nav').width('97%');
    $('.bottombar-expanded > nav').css('margin-left', '-26%')
    activateAndResetFields();
}
// remove sidebar from screen
function removeSidebar() {
    $('.sidebar > nav').width('20%');
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
        $('.bottombar-expanded > nav').width('70%');
        $('.bottombar-expanded > nav').css('margin-left', '1%');
        $('.bottombar').addClass('bottombar-expanded');
    }
}

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
        }
    });
}

// toggle between graph and data
function bottombarContent() {
    if($("#data").css("display") == "inline") {
        $("#data").css("display", "none");
        $("#graphs").css("display", "inline");
    } else {
        $("#data").css("display", "inline");
        $("#graphs").css("display", "none");
    }
}

// Main function 
function main() {
    $('#nav-expander').on('click', function (e) {
        e.preventDefault();
        toggleSidebar();
    });

    $('.sidebar-expanded').on('collapse', function(){
        sidebarCollapse();
    });
    
    $('.sidebar .nav-close').on('click', function (e) {
        e.preventDefault();
        removeSidebar();
    });

    $('.main-menu li span').on('click', function (e) {
        e.preventDefault();
        activateAndResetFields();
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

    // changes the zones based on logger type selection
    $('#logger-type').change(function(){
        var val = $(this).val();
        if(val === 'robocoral'){
            $('#zone').html('<option>ALL</option><option>0m</option><option>1m</option><option>2m</option><option>5m</option><option>10m</option><option>14m</option><option>20m</option><option>30m</option><option>40m</option>');
            $('#zone option').css('display', 'inline');
        }
        else if(val == 'ALL'){
            ('#zone').html('<option>ALL</option>');
            $('#zone option').css('display', 'none');
        }
        else {
            $('#zone').html('<option>ALL</option><option>High</option><option>Mid</option><option>Low</option>');
        }
    })

    // changes the states/provinces based on country selection
    $('#country').change(function(){
        var val = $(this).val();
        console.log(val);
        var states = getStates(val);
        
        var statesString = '<option>ALL</option>';
        for(e in states){
            statesString = statesString + '<option>' + states[e] + '</option>';
        }
        console.log(statesString);
        $('#state').html(statesString);
    })

    // changes the location based on state/province selection
    $('#state').change(function(){
        var val = $(this).val();
        console.log(val);
        var locations = getLocations(val);
        console.log(locations);
        var locationsString = '<option>ALL</option>';
        for(e in locations){
            locationsString = locationsString + '<option>' + locations[e] + '</option>';
        }
        console.log('string = ' + locationsString);
        $('#site').html(locationsString);
    })
}

$(document).ready(function () {
    main();
});


