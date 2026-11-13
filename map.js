import mapboxgl from 'https://cdn.jsdelivr.net/npm/mapbox-gl@2.15.0/+esm';

mapboxgl.accessToken = 'pk.eyJ1IjoiZXRoYW5qbCIsImEiOiJjbXdmZno0YWIwMHV3MnlwbHR3bHh5bm1xIn0.c_tUcQYvVgJfElnaCoC9Xw';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [-71.09415, 42.36027],
    zoom: 12,
    minZoom: 5,
    maxZoom: 18,
});
