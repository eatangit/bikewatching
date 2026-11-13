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

map.on('load', async ()=> {
    map.addSource('boston_route', {
        type: 'geojson',
        data: 'https://bostonopendata-boston.opendata.arcgis.com/datasets/boston::existing-bike-network-2022.geojson',
    });
    map.addSource('cambridge_route', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/cambridgegis/cambridgegis_data/main/Recreation/Bike_Facilities/RECREATION_BikeFacilities.geojson',
    });

    map.addLayer({
        id: 'bike-lanes',
        type: 'line',
        source: 'boston_route',
        paint: {
            'line-color': '#2ab400',
            'line-width': 4,
            'line-opacity': 0.5,
        },
    });
    map.addLayer({
        id: 'cambridge-bike-lanes',
        type: 'line',
        source: 'cambridge_route',
        paint: {
            'line-color': '#2ab400',
            'line-width': 4,
            'line-opacity': 0.5,
        },
    });
});
