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
    center: [10, -10],
    zoom: 3
});
  
// Adding a tile layer (the background map image) to our map:
// We use the addTo() method to add objects to our map.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);


let artist = document.getElementById("dd1mob1");
artist.addEventListener('change', onChangeArtist);
let event = document.getElementById("dd2mob1");
event.addEventListener('change', onChangeEvent);

function onChangeArtist(a) {
    a = artist.options[artist.selectedIndex].value
    console.log(a);
    return a;
}
artist.onchange = onChangeArtist();

function onChangeEvent(e) {
    e = event.options[event.selectedIndex].value
    console.log(e);
    return e;
}
event.onchange = onChangeEvent();

let newUrl = "https://rest.bandsintown.com/artists/"+onChangeArtist()+"/events?app_id=23bc806cf4fe0991e7a90f97a8e63576&date="+onChangeEvent();
console.log(newUrl);

// function newURL(onChangeArtist, onChangeEvent) {
//     console.log("https://rest.bandsintown.com/artists/"+onChangeArtist+"/events?app_id=23bc806cf4fe0991e7a90f97a8e63576&date="+onChangeEvent);
//     return "https://rest.bandsintown.com/artists/"+onChangeArtist+"/events?app_id=23bc806cf4fe0991e7a90f97a8e63576&date="+onChangeEvent;
// }
// newUrl();

//let artistURL = "https://rest.bandsintown.com/artists/"+onChangeArtist()+"/events?app_id=23bc806cf4fe0991e7a90f97a8e63576&date="+onChangeEvent();
//console.log(artistURL);







// Get the current date
const currentDate = new Date();
d3.json(url).then(function (data) {
    for (let i = 0; i < data.length; i++) {
        //convert lat and long into int.
        let lat = parseInt(data[i].venue.latitude);
        let long = parseInt(data[i].venue.longitude);
        let city = data[i].venue.city;
        let eventDate = new Date(data[i].datetime);
        if (lat && long && city) {
            let color = eventDate > currentDate ? "green" : "red";
            let coord = [
                //lat
                lat,
                //long
                long
            ];
            let radius = 20; // Adjust the initial radius as needed
            let circle = L.circle(coord, {
                fillOpacity: 0.75,
                color: color,
                radius: radius, // Add the initial radius parameter
            });
            circle.bindPopup(
                "Location: " + data[i].venue.city +", "+ data[i].venue.region +", "+ data[i].venue.country
                + "<br> Venue: " + data[i].venue.name
                + "<br> Date: " + data[i].datetime
                + "</br>Purchase Tickets: <a href=" + data[i].url + "> Website </a>"
            ).addTo(myMap);
        }
    }
    // Event listener to update circle marker radius upon zooming
    myMap.on("zoomend", function () {
        let zoomLevel = myMap.getZoom();
        // Calculate the new radius based on the zoom level
        let newRadius = radius * 2 * zoomLevel; // Adjust the multiplier as needed
        // Iterate through the circles and update their radius
        myMap.eachLayer(function (layer) {
            if (layer instanceof L.Circle) {
                layer.setRadius(newRadius);
            }
        });
    });
});