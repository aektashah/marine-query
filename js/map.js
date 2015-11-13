var map;
var ajaxRequest;
var plotlist;
var plotlayers=[];


//INITIALIZE THE MAP
function initmap() {
	// set up the map
	// initialize the map
  var map = L.map('map').setView([-8.407168, 26.015625], 2);

  // load a tile layer

  L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/{type}/{z}/{x}/{y}.{ext}', {
  type: 'map',
  ext: 'jpg',
  attribution: 'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: '1234', 
  minZoom:2,
  maxZoom:17
  }).addTo(map);


  initMarkers(L, map);

  map.on('popupopen', function(centerMarker) {
        $('body').addClass('nav-expanded');
        var cM = map.project(centerMarker.popup._latlng);
        $("nav").scrollTop(0);
        populateAllFields(centerMarker.popup._source._myId);
        cM.y -= centerMarker.popup._container.clientHeight-200;
        cM.x -= centerMarker.popup._container.clientWidth-180;
        map.panTo(map.unproject(cM), {animate: true});
        });

  map.on('popupclose', function(){
    $('body').removeClass('nav-expanded');
    activateAndResetFields();
  });
};




