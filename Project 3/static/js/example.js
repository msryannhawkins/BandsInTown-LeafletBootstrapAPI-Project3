//alert("it is hooked up");

url = "http://127.0.0.1:64576/data/TS"
d3.json(url).then(function (data){
    console.log(data)
});