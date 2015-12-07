
var data;
$.ajax({"headers": {Accept: "application/json"}, "url":"http://159.203.111.95:8000/api/dev", "data": {}, "success": function(result) {  
    data = result;
    }
});

function getOptions(result){
    var myData = result;
    data = result;
    var visited = [];
    var locationsVisited = []
    var options = {};
    var loggerTypes = [];
    var country = [];
    var state = [];
    var location = [];
    var wave = [];
    var zone = [];
    var subzone = [];

    $.each(myData, function(i, d){
        var data = JSON.parse(d);
        if($.inArray(data.biomimic, visited)<0){
            console.log(data.biomimic);
            visited.push(data.biomimic);
            loggerTypes.push(toTitleCase(data.biomimic));
        }
        if($.inArray(data.country, visited)<0){
            visited.push(data.country);
            country.push(data.country);
        }
        if($.inArray(data.state_province, visited)<0){
            visited.push(data.state_province);
            state.push(data.state_province);
        }
        if($.inArray(data.location, locationsVisited)<0){
            locationsVisited.push(data.location);
            location.push(data.location);
        }
        if($.inArray(data.wave_exp, visited)<0 && data.wave_exp != 'ALL'){
            visited.push(data.wave_exp);
            wave.push(toTitleCase(data.wave_exp));
        }
        if($.inArray(data.zone, visited)<0 && data.zone != 'ALL'){
            visited.push(data.zone);
            zone.push(data.zone);
        }
        if($.inArray(data.sub_zone, visited)<0 && data.sub_zone != 'ALL'){
            visited.push(data.sub_zone);
            subzone.push(data.sub_zone);
        }
    })    
    options['logger-types'] = loggerTypes.sort();
    options['country'] = country.sort();
    options['state'] = state.sort();
    options['location'] = location.sort();
    options['wave'] = wave.sort();
    options['zone'] = zone.sort();
    options['subzone'] = subzone.sort();

    return options;
}

function initData() {
    $("body").ready(function() {
        $.ajax({"headers": {Accept: "application/json"}, "url":"http://159.203.111.95:8000/api/dev/", "data": {}, "success": function(result) {  
        var options = getOptions(result);
        var loggerTypes = options['logger-types'];
        var country = options['country'];
        var state = options['state'];
        var location = options['location'];
        var wave = options['wave'];
        var zone = options['zone'];
        var subzone = options['subzone'];
        var interval = ['10 Min Interval', 'Hourly', 'Daily', 'Weekly', 'Monthly', 'Yearly'];
        var maxmin = ['Max', 'Min', 'Average'];
        var days = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']; 
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']; 
        var d = new Date();
        var currentYear = d.getFullYear();
        var years = [];
        while (currentYear != 1999){
            years.push(currentYear)
            currentYear -= 1;
        }

        var hours = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'];
        var mins = ['00', '10', '20', '30', '40', '50'];

        var $logger_type = $('#logger-type');
        var $country = $('#country');
        var $state= $('#state');
        var $site = $('#site');
        var $wave = $('#wave');
        var $zone = $('#zone');
        var $sub_zone = $('#sub-zone');
        var $interval = $('#interval');
        var $maxmin = $('#maxmin');
        var $startday = $('#start-day');
        var $startmonth = $('#start-month');
        var $startyear = $('#start-year');
        var $starthour = $('#start-hour');
        var $startmin = $('#start-min');
        var $endday = $('#end-day');
        var $endmonth = $('#end-month');
        var $endyear = $('#end-year');
        var $endhour = $('#end-hour');
        var $endmin = $('#end-min');

        for(e in loggerTypes){
            $('<option>' + loggerTypes[e] + '</option>').appendTo($logger_type);
        }
        for(e in country){
            $('<option>' + country[e] + '</option>').appendTo($country);
        }
        for(e in state){
            $('<option>' + state[e] + '</option>').appendTo($state);
        }
        for(e in location){
            $('<option>' + location[e] + '</option>').appendTo($site);
        }
        for(e in wave){
           $('<option>' + wave[e] + '</option>').appendTo($wave);
        }
        for(e in zone){
            $('<option>' + zone[e] + '</option>').appendTo($zone);
            $('#zone option').css('display', 'none');
        }
        for(e in subzone){
            $('<option>' + subzone[e] + '</option>').appendTo($sub_zone);
        }
        for(e in interval){
        $('<option>' + interval[e] + '</option>').appendTo($interval);
        }
        for(e in maxmin){
            $('<option>' + maxmin[e] + '</option>').appendTo($maxmin);
        }
        for(e in days){
            $('<option>' + days[e] + '</option>').appendTo($startday);
            $('<option>' + days[e] + '</option>').appendTo($endday);
        }
        for(e in months){
            $('<option>' + months[e] + '</option>').appendTo($startmonth);
            $('<option>' + months[e] + '</option>').appendTo($endmonth);
        }
        for(e in years.reverse()){
            $('<option>' + years[e] + '</option>').appendTo($startyear);
            $('<option>' + years[e] + '</option>').appendTo($endyear);
        }
        for(e in hours){
            $('<option>' + hours[e] + '</option>').appendTo($starthour);
            $('<option>' + hours[e] + '</option>').appendTo($endhour);
        }
        for(e in mins){
            $('<option>' + mins[e] + '</option>').appendTo($startmin);
            $('<option>' + mins[e] + '</option>').appendTo($endmin);
        }
        }});
    });
}
initData();

// Adds markers to map
function initMarkers(L, map){
    $(document).ready(function() {
        $.ajax({"headers": {Accept: "application/json"}, "url":"http://159.203.111.95:8000/api/dev/", "data": {}, "success": function(result) {
            $.each(result, function(i, d){
                var data = JSON.parse(d);
                var marker = L.marker([data.field_lat, data.field_lon],
                    {title: 'Click to View Data',  
                     opacity: 0.5}).bindPopup("<b>Location: </b>" + 
                     data.location + ", " + data.state_province + ", " + 
                     data.country + 
                     "<br><b>Logger Type: </b>" + toTitleCase(data.biomimic) +
                     "<br><b>Logger ID: </b>" + data.microsite_id).addTo(map);
                marker.on('dblclick', function(e){
                    map.setView([data.field_lat-80, data.field_lon], map.getZoom() + 1, {animate: true});
                })
                marker._myId = data.microsite_id;

            })
        }});
    })
};

// Autofills one field
function populateField(selectedField, selected){
    var field = document.getElementById(selectedField);
    if(selectedField != 'site'){
        $('#' + selectedField).html('<option>' + selected + '</option>');
        field.value = selected;
    }
    else {
        field.value = selected;
    }
 }


// Autofills the drop downs in the filter
function populateAllFields(markerID){
    console.log(markerID);
    $(document).ready(function() {
        $.ajax({"headers": {Accept: "application/json"}, "url":"http://159.203.111.95:8000/api/dev/", "data": {}, "success": function(result) {
            $.each(result, function(i, d){
                var data = JSON.parse(d);
                if(data.microsite_id === markerID){
                    populateField('country', data.country);
                    deactivateField('country');
                    populateField('state', data.state_province);
                    deactivateField('state');
                    populateField('site', data.location);
                    deactivateField('site');
                }
            });
        }});
    });
}

// activate and reset the filter fields
function activateAndResetFields(){
    populateField('logger-type', 'ALL');
    populateField('country', 'ALL');
    populateField('state', 'ALL');
    populateField('site', 'ALL');
    populateField('wave', 'ALL');
    populateField('zone', 'ALL');
    populateField('sub-zone', 'ALL');
    populateField('interval', 'ALL');
    populateField('maxmin', 'ALL');
    populateField('start-day', 'DD');
    populateField('start-month', 'MM');
    populateField('start-year', 'YYYY');
    populateField('start-hour', 'HH');
    populateField('start-min', 'mm');
    populateField('end-day', 'DD');
    populateField('end-month', 'MM');
    populateField('end-year', 'YYYY');
    populateField('end-hour', 'HH');
    populateField('end-min', 'mm');

    initData();
    document.getElementById('logger-type').disabled=false;
    document.getElementById('country').disabled=false;
    document.getElementById('state').disabled=false;
    document.getElementById('site').disabled=false;
    document.getElementById('wave').disabled=false;
    document.getElementById('zone').disabled=false;
    document.getElementById('sub-zone').disabled=false;
    
    if($("#graphs").css("display") == "inline") {
        $("#graphs").css("display", "none");
        $("#data").css("display", "inline");
        $('.onoffswitch-inner:before').hide();
        $('.onoffswitch-inner:after').show();
    }

}

// Make the auto filled filter fields inactive
function deactivateField(fieldName){
    document.getElementById(fieldName).disabled=true;
}

// get the states given a country
$(document).ready(function() {
    $("#country").change(function() {
        console.log("change");
        var country = $("#country").val();
        $.ajax({"headers": {Accept: "application/json"}, "url":"http://159.203.111.95:8000/api/dev/", "data": {}, "success": function(result) {
            console.log(result);
            var states = [];
            $.each(result, function(i, d){
                var data = JSON.parse(d);
                if(country === data.country && $.inArray(data.state_province, states)<0){
                    states.push(data.state_province);
                }
            });
            console.log(states);
            changeCountry(states.sort());
        }});
        
    });
});

$(document).ready(function() {
    $("#state").change(function() {
        console.log("state");
        var state = $("#state").val();
        $.ajax({"headers": {Accept: "application/json"}, "url":"http://159.203.111.95:8000/api/dev/", "data": {}, "success": function(result) {
            console.log(result);
            var locations = [];
            $.each(result, function(i, d){
                var data = JSON.parse(d);
                if(state === data.state_province && $.inArray(data.location, locations)<0){
                    locations.push(data.location);
                }
            });
            console.log(locations);
            changeState(locations.sort());
        }});
        
    });
});





