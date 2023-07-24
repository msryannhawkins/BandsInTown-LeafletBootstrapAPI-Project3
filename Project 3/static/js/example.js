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

function onChangeArtist() {
  let valueArtist = artist.value;
  console.log(valueArtist);
}
artist.onchange = onChangeArtist;
onChangeArtist();

function onChangeEvent() {
    let valueEvent = event.value;
    console.log(valueEvent);
}
event.onchange = onChangeEvent;
onChangeEvent();

let artistURL = "https://rest.bandsintown.com/artists/"+onChangeArtist()+"/events?app_id=23bc806cf4fe0991e7a90f97a8e63576&date="+onChangeEvent();
console.log(artistURL);



d3.json(url).then(function (data) {
    locCoord = []

    for (let i = 0; i < data.length; i++) {

        //convert lat and long into int.
        let lat = (parseInt(data[i].venue.latitude));
        let long = (parseInt(data[i].venue.longitude));
        let city = data[i].venue.city;
        if (
            lat && long && city
        ) {
            let color = "#29cc5b";
            let coord = [
                //lat
                lat,
                //long
                long
            ];

            let radius = 1000; // Adjust the radius as needed

            L.circle(coord, {
                fillOpacity: 0.75,
                color: color,
                radius: radius, // Add the radius parameter
            })
            .bindPopup(
                "City: " + data[i].venue.city
                + "<br> Venue: " + data[i].venue.name
                + "<br> Date: " + data[i].datetime
                + "</br><a href=" + data[i].url + "> Website </a>"
            ).addTo(myMap);
        }
    }
});