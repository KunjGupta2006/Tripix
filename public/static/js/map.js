document.addEventListener("DOMContentLoaded", function () {
  var map = L.map("map").setView([28.6139,77.2090], 10); //lat,lon
  // Add OpenStreetMap layer
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 20,
    attribution: "Tripix",
  }).addTo(map);

  var geocoder = L.Control.geocoder({
    defaultMarkGeocode: true
  })
    .on('markgeocode', function(e) {
      var bbox = e.geocode.bbox;
      var poly = L.polygon([
        bbox.getSouthEast(),
        bbox.getNorthEast(),
        bbox.getNorthWest(),
        bbox.getSouthWest()
      ]).addTo(map);
      map.fitBounds(poly.getBounds());
    })
    .addTo(map);

  // Important: Force Leaflet to re-render after layout loads
  setTimeout(function () {map.invalidateSize();}, 500);
});
