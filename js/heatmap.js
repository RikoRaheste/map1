// --- Basic Map Setup ---
let map = L.map('map').setView([58.373523, 26.716045], 12)

// --- Raster Tile Layer ---
const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: 'OpenStreetMap contributors'
})
osm.addTo(map)

// --- Vector Layer: Tartu City Cell Towers ---
async function addCelltowersGeoJson(url) {
  const response = await fetch(url)
  const data = await response.json()

  const towers = L.geoJson(data, {
    pointToLayer: (feature, latlng) =>
      L.circleMarker(latlng, {
        radius: 5,
        fillColor: 'red',
        fillOpacity: 0.6,
        color: 'red',
        weight: 1
      })
  })

  towers.addTo(map)
}

addCelltowersGeoJson('geojson/tartu_city_celltowers_edu.geojson')

// --- defaultMapSettings Function ---
function defaultMapSettings() {
  map.setView([58.373523, 26.716045], 12)
}
