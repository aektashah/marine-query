
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
    // send query to the server
    sendQuery();
}

function sendQuery() {
    var loggerType = $("#logger-type").val();
    var country = $("#country").val();
    var state = $("#state").val();
    var loc = $("#site").val()[0];
    var wave = $("#wave").val();
    var zone = $("#zone").val();
    var subzone = $("#sub-zone").val();
    var interval = $("#interval").val();
    var intervalMaxmin = $("#maxmin").val();
    var startTime = $("#start-time > select");
    var endTime = $("#end-time > select");
    var query = {"country": country, "biomimic": loggerType};
    var devices = newData[loc][loggerType];
    var result;
    console.log(devices);
    //var query = {"biomimic": loggerType, "country": country, "state_province": state, "location": loc, "wave_exp": wave, "zone": zone, "sub_zone": subzone}// "interval": interval, "intervalMaxmin": intervalMaxmin, "start_date": startTime, "end_date": endTime};
    $.each(devices, function(i, device) {
        $.ajax({"url": "http://159.203.111.95:6969/api/reading", "data": {"device": "BMRMUSORFC1"},"success": function(resp) {
            console.log(resp);
            result = resp;
        }});
    });
    filterData(result, wave, zone, subzone, interval, intervalMaxmin, startTime, endTime);
}
function filterData(result, wave, zone, subzone, interval, intervalMaxmin, startTime, endTime) {
    var final = [];
    //console.log(parseDate(startTime));
    parseDate(startTime); 
    $.each(result, function(i, item) {
        
    });
}
function parseDate(date) {
    var finalDate = "";
    $.each(date, function(i, d){ 
        console.log(d);
        //finalDate + d + " ";
    });
    $.trim(finalDate);
    return finalDate;

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
        var locations = getLocations(val);
        var locationsString = '<option>ALL</option>';
        for(e in locations){
            locationsString = locationsString + '<option>' + locations[e] + '</option>';
        }
        $('#site').html(locationsString);
    })
}

$(document).ready(function () {
    main();
});


