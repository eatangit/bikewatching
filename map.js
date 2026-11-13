import mapboxgl from 'https://cdn.jsdelivr.net/npm/mapbox-gl@2.15.0/+esm';
import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm';

mapboxgl.accessToken = 'pk.eyJ1IjoiZXRoYW5qbCIsImEiOiJjbXdmZno0YWIwMHV3MnlwbHR3bHh5bm1xIn0.c_tUcQYvVgJfElnaCoC9Xw';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [-71.09415, 42.36027],
    zoom: 12,
    minZoom: 5,
    maxZoom: 18,
});

function getCoords(station) {
    const point = new mapboxgl.LngLat(+station.lon, +station.lat);
    const {x, y} = map.project(point);
    return { cx: x, cy: y};
}

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

    let jsonData;
    try {
        const jsonurl = 'https://dsc106.com/labs/lab07/data/bluebikes-stations.json';
        jsonData = await d3.json(jsonurl);
        console.log('Loaded JSON Data:', jsonData);
    } catch (error) {
        console.error('Error loading JSON:', error);
    }

    let stations = jsonData.data.stations;
    console.log('Stations Array:', stations);

    const svg = d3.select('#map').select('svg');
    function updatePositions() {
        circles
            .attr('cx', (d) => getCoords(d).cx)
            .attr('cy', (d) => getCoords(d).cy);
    }
    const circles = svg
        .selectAll('circle')
        .data(stations)
        .enter()
        .append('circle')
        .attr('r', 5) // Radius of the circle
        .attr('fill', 'steelblue') // Circle fill color
        .attr('stroke', 'white') // Circle border color
        .attr('stroke-width', 1) // Circle border thickness
        .attr('opacity', 0.8); // Circle opacity
    updatePositions();
    map.on('move', updatePositions);
    map.on('zoom', updatePositions); // Update during zooming
    map.on('resize', updatePositions); // Update on window resize
    map.on('moveend', updatePositions);
    
});
