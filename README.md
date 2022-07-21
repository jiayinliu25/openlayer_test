# 2D Map Viewer With OpenLayer

2D map viewers created using the OpenLayer library using a small set of WMS and raster data hosted on GeoServer.


## Geoserver to Openlayer Workflow

 * Takes in WMS, WFS, and raster data hosted on GeoServer. 
 * Example: Using WMS data from GeoServer:
 ```
const block = new TileLayer({
	title: "Blocks",
	extent: [-13884991, 2870341, -7455066, 6338219],
	source: new TileWMS({
		url: "http://virtualblackcharlotte.net/geoserver/Charlotte/wms",
		params: {LAYERS: "Charlotte:Blocks", TILED: true},
		serverType: "geoserver"
	})
});
```

## Example Maps in main.js

### Toggle Layers
Multiple WMS layers, one raster layer, and one base OpenStreetMap can be toggled on and off using LayerSwitcher: 
```
const layerSwitcher = new LayerSwitcher({
	reverse: true,
	groupSelectStyle: "group"
});
map.addControl(layerSwitcher);
```
