import "ol/ol.css";
import "ol-layerswitcher/dist/ol-layerswitcher.css";

import Map from "ol/Map";
import OSM from "ol/source/OSM";
import ImageWMS from "ol/source/ImageWMS";
import { Image as ImageLayer, Group as LayerGroup } from "ol/layer";
import TileWMS from "ol/source/TileWMS";
import View from "ol/View";
import { getRenderPixel } from "ol/render";
import { Tile as TileLayer } from "ol/layer";
import LayerSwitcher from "ol-layerswitcher";
import XYZ from "ol/source/XYZ";

//toggle multiple wms and rastor layers
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
//UI for toggle on and off different layers
const layerSwitcher = new LayerSwitcher({
  reverse: true,
  groupSelectStyle: "group"
});
map.addControl(layerSwitcher);

//map swipe with raster blue print and modern Charlotte
const osm = new ImageLayer({
  title: "Raster BluePrint",
  source: new ImageWMS({
    url: "http://virtualblackcharlotte.net/geoserver/Charlotte/wms",
    params: { LAYERS: "Charlotte:jcsured0102bk03_ST_4" },
    ratio: 1,
    serverType: "geoserver"
  })
});
const light = new TileLayer({
  title: "test map",
  source: new XYZ({
    url:
      "https://api.maptiler.com/maps/topo/{z}/{x}/{y}.png?key=PPplib6pjH9Uo90NGbF4"
  })
});
const opacity_block = new TileLayer({
  title: "Blocks",
  extent: [-13884991, 2870341, -7455066, 6338219],
  source: new TileWMS({
    url: "http://virtualblackcharlotte.net/geoserver/Charlotte/wms",
    params: {
      LAYERS: "Charlotte:Blocks",
      TILED: true
    },
    serverType: "geoserver",
    // Countries have transparency, so do not fade tiles:
    transition: 0
  })
});
opacity_block.setOpacity(0.5);

const opacity_building = new TileLayer({
  title: "Buildings",
  extent: [-13884991, 2870341, -7455066, 6338219],
  source: new TileWMS({
    url: "http://virtualblackcharlotte.net/geoserver/Charlotte/wms",
    params: {
      LAYERS: "Charlotte:Buildings",
      TILED: true
    },
    serverType: "geoserver"
  })
});
opacity_building.setOpacity(0.6);

const map2 = new Map({
  layers: [osm, light, opacity_block, opacity_building],
  target: "map2",
  view: new View({
    center: [-8999036, 4193671],
    zoom: 16
  })
});
const swipe = document.getElementById("swipe");
light.on("prerender", function (event) {
  const ctx = event.context;
  const mapSize = map2.getSize();
  const width = mapSize[0] * (swipe.value / 100);
  const tl = getRenderPixel(event, [width, 0]);
  const tr = getRenderPixel(event, [mapSize[0], 0]);
  const bl = getRenderPixel(event, [width, mapSize[1]]);
  const br = getRenderPixel(event, mapSize);

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(tl[0], tl[1]);
  ctx.lineTo(bl[0], bl[1]);
  ctx.lineTo(br[0], br[1]);
  ctx.lineTo(tr[0], tr[1]);
  ctx.closePath();
  ctx.clip();
});
light.on("postrender", function (event) {
  const ctx = event.context;
  ctx.restore();
});

const listener = function () {
  map2.render();
};
swipe.addEventListener("input", listener);
swipe.addEventListener("change", listener);

const layerSwitcher_map2 = new LayerSwitcher({
  reverse: true,
  groupSelectStyle: "group"
});
map2.addControl(layerSwitcher_map2);

//map3: toggle CQL filtered WMS layer with grouped layers
const layers3 = [
  new LayerGroup({
    layers: [
      new TileLayer({
        title: "Modern Charlotte",
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
      })
    ]
  }),
  new LayerGroup({
    title: "Data",
    layers: [
      new TileLayer({
        title: "Dilapidated ",
        extent: [-13884991, 2870341, -7455066, 6338219],
        source: new TileWMS({
          url: "http://virtualblackcharlotte.net/geoserver/Charlotte/wms",
          params: {
            LAYERS: "Charlotte:Buildings",
            TILED: true,
            cql_filter: "Housing_co = 'Dilapidated'"
          },
          serverType: "geoserver"
        })
      }),
      new TileLayer({
        title: "Major Repair",
        extent: [-13884991, 2870341, -7455066, 6338219],
        source: new TileWMS({
          url: "http://virtualblackcharlotte.net/geoserver/Charlotte/wms",
          params: {
            LAYERS: "Charlotte:Buildings",
            TILED: true,
            cql_filter: "Housing_co = 'Major Repair'"
          },
          serverType: "geoserver"
        })
      }),
      new TileLayer({
        title: "Minor Repair",
        extent: [-13884991, 2870341, -7455066, 6338219],
        source: new TileWMS({
          url: "http://virtualblackcharlotte.net/geoserver/Charlotte/wms",
          params: {
            LAYERS: "Charlotte:Buildings",
            TILED: true,
            cql_filter: "Housing_co = 'Minor Repair'"
          },
          serverType: "geoserver"
        })
      }),
      new TileLayer({
        title: "Standard",
        extent: [-13884991, 2870341, -7455066, 6338219],
        source: new TileWMS({
          url: "http://virtualblackcharlotte.net/geoserver/Charlotte/wms",
          params: {
            LAYERS: "Charlotte:Buildings",
            TILED: true,
            cql_filter: "Housing_co = 'Standard'"
          },
          serverType: "geoserver"
        })
      })
    ]
  })
];

const map3 = new Map({
  layers: layers3,
  target: "map3",
  view: new View({
    center: [-8999036, 4193671],
    zoom: 16
  })
});
const layerSwitcher_map3 = new LayerSwitcher({
  reverse: true,
  groupSelectStyle: "group"
});

map3.addControl(layerSwitcher_map3);
