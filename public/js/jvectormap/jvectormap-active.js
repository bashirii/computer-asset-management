(function ($) {
    "use strict";


               $('#world-map-export').vectorMap({
                   map: 'world_mill_en',
                   backgroundColor: "transparent",
                   regionStyle: {
                       initial: {
                           fill: '#00c292',
                           "fill-opacity": 0.9,
                           stroke: 'none',
                           "stroke-width": 0,
                           "stroke-opacity": 0
                       }
                   },

                   series: {
                       regions: [{
                           values: mapDataExport,
                           scale: ["#ccc", "#00c292"],
                           normalizeFunction: 'polynomial'
                       }]
                   },
                   onRegionTipShow: function(e, el, code){
                       el.html(el.html()+' (Export - â‚¦'+new Intl.NumberFormat().format(mapDataExport[code])+')');
                   }
               });

               $('#world-map-import').vectorMap({
                   map: 'world_mill_en',
                   backgroundColor: "transparent",
                   regionStyle: {
                       initial: {
                           fill: '#00c292',
                           "fill-opacity": 0.9,
                           stroke: 'none',
                           "stroke-width": 0,
                           "stroke-opacity": 0
                       }
                   },

                   series: {
                       regions: [{
                           values: mapDataImport,
                           scale: ["#ccc", "#00c292"],
                           normalizeFunction: 'polynomial'
                       }]
                   },
                   onRegionTipShow: function(e, el, code){
                       el.html(el.html()+' (Import - â‚¦'+new Intl.NumberFormat().format(mapDataImport[code])+')');
                   }
               });

   })(jQuery); 
