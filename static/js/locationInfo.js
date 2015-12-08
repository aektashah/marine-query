/*var data;
$.ajax({"headers": {Accept: "application/json"}, "url":"http://159.203.111.95:8000/api/dev", "data": {}, "success": function(result) {
    //console.log(result);   
    data = result;
    }
});
console.log(data);
*/
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
        var data = d;
        //var data = JSON.parse(d);
        if($.inArray(data.biomimic, visited)<0){
            //console.log(data.biomimic);
            visited.push(data.biomimic);
            loggerTypes.push(data.biomimic);
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
        if($.inArray(data.wave_exp, visited)<0 && data.wave_exp != 'N/A'){
            visited.push(data.wave_exp);
            wave.push(data.wave_exp);
        }
        if($.inArray(data.zone, visited)<0 && data.zone != 'N/A'){
            visited.push(data.zone);
            zone.push(data.zone);
        }
        if($.inArray(data.sub_zone, visited)<0 && data.sub_zone != 'N/A'){
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
            //console.log(result);   
            var options = getOptions(result);
            var loggerTypes = options['logger-types'];
            var country = options['country'];
            var state = options['state'];
            var location = options['location'];
            var wave = options['wave'];
            var zone = options['zone'];
            var subzone = options['subzone'];

            var $logger_type = $('#logger-type');
            var $country = $('#country');
            var $state= $('#state');
            var $site = $('#site');
            var $wave = $('#wave');
            var $zone = $('#zone');
            var $sub_zone = $('#sub-zone');
            $country.empty();
            $state.empty();
            $site.empty();
            $wave.empty();
            $zone.empty()
            $sub_zone.empty();
            $logger_type.empty();
            $('<option>ALL</option>').appendTo($logger_type);
            $('<option>ALL</option>').appendTo($country);
            $('<option>ALL</option>').appendTo($state);
            $('<option>ALL</option>').appendTo($wave);
            $('<option selected="selected">ALL</option>').appendTo($site);
            $('<option>ALL</option>').appendTo($zone);
            $('<option>ALL</option>').appendTo($sub_zone);

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
                //$('#zone option').css('display', 'none');
            }
            for(e in subzone){
                $('<option>' + subzone[e] + '</option>').appendTo($sub_zone);
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
                var data = d;
                //console.log(data);
                var marker = L.marker([data.field_lat, data.field_lon],
                    {title: 'Click to View Data',  
                     opacity: 0.5}).bindPopup("<b>Location: </b>" + 
                     data.location + ", " + data.state_province + ", " + 
                     data.country).addTo(map);
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
    //console.log(selected);
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
    $(document).ready(function() {
        $.ajax({"headers": {Accept: "application/json"}, "url":"http://159.203.111.95:8000/api/dev/", "data": {}, "success": function(result) {
            $.each(result, function(i, d){
                var data = d;
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

// Make the auto filled filter fields inactive
function deactivateField(fieldName){
    document.getElementById(fieldName).disabled=true;
}

// activate and reset the filter fields
function activateAndResetFields(){
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

// get the states given a country
$(document).ready(function() {
    $("#country").change(function() {
        console.log("change");
        var country = $("#country").val();
        $.ajax({"headers": {Accept: "application/json"}, "url":"http://159.203.111.95:8000/api/dev/", "data": {}, "success": function(result) {
            console.log(result);
            var states = [];
            $.each(result, function(i, d){
                var data =d;
                if(country === data.country && $.inArray(data.state_province, states)<0){
                    states.push(data.state_province);
                }
            });
            //console.log(states);
            changeCountry(states.sort());
        }});
        
    });
});

$(document).ready(function() {
    $("#state").change(function() {
        console.log("state");
        var state = $("#state").val();
        $.ajax({"headers": {Accept: "application/json"}, "url":"http://159.203.111.95:8000/api/dev/", "data": {}, "success": function(result) {
            //console.log(result);
            var locations = [];
            $.each(result, function(i, d){
                var data = d;
                if(state === data.state_province && $.inArray(data.location, locations)<0){
                    locations.push(data.location);
                }
            });
            //console.log(locations);
            changeState(locations.sort());
        }});
        
    });
});






