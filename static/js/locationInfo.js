var data;
$.ajax({"headers": {Accept: "application/json"}, "url":"http://159.203.111.95:8000/api/dev", "data": {}, "success": function(result) {  
    data = result;
    }
});

function getOptions(){
    var myData = data;
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

    $(document).ready(function() {
        $.each(myData, function(){
            if(this.microsite_id)
            if($.inArray(this.biomimic, visited)<0){
                visited.push(this.biomimic);
                loggerTypes.push(this.biomimic);
            }
            if($.inArray(this.country, visited)<0){
                visited.push(this.country);
                country.push(this.country);
            }
            if($.inArray(this.state_province, visited)<0){
                visited.push(this.state_province);
                state.push(this.state_province);
            }
            if($.inArray(this.location, locationsVisited)<0){
                locationsVisited.push(this.location);
                location.push(this.location);
            }
            if($.inArray(this.wave_exp, visited)<0 && this.wave_exp != 'N/A'){
                visited.push(this.wave_exp);
                wave.push(this.wave_exp);
            }
            if($.inArray(this.zone, visited)<0 && this.zone != 'N/A'){
                visited.push(this.zone);
                zone.push(this.zone);
            }
            if($.inArray(this.sub_zone, visited)<0 && this.sub_zone != 'N/A'){
                visited.push(this.sub_zone);
                subzone.push(this.sub_zone);
            }
        })    
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

function initdata(){
    var options = getOptions();
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
}

    // Adds markers to map
    function initMarkers(L, map){
        $(document).ready(function() {
            $.each(data, function(){
                var marker = L.marker([this.field_lat, this.field_lon],
                    {title: 'Click to View Data',  
                     opacity: 0.5}).bindPopup("<b>Location: </b>" + 
                     this.location + ", " + this.state_province + ", " + 
                     this.country + 
                     "<br><b>Logger Type: </b>" + this.biomimic +
                     "<br><b>Logger ID: </b>" + this.microsite_id).addTo(map);
                marker.on('dblclick', function(e){
                    map.setView([this.field_lat-80, this.field_lon], map.getZoom() + 1, {animate: true});
                })
                marker._myId = this.microsite_id;

            })
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
        $(document).ready(function() {
            $.each(data, function(){
                if(this.microsite_id === markerID){
                    populateField('logger-type', this.biomimic);
                    deactivateField('logger-type');
                    populateField('country', this.country);
                    deactivateField('country');
                    populateField('state', this.state_province);
                    deactivateField('state');
                    populateField('site', this.location);
                    if(this.wave_exp =! "N/A"){
                        populateField('wave', this.wave_exp);
                        deactivateField('wave');
                    }
                    if(this.zone != "N/A"){
                        populateField('zone', this.zone);
                        deactivateField('zone');
                    }
                    if(this.sub_zone != "N/A"){
                        populateField('sub-zone', this.sub_zone);
                        deactivateField('sub-zone');
                    }
                    
                }
            })
        })
        }

    // Make the auto filled filter fields inactive
    function deactivateField(fieldName){
        document.getElementById(fieldName).disabled=true;
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

        initdata();
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
    function getStates(country){
        var dataString = JSON.stringify(data);
        var myData = JSON.parse(dataString);
        var states = [];
        $(document).ready(function() {
            $.each(myData, function(){
                if(country === 'ALL' && $.inArray(this.state_province, states)<0){
                    states.push(this.state_province);
                }
                if(country === this.country && $.inArray(this.state_province, states)<0){
                    states.push(this.state_province);
                }
            })
        })
        return states.sort();
    }

    // get the locations given the state
    function getLocationsFromState(state){
        var dataString = JSON.stringify(data);
        var myData = JSON.parse(dataString);
        var locations = []
        $(document).ready(function() {
            $.each(myData, function(){
                if(state === 'ALL' && $.inArray(this.location, locations)<0){
                    locations.push(this.location);
                }
                if(state === this.state_province && $.inArray(this.location, locations)<0){
                    locations.push(this.location);
                }
            })
        })
        return locations.sort();
    }

     // get the locations given the state
    function getLocationsFromCountry(country){
        var dataString = JSON.stringify(data);
        var myData = JSON.parse(dataString);
        var locations = []
        $(document).ready(function() {
            $.each(myData, function(){
                if(country === 'ALL' && $.inArray(this.location, locations)<0){
                    locations.push(this.location);
                }
                if(country === this.country && $.inArray(this.location, locations)<0){
                    locations.push(this.location);
                }
            })
        })
        return locations.sort();
    }

    // get the lat and long of the location
    function getLatLong(location){
        var dataString = JSON.stringify(data);
        var myData = JSON.parse(dataString);
        var locations = []
        $(document).ready(function() {
            $.each(myData, function(){
                if(location === this.location){
                    return [this.field_lat, this.field_lon];
                }
            })
        })

    }
