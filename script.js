mapboxgl.accessToken = 'pk.eyJ1IjoicmFjaGVsc21wYXJrIiwiYSI6ImNtaDlyZjNreTFjYnoybXB1bHJqa29lZWgifQ.zynQjHCJTpEk_7Po2XEhZA';
const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/rachelsmpark/cmho4lbl9000801suf7us1rcg',
        center: [-122.28, 37.87], // starting position [lng, lat]. Note that lat must be set between -90 and 90
        zoom: 12.5 // starting zoom
    });

map.on('load', function() {
    map.addSource('polygon-data', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/rachelsmpark/Web-Map/refs/heads/main/data/BerkeleyFields.geojson'
    });

    map.addLayer({
        id: 'polygon-layer',
        type: 'fill',
        source: 'polygon-data',
        paint: {
            'fill-color': '#ff2cf8',
            'fill-opacity': 0.7
        }
    });
   
    map.on('click', 'polygon-layer', (e) => {
        // Copy coordinates array
        const coordinates = e.features[0].geometry.coordinates.slice();
        const properties = e.features[0].properties;

        // Create popup content using the actual data properties
        const popupContent = `
            <div>
                <h3>${properties["Facility Name"]}</h3>
                <p><strong>Facility Name:</strong> ${properties["Facility Name"]}</p>
                <p><strong>Address:</strong> ${properties["Address"]}</p>
                <p><strong>Facility:</strong> ${properties["Facility"]}</p>
                <p><strong>Hours:</strong> ${properties["Hours"]}</p>
                <p><strong>Additional Amenities:</strong> ${properties["Additional amenities"]}</p>
                <p><strong>Total Park Acres:</strong> ${properties["Total Park Acres"]}</p>
                ${properties["Website Link"] ? `<p><a href="${properties["Website Link"]}" target="_blank">Website Link</a></p>` : ''}
            </div>
        `;
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(popupContent)
            .addTo(map);
    });
   // Change cursor to pointer when hovering over points
    map.on('mouseenter', 'polygon-layer', () => {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change cursor back when leaving points
    map.on('mouseleave', 'polygon-layer', () => {
        map.getCanvas().style.cursor = '';
    });

});
