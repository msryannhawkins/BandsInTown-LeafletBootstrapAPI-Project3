// These urls are examples for calling for data from mongoDB databases

// urlTS = "http://127.0.0.1:64576/data/TS"
// d3.json(url).then(function (data){
//     console.log(data)
// });

// urlDrake = "http://127.0.0.1:64576/data/drake"
// d3.json(urlDrake).then(function (data){
//     console.log(data)
// });

// Create a map
let myMap = L.map("map", {
    center: [40, -40],
    zoom: 3.2
});
  
// Adding a tile layer (the background map image) to our map:
// We use the addTo() method to add objects to our map.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Grab the element from HTML by th ID for artists
let artists = document.getElementById("dd1mob1");
// Add an event listener tied to the element
artists.addEventListener('change', onChangeArtist);

// Grab the element from HTML by th ID for events
let event = document.getElementById("dd2mob1");
// Add an event listener tied to the element
event.addEventListener('change', onChangeEvent);

// create a function that collects the value of the selected index for the artists
function onChangeArtist(a) {
    // returns the value of the selected index
    a = artists.options[artists.selectedIndex].value
    console.log(a);
    return a;
}
// call function for consol log
onChangeArtist();
// create a function that collects the value of the selected index for the events
function onChangeEvent(e) {
    // returns the value of the selected index
    e = event.options[event.selectedIndex].value
    console.log(e);
    return e;
}
// call function for consol log
onChangeEvent();

// set markers to an array
let markers = [];

function map() {
    // Create an url for an API call from the selected indexes
    let newUrl = "https://rest.bandsintown.com/artists/"+artists.value+"/events?app_id=23bc806cf4fe0991e7a90f97a8e63576&date="+event.value;
    console.log(newUrl);
    // Remove the old markers from the map before adding new ones
    markers.forEach(marker => marker.removeFrom(myMap));
    markers = [];
    // Get the current date
    const currentDate = new Date().toJSON();

    // store data in website
    d3.json(newUrl).then(function (data){
        console.log(data)
    });

    // create else if statment for the upcoming, past, and all
    if (event.value == "upcoming") {
        // format API call to JSON 
        d3.json(newUrl).then(function (data) {
            for (let i = 0; i < data.length; i++) {
                //convert lat and long into int.
                let lat = parseInt(data[i].venue.latitude);
                let long = parseInt(data[i].venue.longitude);
                // get the city name
                let city = data[i].venue.city;
                // get the Date of concert
                let eventDate = new Date(data[i].datetime).toJSON();
                if (lat && long && city) {
                    let color = "green";
                    let coord = [
                        //lat
                        lat,
                        //long
                        long
                    ];
                    //let radius = 25000 // Adjust the initial radius as needed
                    let circle = L.circle(coord, {
                        fillOpacity: 0.75,
                        color: color,
                        radius: 25000 // Add the initial radius parameter
                    });
                    // create pop ups for line up, location, venue, date, and website 
                    circle.bindPopup(
                        "Line Up: " + data[i].lineup
                        + "<br> Location: " + data[i].venue.city +", "+ data[i].venue.region +", "+ data[i].venue.country
                        + "<br> Venue: " + data[i].venue.name
                        + "<br> Date: " + new Date(data[i].datetime)
                        + "</br>Purchase Tickets: <a href=" + data[i].url + "> Website </a>"
                    ).addTo(myMap);

                    // Add the newly created marker to the markers array
                    markers.push(circle);
                }
            }
            // Event listener to update circle marker radius upon zooming
            myMap.on("zoomend", function () {
                let zoomLevel = myMap.getZoom();
                // Calculate the new radius based on the zoom level
                let newRadius = 4000 * zoomLevel; // Adjust the multiplier as needed
                // Iterate through the circles and update their radius
                myMap.eachLayer(function (layer) {
                    if (layer instanceof L.Circle) {
                        layer.setRadius(newRadius);
                    }
                });
            });
            });
    }
    // create else if statment for the upcoming, past, and all
    else if (event.value == "past") {
        // format API call to JSON 
        d3.json(newUrl).then(function (data) {
            for (let i = 0; i < data.length; i++) {
                //convert lat and long into int.
                let lat = parseInt(data[i].venue.latitude);
                let long = parseInt(data[i].venue.longitude);
                // get the city name
                let city = data[i].venue.city;
                // Get the date of concert
                let eventDate = new Date(data[i].datetime).toJSON();
                if (lat && long && city) {
                    let color = "red";
                    let coord = [
                        //lat
                        lat,
                        //long
                        long
                    ];
                    //let radius = 25000; // Adjust the initial radius as needed
                    let circle = L.circle(coord, {
                        fillOpacity: 0.75,
                        color: color,
                        radius: 25000 // Add the initial radius parameter
                    });
                    // create pop ups for line up, location, venue, date, and website 
                    circle.bindPopup(
                        "Line Up: " + data[i].lineup
                        + "<br> Location: " + data[i].venue.city +", "+ data[i].venue.region +", "+ data[i].venue.country
                        + "<br> Venue: " + data[i].venue.name
                        + "</br> Date: " + new Date(data[i].datetime)
                    ).addTo(myMap);

                    // Add the newly created marker to the markers array
                    markers.push(circle);
                }
            }
            // Event listener to update circle marker radius upon zooming
            myMap.on("zoomend", function () {
                let zoomLevel = myMap.getZoom();
                // Calculate the new radius based on the zoom level
                let newRadius = 4000 * zoomLevel; // Adjust the multiplier as needed
                // Iterate through the circles and update their radius
                myMap.eachLayer(function (layer) {
                    if (layer instanceof L.Circle) {
                        layer.setRadius(newRadius);
                    }
                });
            });
            });
    }
    // create else if statment for the upcoming, past, and all
    else {
        // format API call to JSON 
        d3.json(newUrl).then(function (data) {
        for (let i = 0; i < data.length; i++) {
            // convert lat and long into int.
            let lat = parseInt(data[i].venue.latitude);
            let long = parseInt(data[i].venue.longitude);
            // get the city name
            let city = data[i].venue.city;
            // Get the date of the concert
            let eventDate = new Date(data[i].datetime).toJSON();
            if (lat && long && city) {
                // use the current date time to determine color of upcoming and past concerts
                let color = eventDate > currentDate ? "green" : "red";
                let coord = [
                    //lat
                    lat,
                    //long
                    long
                ];
                //let radius = 25000; // Adjust the initial radius as needed
                let circle = L.circle(coord, {
                    fillOpacity: 0.75,
                    color: color,
                    radius: 25000 // Add the initial radius parameter
                });
                // create pop ups for line up, location, venue, date, and website 
                circle.bindPopup(
                    "Line Up: " + data[i].lineup
                    + "<br> Location: " + data[i].venue.city +", "+ data[i].venue.region +", "+ data[i].venue.country
                    + "<br> Venue: " + data[i].venue.name
                    + "<br> Date: " + new Date(data[i].datetime)
                    + "</br>Purchase Tickets: <a href=" + data[i].url + "> Website </a>"
                ).addTo(myMap);

                // Add the newly created marker to the markers array
                markers.push(circle);
            }
        }
        // Event listener to update circle marker radius upon zooming
        myMap.on("zoomend", function () {
            let zoomLevel = myMap.getZoom();
            // Calculate the new radius based on the zoom level
            let newRadius = 4000 * zoomLevel; // Adjust the multiplier as needed
            // Iterate through the circles and update their radius
            myMap.eachLayer(function (layer) {
                if (layer instanceof L.Circle) {
                    layer.setRadius(newRadius);
                }
            });
        });
        });
    }
}
// run the map() function
map();