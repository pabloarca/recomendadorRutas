
center_point = [-4.9775, 36.6863],
bounds = [[-5.141308, 36.605031], [-4.817666, 36.796423]],
navigation = new mapboxgl.NavigationControl(),

mapboxgl.accessToken = 'pk.eyJ1IjoicGVwaXRvLWdyaWxsbyIsImEiOiJjajhhdjFjN3MwZ2Y2MnFwaWlkNmtoY2Y0In0.HJNKwaFRS8_ikTesrLtVsg';
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/cjaudgl840gn32rnrepcb9b9g', // stylesheet location
    center: center_point,
    maxBounds: bounds,
    zoom: 10
});

map.addControl(navigation);

map.on('load', () => {
    map.fitBounds(bounds);
    d3.json(url, (err, data) => {
      if (err) throw err;
      map.addSource('dem', {
        'type': 'raster-dem',
        'url': 'mapbox://mapbox.terrain-rgb'
      });
      map.addSource('trails',{
        type: 'geojson',
        data: data
      });
      map.addLayer({
        'id': 'hillshading',
        'source': 'dem',
        'type': 'hillshade'
      });
      map.addLayer({
        'id': 'trails',
        'source': 'trails',
        'type': 'line',
        'filter': ['any'],
        'layout': {
          'line-join': 'round',
          'line-cap': 'round'
        },
        'paint': {
          'line-color': [
            'match',
            ['get', 'perfil'],
            'D','#3B8201',
            'C','#838A02',
            'B','#915003',
            'A','#990A05',
            '#ccc'
          ],
          'line-width': [
            'interpolate',
            ['exponential',2],
            ['zoom'],
            10, 4,
            20,16
          ]
        }
      });

    })
  })
};
