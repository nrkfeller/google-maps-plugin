// https://maps.googleapis.com/maps/api/geocode/json?address=775+Park+Avenue&key=AIzaSyByyuocMAc-YxkzhInuQT3kDNIsbK5Z7BQ
// https://maps.googleapis.com/maps/api/geocode/json?latlng=33.1262476,-117.3115765&key=AIzaSyByyuocMAc-YxkzhInuQT3kDNIsbK5Z7BQ
var map;
var markers = [];
var myLocationMarker;
var currentLocation;


function initMap() {
    // Constructor creates a new map - only center and zoom are required.
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 3.140029,
            lng: 101.685994
        },
        styles: styles,
        zoom: 11
    });

    var defaultIcon = makeMarkerIcon('da0011');
    // Create a "highlighted location" marker color for when the user
    // mouses over the marker.
    var highlightedIcon = makeMarkerIcon('eb8300');
    //
    currentLocation = new google.maps.LatLng(3.13900, 101.68685);
    myLocationMarker = new google.maps.Marker({
        position: currentLocation,
        title: "You Are Here",
        cursor: "Start Point",
        animation: google.maps.Animation.DROP,
        id: 999,
        icon: makeMarkerIcon('15bf15')
    });
    //markers.push(marker);
    myLocationMarker.setMap(map);
    // Create an onclick event to open an infowindow at each marker.
    myLocationMarker.addListener('click', function() {
        populateInfoWindow(this, largeInfowindow);
    });

    var bounds = new google.maps.LatLngBounds();
    var largeInfowindow = new google.maps.InfoWindow();

    for (var i = 0; i < Locations.length; i++) {
        var position = Locations[i].location;
        var title = Locations[i].title;
        var address = "Address:" + Locations[i].address;
        var marker = new google.maps.Marker({
            position: position,
            title: title,
            cursor: address,
            animation: google.maps.Animation.DROP,
            icon: defaultIcon,
            id: i
        });
        // Push the marker to our array of markers.
        markers.push(marker);
        // Create an onclick event to open an infowindow at each marker.
        marker.addListener('click', function() {
            populateInfoWindow(this, largeInfowindow);
        });

        marker.addListener('mouseover', function() {
            this.setIcon(highlightedIcon);
        });
        marker.addListener('mouseout', function() {
            this.setIcon(defaultIcon);
        });
    }
    document.getElementById('show-listings').addEventListener('click', showListings);
    document.getElementById('hide-listings').addEventListener('click', hideListings);
    document.getElementById('zoom-to-area').addEventListener('click', function() {
         zoomToArea();
       });


}

function populateInfoWindow(marker, infowindow) {
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker != marker) {
        infowindow.marker = marker;
        infowindow.setContent('<div>' + marker.title + '</div>' + '<hr />' + marker.cursor);
        infowindow.open(map, marker);
        // Make sure the marker property is cleared if the infowindow is closed.
        infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
        });
    }
}

function currentLocationMarker(currentLocation){
  myLocationMarker.setPosition(currentLocation)
}

function showListings() {
    var bounds = new google.maps.LatLngBounds();
    // Extend the boundaries of the map for each marker and display the marker
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
        bounds.extend(markers[i].position);
    }
    bounds.extend(currentLocation)
    map.fitBounds(bounds);
}
// This function will loop through the listings and hide them all.
function hideListings() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
}

function makeMarkerIcon(markerColor) {
    var markerImage = new google.maps.MarkerImage(
        'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + markerColor +
        '|40|_|%E2%80%A2',
        new google.maps.Size(21, 34),
        new google.maps.Point(0, 0),
        new google.maps.Point(10, 34),
        new google.maps.Size(21, 34));
    return markerImage;
}
function zoomToArea() {
    // Initialize the geocoder.
    var geocoder = new google.maps.Geocoder();
    // Get the address or place that the user entered.
    var address = document.getElementById('zoom-to-area-text').value;
    // Make sure the address isn't blank.
    if (address == '') {
        window.alert('You must enter an area, or address.');
    } else {
        // Geocode the address/area entered to get the center. Then, center the map
        // on it and zoom in
        var reslat;
        var reslng;
        geocoder.geocode({
            address: address
        },
        function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                currentLocation = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
                currentLocationMarker(currentLocation);
                map.setCenter(results[0].geometry.location);
                map.setZoom(13);
            } else {
                window.alert('We could not find that location - try entering a more' +
                    ' specific place.');
            }
        });
    }
}
