/***** BASEMAP */

const mapbox = new ol.layer.Tile({
	source: new ol.source.XYZ({
		tileSize: [256, 256],
    url: 'https://api.mapbox.com/styles/v1/adrienvh/cla2gckri001v14o5dm3bd8gt/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWRyaWVudmgiLCJhIjoiU2lDV0N5cyJ9.2pFJAwvwZ9eBKKPiOrNWEw'
	})
})

/***** MAP */

const view = new ol.View({
	zoom: 15,
	minZoom:15,
	maxZoom:18,
  center: ol.proj.transform([2.346824, 48.855017], 'EPSG:4326', 'EPSG:3857'),
  projection: 'EPSG:3857'
})

const map = new ol.Map({
	target: 'map',
  layers: [mapbox],
	view: view,
  //interactions: ol.interaction.defaults.defaults(),
  controls: ol.control.defaults.defaults({ zoom: false })
})

/***** MVT */

let layer =  new ol.layer.VectorTile({
  source: new ol.source.VectorTile({
    projection: 'EPSG:3857',
    tileOptions: { crossOriginKeyword: 'anonymous' },
    tilePixelRatio: 1, // oversampling when > 1
    tileGrid: ol.tilegrid.createXYZ({ maxZoom: 18 }),
    format: new ol.format.MVT()
  })
});

fetch('http://localhost:7502/style.json').then(function(response) {
  response.json().then(function(style) {
    olms.applyStyle(layer, style, 'baremaps').then(function() { map.addLayer(layer) })
  })
})

/***** QUARTIERS */

class Quartier {
  constructor(nom, wikipedia, extent){
    this.nom = nom
    this.wikipedia = wikipedia
    this.extent = ol.proj.transformExtent(extent, 'EPSG:4326', 'EPSG:3857')
  }
  zoomTo() {
    view.fit(this.extent, { duration: 1000 })
  }
}

const quartiers = [
  new Quartier("Campagne à Paris", "https://fr.wikipedia.org/wiki/Campagne_%C3%A0_Paris", [2.4064925659743324, 48.86498166548816, 2.4088018744481587, 48.86712133126366]),
  new Quartier("Quartier de la Mouzaïa", "https://fr.wikipedia.org/wiki/Quartier_de_la_Mouza%C3%AFa", [2.3884851547460357, 48.8791587207441, 2.3975263734653254, 48.882712195335074]),
  new Quartier("Villa Montmorency", "https://fr.wikipedia.org/wiki/Villa_Montmorency", [2.2603626800271854, 48.8484098450364, 2.2658450118806854, 48.852697034665624]),
  new Quartier("Butte Bergeyre", "https://fr.wikipedia.org/wiki/Butte_Bergeyre", [2.3738714122810904, 48.87635780386657, 2.3794070865095307, 48.87884942918808]),
  new Quartier("Cité des Fleurs", "https://fr.wikipedia.org/wiki/Cit%C3%A9_des_Fleurs", [2.3192561170707506, 48.89129337071577, 2.321410020488173, 48.893976313576644]),
  new Quartier("Rue Crémieux", "https://fr.wikipedia.org/wiki/Rue_Cr%C3%A9mieux", [2.3700632273596796, 48.84638935964301, 2.3716411599143044, 48.847355162541675]),
  new Quartier("Quartier des Peupliers", null, [2.3532920235741983, 48.82253706919161, 2.3551223392263125, 48.82572638058346]),
  new Quartier("Cité Florale", null, [2.3441366360881375, 48.82231343081611, 2.3457566306837236, 48.823094450149284]),
  new Quartier("Square de Montsouris", null, [2.3327895179303653, 48.821557800742454, 2.335654630571696, 48.82372200534465])
]

quartiers.forEach(quartier => {
  $(`<li>${quartier.nom}</li>`)
    .appendTo('ul#quartiers')
    .click(function(){ quartier.zoomTo() })
})