// Creating the map object
let myMap = L.map("map", {
  center: [0, 0],
  zoom: 2
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Use this earthquakes_link to get the GeoJSON data.
let earthquakes_link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week.geojson";

function generateColor(depth) {
  console.log(depth);
  if (depth > 100) {
    return '#000000'
  }
  if (depth > 80) {
    return '#400000'
  }
  if (depth > 60) {
    return '#800000'
  }
  if (depth > 40) {
    return '#bf0000'
  }
  if (depth > 20) {
    return '#ff0000'
  }
  else {
    return '#ff69b4'
  }
}

function generateRadius(magnitude) {
  console.log(magnitude)
  return 2 * magnitude
}

// Getting our GeoJSON data
d3.json(earthquakes_link).then((earthquakes) => {
  L.geoJson(earthquakes, {
    style: function (FeatureCollection) {
      return {
        color: '#000',
        fillColor: generateColor(FeatureCollection.geometry.coordinates[2]),
        // fillColor: '#72fa41',
        fillOpacity: 1,
        weight: 1.5,
        radius: generateRadius(FeatureCollection.properties.mag),
      };
    },
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng);
    },
    onEachFeature: function (feature, layer) {
      layer.bindPopup(
        "Magnitude: "
        + feature.properties.mag
        + "<br>Depth: "
        + feature.geometry.coordinates[2]
        + "<br>Location: "
        + feature.properties.place
      );
    }
  }).addTo(myMap);

  // Here we create a legend control object.
  var legend = L.control({
    position: "bottomleft"
  });

  legend.onAdd = function () {
    var div = L.DomUtil.create("div", "info legend-class");

    var depths = [0, 20, 40, 60, 80, 100];
    var colors = [
      "#ff69b4",
      "#ff0000",
      "#bf0000",
      "#800000",
      "#400000",
      "#000000"];

    // Loop through our intervals and generate a label with a colored square for each interval.
    for (var i = 0; i < depths.length; i++) {
      div.innerHTML += "<div><i style='background: "
        + colors[i]
        + "'></i> "
        + depths[i]
        + (depths[i + 1] ? "???" + depths[i + 1] + "</div><br>" : "+</div><br>");
    }
    return div;
  };

  // We add our legend to the map.
  legend.addTo(myMap);

});