// https://maps.googleapis.com/maps/api/geocode/json?address=775+Park+Avenue&key=AIzaSyByyuocMAc-YxkzhInuQT3kDNIsbK5Z7BQ
// https://maps.googleapis.com/maps/api/geocode/json?latlng=33.1262476,-117.3115765&key=AIzaSyByyuocMAc-YxkzhInuQT3kDNIsbK5Z7BQ

var map;
// Create a new blank array for all the listing markers.
var markers = [];
var styles = [  {    featureType: 'water',    stylers: [      { color: '#f15922' }    ]  },{    featureType: 'administrative',    elementType: 'labels.text.stroke',    stylers: [    { color: '#ffffff' },      { weight: 6 }    ]  },{    featureType: 'administrative',    elementType: 'labels.text.fill',    stylers: [      { color: '#e85113' }    ]},{    featureType: 'road.highway',    elementType: 'geometry.stroke',    stylers: [      { color: '#efe9e4' },      { lightness: -40 }    ]  },{    featureType: 'transit.station',    stylers: [      { weight: 9 },      { hue: '#e85113' }    ]  },{    featureType: 'road.highway',    elementType: 'labels.icon',    stylers: [      { visibility: 'off' }    ]  },{    featureType: 'water',    elementType: 'labels.text.stroke',    stylers: [      { lightness: 100 }    ]  },{    featureType: 'water',    elementType: 'labels.text.fill',stylers: [      { lightness: -100 }    ]  },{    featureType: 'poi',    elementType: 'geometry',    stylers: [      { visibility: 'on' },      { color: '#f0e4d3' }    ]  },{    featureType: 'road.highway',    elementType: 'geometry.fill',    stylers: [      { color: '#efe9e4' },      { lightness: -25 }    ]  }];

function initMap() {
    // Constructor creates a new map - only center and zoom are required.
    var currentLocation = new google.maps.LatLng(3.13900, 101.68685);
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;

    map = new google.maps.Map(document.getElementById('map'), {
        center: currentLocation,
        zoom: 8,
        styles: styles,
        mapTypeId: google.maps.MapTypeId.MAP
    });
    directionsDisplay.setMap(map);
    var infoWindow = new google.maps.InfoWindow({
        map: map
    });


    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            currentLocation = pos

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            map.setCenter(pos);
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }

    var locations = [{
        title: 'TM point Kepong',
        location: {
            lat: 3.196553,
            lng: 101.635133
        },
        address: 'Tm, Jalan 1/62b, 52200 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur, Malaysia'
    }, {
        title: 'TM point Damansara Utama',
        location: {
            lat: 3.133546,
            lng: 101.621165
        },
        address: '91, Jalan SS 21/1a, Damansara Utama, 47400 Petaling Jaya, Selangor, Malaysia'
    }, {
        title: 'TM point Kota Damansara',
        location: {
            lat: 3.152391,
            lng: 101.591489
        },
        address: 'Jalan PJU 5/17, Kota Damansara, 47810 Petaling Jaya, Selangor, Malaysia'
    }, {
        title: 'TM point Solaris Mount Kiara',
        location: {
            lat: 3.173781,
            lng: 101.660250
        },
        address: 'Jalan Solaris, Solaris Mont Kiara, 50480 Mont Kiara, Wilayah Persekutuan Kuala Lumpur, Malaysia'
    }];
    var largeInfowindow = new google.maps.InfoWindow();
    var bounds = new google.maps.LatLngBounds();
    // The following group uses the location array to create an array of markers on initialize.
    for (var i = 0; i < locations.length; i++) {
        var position = locations[i].location;
        var title = locations[i].title;
        var address = "Address:" + locations[i].address;
        var marker = new google.maps.Marker({
            map: map,
            position: position,
            title: title,
            cursor: address,
            animation: google.maps.Animation.DROP,
            id: i
        });
        // Push the marker to our array of markers.
        markers.push(marker);
        // Create an onclick event to open an infowindow at each marker.
        marker.addListener('click', function() {
            populateInfoWindow(this, largeInfowindow);
        });
        bounds.extend(markers[i].position);
    }
    // Extend the boundaries of the map for each marker
    map.fitBounds(bounds);

    var onChangeHandler = function() {
          calculateAndDisplayRoute(directionsService, directionsDisplay, currentLocation);
        };
        //document.getElementById('start').addEventListener('change', onChangeHandler);
        document.getElementById('end').addEventListener('change', onChangeHandler);


  //   var locationText = ""
  //
  //   for (i=0;i < locations.length; i++){
  //     var title = locations[i].title
  //
  //     h4tag = "<h4 id=" + i.toString() + " value=" + locations[i].address + ">" + locations[i].address + "</h4>"
  //
  //     locationText += h4tag + "<hr/>"
  //
  //     document.getElementById(i.toString()).onclick = calculateAndDisplayRoute(directionsService, directionsDisplay, currentLocation, i.toString())
  //   }
  //
  // document.getElementById("locations").innerHTML = locationText;

}
function calculateAndDisplayRoute(directionsService, directionsDisplay, currentLocation,i) {
    directionsService.route({
        origin: currentLocation,
        destination: document.getElementById('end').value,
        travelMode: google.maps.TravelMode.DRIVING
    }, function(response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}
// This function populates the infowindow when the marker is clicked. We'll only allow
// one infowindow which will open at the marker that is clicked, and populate based
// on that markers position.
function populateInfoWindow(marker, infowindow) {
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker != marker) {
        infowindow.marker = marker;
        infowindow.setContent('<div>' + marker.title + '</div>' + '<hr />' + marker.cursor);
        infowindow.open(map, marker);
        // Make sure the marker property is cleared if the infowindow is closed.
        infowindow.addListener('closeclick', function() {
            infowindow.setMarker(null);
        });
    }
}
