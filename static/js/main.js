
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
    var loc = $("#site").val()[0];
    var wave_exp = $("#wave").val();
    var sub_zone = $("#sub-zone").val();
    var startDay = $("#start-day").val();
    var startMonth = $("#start-month").val();
    var startYear = $("#start-year").val();
    var startHour = $("#start-hour").val();
    var startMin = $("#start-min").val();
    var endDay = $("#end-day").val();
    var endMonth = $("#end-month").val();
    var endYear = $("#end-year").val();
    var endHour = $("#end-hour").val();
    var endMin = $("#end-min").val();
    var startDate = parseDate(startDay, startMonth, startYear, startHour, startMin);
    var endDate = parseDate(endDay, endMonth, endYear, endHour, endMin);
    var query = {"start_date": startDate,"end_date": endDate, "location": loc, "sub_zone": sub_zone};
    // parsing ALL
    $.each(query, function(k, v) {
        if (v == "ALL"){
            delete query[k];
        }
    });
    // parsing date
    console.log(query);
    var devices = [];//newData[loc][loggerType];
    /*if (loggerType == "ALL") {
        $.each(newData[loc], function(type, subdevices) {
            devices = devices.concat(subdevices);
        });
    }*/
    $.ajax({"headers": {Accept: "application/json"}, "url": "http://159.203.111.95:8000/api/reading/", "data": query,"success": function(resp) {
        result = resp;
        console.log(resp.length);
    }});
    /*$.each(devices, function(i, device) {
        $.ajax({"headers": {Accept: "application/json"}, "url": "http://159.203.111.95:8000/api/reading/", "data": query,"success": function(resp) {
            result = resp;
            console.log(resp.length);
        }});
    });*/
}
function parseDate(day, month, year, hour, min) {
    var result = "";
    if (year != "YYYY") {
        result = result + year + "/";
        if (month != "MM") {
            result = result + month + "/";
        }
        else if (month == "MM") {
            result = result + "01" + "/";
        }
        if (day != "DD"){
            result = result + day + " ";
        }
        else if (day == "DD") {
            result = result + "01" + " ";
        }
        if (hour == "HH") {
            result = result + "00:";
        }
        else if (hour != "HH") {
            result = result + hour + ":";
        }
        if (min == "MM") {
            result = result + "00";
        }
        else if (min != "MM") {
            result = result + min;
        }
    }
    else {
        result = "ALL";
    }
    console.log(result);
    return result;

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
function changeCountry(states) {
    var statesString = '<option>ALL</option>';
    for(e in states){
        statesString = statesString + '<option>' + states[e] + '</option>';
    }
    $('#state').html(statesString);
}

function changeState(locations) {
    var locationsString = '<option>ALL</option>';
    for(e in locations){
        locationsString = locationsString + '<option>' + locations[e] + '</option>';
    }
    $('#site').html(locationsString);
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
}

$(document).ready(function () {
    main();
    console.log("asdf");
});


