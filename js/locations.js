var Locations = [{
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
var styles = [{
    featureType: 'water',
    stylers: [{
        color: '#244a86'
    }]
}, {
    featureType: 'administrative',
    elementType: 'labels.text.stroke',
    stylers: [{
        color: '#ffffff'
    }, {
        weight: 6
    }]
}, {
    featureType: 'administrative',
    elementType: 'labels.text.fill',
    stylers: [{
        color: '#e85113'
    }]
}, {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{
        color: '#efe9e4'
    }, {
        lightness: -40
    }]
}, {
    featureType: 'transit.station',
    stylers: [{
        weight: 9
    }, {
        hue: '#e85113'
    }]
}, {
    featureType: 'road.highway',
    elementType: 'labels.icon',
    stylers: [{
        visibility: 'off'
    }]
}, {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{
        lightness: 100
    }]
}, {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{
        lightness: -100
    }]
}, {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{
        visibility: 'on'
    }, {
        color: '#f0e4d3'
    }]
}, {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [{
        color: '#efe9e4'
    }, {
        lightness: -25
    }]
}];
