import "ol/ol.css";
import "ol-layerswitcher/dist/ol-layerswitcher.css";

import Map from "ol/Map";
import OSM from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";
import TileWMS from "ol/source/TileWMS";
import View from "ol/View";
import Overlay from "ol/Overlay";

import LayerSwitcher from "ol-layerswitcher";
import { BaseLayerOptions, GroupLayerOptions } from "ol-layerswitcher";

const layers = [
  new TileLayer({
    source: new OSM()
  }),
  new TileLayer({
    title: "Blocks",
    extent: [-13884991, 2870341, -7455066, 6338219],
    source: new TileWMS({
      url: "http://virtualblackcharlotte.net/geoserver/Charlotte/wms",
      params: { LAYERS: "Charlotte:Blocks", TILED: true },
      serverType: "geoserver",
      // Countries have transparency, so do not fade tiles:
      transition: 0
    })
  }),
  new TileLayer({
    title: "Buildings",
    extent: [-13884991, 2870341, -7455066, 6338219],
    source: new TileWMS({
      url: "http://virtualblackcharlotte.net/geoserver/Charlotte/wms",
      params: { LAYERS: "Charlotte:Buildings", TILED: true },
      serverType: "geoserver"
    })
  })
];
const map = new Map({
  layers: layers,
  target: "map",
  view: new View({
    center: [-8999036, 4193671],
    zoom: 16
  })
});
const layerSwitcher = new LayerSwitcher({
  reverse: true,
  groupSelectStyle: "group"
});
map.addControl(layerSwitcher);
