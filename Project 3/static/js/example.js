//alert("it is hooked up");

url = "http://127.0.0.1:64576/data/TS"
d3.json(url).then(function (data){
    console.log(data)
});

urlDrake = "http://127.0.0.1:64576/data/drake"
d3.json(urlDrake).then(function (data){
    console.log(data)
    //createFeatures(data.features);
});

let myMap = L.map("map", {
    center: [45.52, -122.67],
    zoom: 13
});
  
// Adding a tile layer (the background map image) to our map:
// We use the addTo() method to add objects to our map.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);
  
