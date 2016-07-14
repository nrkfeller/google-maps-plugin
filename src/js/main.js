var map;
var markers = [];

function initMap() {
    var KualaLumpur = new google.maps.LatLng(3.13900, 101.68685);

    map = new google.maps.Map(document.getElementById('map'), {
        center: KualaLumpur,
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.MAP
    });

    var infoWindow = new google.maps.InfoWindow({
        map: map
    });

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

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
        address: '<p>Tm, Jalan 1/62b, 52200 Kuala Lumpur, <br/>Wilayah Persekutuan Kuala Lumpur, <br/>Malaysia</p>'
    }, {
        title: 'TM point Damansara Utama',
        location: {
            lat: 3.133546,
            lng: 101.621165
        },
        address: '<p>91, Jalan SS 21/1a, Damansara Utama, <br/>47400 Petaling Jaya, Selangor, <br/>Malaysia</p>'
    }, {
        title: 'TM point Kota Damansara',
        location: {
            lat: 3.152391,
            lng: 101.591489
        },
        address: '<p>Jalan PJU 5/17, Kota Damansara, <br/>47810 Petaling Jaya, Selangor, <br/>Malaysia</p>'
    }, {
        title: 'TM point Solaris Mount Kiara',
        location: {
            lat: 3.173781,
            lng: 101.660250
        },
        address: '<p>Jalan Solaris, Solaris Mont Kiara, <br/>50480 Mont Kiara, Wilayah Persekutuan <br/>Kuala Lumpur, Malaysia</p>'
    }];
    var largeInfowindow = new google.maps.InfoWindow();
    var bounds = new google.maps.LatLngBounds();

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
        markers.push(marker);
        marker.addListener('click', function() {
            populateInfoWindow(this, largeInfowindow);
        });
        bounds.extend(markers[i].position);
    }
    map.fitBounds(bounds);
}


function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
}
