const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){

res.sendFile(__dirname + "/index.html");


});

app.post("/" , function(req ,res) {
  const query = req.body.cityName;
  const appID = "03e2acafbedc7f6365a1357b0d745b7d";
  const units = "metric"
  const url = ("https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + appID + "&units=" + units)

  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data)
      const description = weatherData.wind.speed
      const temp = weatherData.main.temp
      const icon = weatherData.weather[0].icon
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<p>The wind speed is currently " + description + " kilometers per hour" + "<p>");
      res.write("<h1>The temperature in " + query + " is " + temp + " Celcius </h1>");
      res.write("<img src=" + imageURL + ">");
      res.send()
  // there can only be one res.send in one get request so you can use multiple res.write and combine it into one res.send
    })
})

})




app.listen(process.ENV.PORT || 3000, function() {
  console.log("Server is running on port 3000");
});
