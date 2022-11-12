// const map = L.map("map", {
//     center: [0, -40],
//     zoom: 3
//   });
  
//   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//   }).addTo(map);
  

//   d3.json('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week.geojson').then(({features}) => {

//         features.forEach(feature => {
//             let { properties:{place,mag}, geometry:coordinates } = feature;

//             console.log(coordinates);
//         });

//   })
// Store our API endpoint as queryUrl.

//--------------------------------------------------------------

// let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson";

// d3.json(queryUrl).then(function (data){
//     console.log(data.features);

//     createFeatures(data.features);
// });

// function createFeatures(earthquake_data){
//     function onEachFeature(feature, layer) {
//         layer.bindPopup(`<h3>${feature.properties.place}</h3> <hr><p>${new Date (feature.properties.time)}</p>`);
//     }
//     let earthquake_hw = L.geoJSON(earthquake_data, {
//         onEachFeature:onEachFeature
//     });
//     createMap(earthquake_hw)
// }

// function createMap(EARTHHHHHQUAKKEES) {
//     let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//   })

//   let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
//     attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
//   });

//   //create basemaps object
//   let baseMaps ={
//     'Street Filter': street,
//     'Topographic Filter': topo
//   };
//   // create the overlays object
//   let overlayMaps= {
//     EarthQuakez: EARTHHHHHQUAKKEES
//   };
//   //create new map
//   let myMap = L.map("map",{
//     center: [30.5395, -37.787423],
//     zoom: 2,
//     layers:[topo, EARTHHHHHQUAKKEES]
//   })
// //layer control
// L.control.layers(baseMaps, overlayMaps, {
//     collapsed: false
//   }).addTo(myMap);

// }
//----method3-ignore the above code for future use-------------------------------------------------------------------
// Creating the map object
let myMap = L.map("map", {
  center: [30.5395, -37.787423],
  zoom: 2
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson";

// Getting our GeoJSON data
d3.json(queryUrl).then(function(data) { 
  place_list=[]
  for (let i =0; i <data.features.length; i++) {
    let feat= data.features[i]

    let color = "";
    if (feat.geometry.coordinates[2] > 50) {
      color = "DarkRed";
    } else if (feat.geometry.coordinates[2] > 40) {
      color = "Red";
    } else if (feat.geometry.coordinates[2] > 30) {
      color = "darkorange";
    } else if (feat.geometry.coordinates[2] > 20) {
      color = "orange";
    } else if (feat.geometry.coordinates[2] > 10) {
      color = "yellow"}
      else {
      color='green'
      }
    L.circle([feat.geometry.coordinates[1],feat.geometry.coordinates[0]], {
      fillOpacity: 0.75,
      color: "white",
      fillColor: color,
      // Adjust the radius.
      radius: Math.sqrt(feat.properties.mag) * 300000
  }).bindPopup(`<h2>${feat.properties.place}</h2> <hr> <h3>Magitude: ${feat.properties.mag}<br>Depth of Earthquake: ${feat.geometry.coordinates[2]}</h3>`).addTo(myMap);
}
});

let legend = L.control({ position: "bottomright" })
legend.onAdd= function(){
  let div = L.DomUtil.create('div', 'info legend');
  let limits = ['<10', '10-20','20-30','30-40','40-50','>50'];
  let colors=['green',"yellow","orange","darkorange", 'red','darkred'];
  div.innerHTML+= `<h2>Size of Circle Related to Magnitude</h2><hr><h2>Depth of Earthquake </h2>`
  for (let i=0; i<limits.length; i++) {
    div.innerHTML+= `<p style="background-color:${colors[i]}" > ${limits[i]} </p>`
  }
  return div
};

legend.addTo(myMap)