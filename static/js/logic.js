// Creating the map object
let myMap = L.map("map", {
    center: [37.1281662, -121.5233307],
    zoom: 10
  });
  
  // Adding the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);
  
  // Use this link to get the GeoJSON data.
  let link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week.geojson";
  
// Getting our GeoJSON data
d3.json(link).then(function(type) {
    L.geoJson(type, {
        style: function(FeatureCollection) {
          return {
            color: "white",
            fillColor: chooseColor(FeatureCollection.metadata.properties),
            fillOpacity: 0.5,
            weight: 1.5
          };
        }
      }).addTo(myMap);


});