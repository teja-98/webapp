const express = require("express");
const app = express();
const bodyParse = require("body-parser");
const https = require("https");

app.set('view engine', 'ejs'); // Set the view engine to EJS
app.set('views', 'views'); // Set the views directory

app.use(bodyParse.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get("/", function(req, res) {
    res.render("index", { weatherData: null });
  });

app.post("/", function(req, res) {
  const apiKey = "b9872a776ca84dd734d3429dc4bb1ff0";
  const city = req.body.place;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  https.get(url, function(response) {
    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      res.render("index", { weatherData });
    });
  });
});

app.listen(3000, function() {
  console.log("Server is running at port 3000");
});
