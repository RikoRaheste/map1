// Basic Map Setup
let map = L.map('map').setView([58.373523, 26.716045], 12)

// Raster Tile Layer
const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: 'OpenStreetMap contributors'
})
osm.addTo(map)

// add celltowers vector layer
async function addCelltowersGeoJson(url) {
  const response = await fetch(url)
  const data = await response.json()
  const markers = L.geoJson(data)
  markers.addTo(map)
}
addCelltowersGeoJson('geojson/tartu_city_celltowers_edu.geojson')

// --- defaultMapSettings Function ---
function defaultMapSettings() {
  map.setView([58.373523, 26.716045], 12)
}

addGeoJson('geojson/tartu_city_celltowers_edu.geojson')
// add geoJSON layer
async function addGeoJson(url) {
  const response = await fetch(url)
  const data = await response.json()
  const heatData = data.features.map(heatDataConvert)
  const heatMap = L.heatLayer(heatData, { radius: 10 })
  heatMap.addTo(map)
}
