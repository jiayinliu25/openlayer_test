import "ol/ol.css";
import "ol-layerswitcher/dist/ol-layerswitcher.css";

import Map from "ol/Map";
import OSM from "ol/source/OSM";
import ImageWMS from "ol/source/ImageWMS";
import { Image as ImageLayer, Tile as TileLayer } from "ol/layer";
import TileWMS from "ol/source/TileWMS";
import View from "ol/View";
import Overlay from "ol/Overlay";

import LayerSwitcher from "ol-layerswitcher";
import { BaseLayerOptions, GroupLayerOptions } from "ol-layerswitcher";

const layers = [
  new TileLayer({
    title: "Modern Charlotte",
    source: new OSM()
  }),
  new ImageLayer({
    title: "Raster BluePrint",
    source: new ImageWMS({
      url: "http://virtualblackcharlotte.net/geoserver/Charlotte/wms",
      params: { LAYERS: "Charlotte:jcsured0102bk03_ST_4" },
      ratio: 1,
      serverType: "geoserver"
    })
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
