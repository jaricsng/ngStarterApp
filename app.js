// app.js

var express = require('express');
var request = require('request');
var cfenv = require('cfenv');

var app = express();
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();
var weather_host = appEnv.services["weatherinsights"] ?
    appEnv.services["weatherinsights"][0].credentials.url // Insights for Weather credentials passed in
    :
    "https://baa3efe9-011c-4a60-b5a4-0fd6077d1ff8:PPAVRhnXnd@twcservice.mybluemix.net"; // or copy your credentials url here for standalone

function weatherAPI(path, qs, done) {
    var url = weather_host + path;
    console.log(url, qs);
    request({
        url: url,
        method: "GET",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Accept": "application/json"
        },
        qs: qs
    }, function(err, req, data) {
        if (err) {
            done(err);
        } else {
            if (req.statusCode >= 200 && req.statusCode < 400) {
                try {
                    done(null, JSON.parse(data));
                } catch (e) {
                    console.log(e);
                    done(e);
                }
            } else {
                console.log(err);
                done({
                    message: req.statusCode,
                    data: data
                });
            }
        }
    });
}

app.get('/api/forecast/daily', function(req, res) {
    var geocode = (req.query.geocode || "1.27,103.84").split(",");
    weatherAPI("/api/weather/v1/geocode/" + geocode[0] + "/" + geocode[1] + "/forecast/daily/10day.json", {
        units: req.query.units || "m",
        language: req.query.language || "en"
    }, function(err, result) {
        if (err) {
            console.log(err);
            res.send(err).status(400);
        } else {
            console.log("10 days Forecast");
            res.json(result);
        }
    });
});

app.get('/api/forecast/hourly', function(req, res) {
    var geocode = (req.query.geocode || "1.27,103.84").split(",");
    weatherAPI("/api/weather/v1/geocode/" + geocode[0] + "/" + geocode[1] + "/forecast/hourly/48hour.json", {
        units: req.query.units || "m",
        language: req.query.language || "en"
    }, function(err, result) {
        if (err) {
            res.send(err).status(400);
        } else {
            console.log("24 hours Forecast");
            result.forecasts.length = 24; // we require only 24 hours for UI
            console.log("current temp: " + result.forecasts[0].temp);
            res.json(result);
        }
    });
});

app.listen(appEnv.port, appEnv.bind, function() {
    console.log("server starting on " + appEnv.url);
});