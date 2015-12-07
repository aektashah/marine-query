var map;
var ajaxRequest;
var plotlist;
var plotlayers=[];


//INITIALIZE THE MAP
function initmap() {
	// set up the map
	// initialize the map
  var map = L.map('map', {
    worldCopyJump: true,
    inertia: false
  }).setView([-8.407168, 26.015625], 2);

  // load a tile layer

  L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/{type}/{z}/{x}/{y}.{ext}', {
  type: 'map',
  ext: 'jpg',
  attribution: 'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: '1234', 
  minZoom:2,
  maxZoom:17
  }).addTo(map);

  map.doubleClickZoom.enable();

  initMarkers(L, map);

  map.on('popupopen', function(centerMarker) {
        $('.sidebar').addClass('sidebar-expanded');
        $('.bottombar').addClass('bottombar-expanded');
        $('.bottombar-expanded > nav').width('70%');
        $('.sidebar-expanded > nav').width("25%");
        $('.bottombar-expanded > nav').css('margin-left', '1%');
        var cM = map.project(centerMarker.popup._latlng);
        $("nav").scrollTop(0);
        console.log(centerMarker.popup._source._myId);
        populateAllFields(centerMarker.popup._source._myId);
        cM.y -= centerMarker.popup._container.clientHeight-200;
        cM.x -= centerMarker.popup._container.clientWidth-180;
        map.panTo(map.unproject(cM), {animate: true});
        if($("#graphs").css("display") == "inline") {
            $("#graphs").css("display", "none");
            $("#data").css("display", "inline");
            console.log('this' + $(".onoffswitch-inner:after").css("content"));
            if($(".onoffswitch-inner:after").css("content") == "GRAPH"){
              console.log($(".onoffswitch-inner:after").css("content"));
                $(".onoffswitch-inner:before").css("content", "DATA")
            }
        }
        
        });

  map.on('popupclose', function(){
    $('.sidebar > nav').width("20%");
    $('.sidebar').removeClass('sidebar-expanded');
    $('.bottombar > nav').height("28%");
    $('.bottombar').removeClass('bottombar-expanded');
    activateAndResetFields();
  });

  map.on('dblclick', function(marker){
    map.setView(marker.latlng, map.getZoom() + 1, {animate: true});
  });
};








