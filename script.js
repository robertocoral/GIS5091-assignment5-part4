require([
    "esri/Map", 
    "esri/views/MapView", 
    "esri/widgets/ScaleBar", 
    "esri/widgets/Expand", 
    "esri/widgets/BasemapGallery"
    ], function (Map, MapView, ScaleBar, Expand, BasemapGallery) {
        var map = new Map({
            basemap: "topo-vector"
        });

        var view = new MapView({
            container: "viewDiv",
            map: map,
            zoom: 4,
            center: [15, 65] // longitude, latitude
        });
    
        const scaleBar = new ScaleBar({
            view: view,
            unit: "dual" // The scale bar displays both metric and non-metric units.
        });
        view.ui.add(scaleBar, {position: "bottom-left"});
  
        const basemapGallery = new BasemapGallery({
            view: view,
            container: document.createElement("div")
        });

        const bgExpand = new Expand({
            view: view,
            content: basemapGallery
        });

        // close the expand whenever a basemap is selected
        basemapGallery.watch("activeBasemap", () => {
            const mobileSize = view.heightBreakpoint === "xsmall" || view.widthBreakpoint === "xsmall";
            if (mobileSize) {
                bgExpand.collapse();
            }
        });
        view.ui.add(bgExpand, "top-right");
  });
