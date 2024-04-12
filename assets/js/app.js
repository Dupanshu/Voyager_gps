'use strict';

// This app requires a server to handle import statements and CORS issues
import * as utils from './utils.js';

/*  Voyager */
utils.print('Welcome');

const track = utils.select('.button');
const tracker = utils.select('#tracker');

mapboxgl.accessToken = 'pk.eyJ1IjoibWFyY2Vsb2xvcCIsImEiOiJjbHExOWt3ZHUwN2MxMnByMHJjNmN2cnBkIn0.3erMoirLCVRljyBI1DfCWg';

const locate = new mapboxgl.Map({
    container: tracker,
    style: 'mapbox://styles/mapbox/streets-v11',
    zoom: 3,
    center: [-90.96, 50.47]
});

locate.addControl(new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAcuracy: true
    },
    trackUserLocation: true
}));

function putTracker(location) {
    const marker = utils.create('div');
    marker.style.backgroundImage = 'url(./assets/media/tracker.png)';
    marker.style.width = '50px';
    marker.style.height = '50px';
    marker.style.backgroundSize = 'cover';

    new mapboxgl.Marker(marker)
    .setLngLat(location)
    .addTo(locate);/*  */
}

function findMe() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            const myLocation = [longitude, latitude];
            locate.flyTo({center: myLocation, zoom: 18});
            putTracker(myLocation);
        }, () => {
            utils.print('Unable to find your vehicle.');
        });
    } else {
        utils.print('Browser does not supported.')
    }
}

utils.listen('click', track, findMe);

