mapboxgl.accessToken = 'pk.eyJ1IjoicGVwaXRvLWdyaWxsbyIsImEiOiJjajhhdjFjN3MwZ2Y2MnFwaWlkNmtoY2Y0In0.HJNKwaFRS8_ikTesrLtVsg';
var map = new mapboxgl.Map({
    container: 'mapa', // container id
    style: 'mapbox://styles/mapbox/cjaudgl840gn32rnrepcb9b9g', // stylesheet location
    center: [-4.9775, 36.6863], // starting position [lng, lat]
    maxBounds: [[-5.118270, 36.583467], [-4.817666, 36.796423]],
    zoom: 9
});

var url = "merge.geojson"

map.on('load', function () {
    map.addSource("merge", {
        "type": "geojson",
        "data": url
    });

    
    
    map.addLayer({
        "id": "merge",
        "type": "line",
        "source": "merge",
        "layout": {
            "line-join": "round",
            "line-cap": "round"
        },
        "paint": {
            "line-color": "#0eb51c",
            "line-width": 2
        }
    });
});


document.getElementById('checkbox1').onclick = function() {
    map.showTileBoundaries = !!this.checked;
};
