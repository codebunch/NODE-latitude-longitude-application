const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();
const geocode = require('./utils/geocode.js');
const weatherstack = require('./utils/weatherstack.js');

const port = process.env.PORT || 3000;

//what's? dirname && filename && node module path.
//console.log(__dirname);
//console.log(__filename);
//console.log(path.join(__dirname, '../public'));
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));



app.get('', (req, res) => {
    res.render('index', {
        title: "DEMO application to get Latitude/Longitude running on Node.js",
        name: "Sathish"
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        name: "Sathish"
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        name: "Sathish"
    });
});

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: "City mandatory for API request"
        })
    }

    let apiError = false;
    let geocodeCity = "";
    let geocodeLatitude = 0;
    let geocodeLongitude = 0;
    let weatherCity = "";
    let weatherTemperature = 0;
    let weatherObservationTime = 0;
    let weatherResults;
    let geocodeResults = {
        geocodeCity: "",
        geocodeLatitude: "",
        geocodeLongitude: ""
    }
    geocode(req.query.address, (error, data) => {
        if (error) {
            apiError = true;
        } else {
            weather(data);
        }
    });

    const weather = (data) => {
        geocodeResults = {
            geocodeCity: data.city,
            geocodeLatitude: data.latitude,
            geocodeLongitude: data.longitude
        }
        weatherstack(data, (error, data) => {
            if (error) {
                apiError = true;
            }
            else {                
                weatherCity =  data.city;
                weatherTemperature = data.temperature;
                weatherObservationTime = data.observation_time;
                console.log("weatherCity: " + weatherCity);
                res.send({
                    geocode:{
                        City: geocodeResults.geocodeCity,
                        Latitude: geocodeResults.geocodeLatitude,
                        Longitude: geocodeResults.geocodeLongitude
                    },
                    weather:{
                        City: weatherCity,
                        Temperature: weatherTemperature,
                        ObservationTime: weatherObservationTime
                    }
                });
            }
        })
    };

    if (apiError) {
        return res.send({
            error: "Invalid Address, please check"
        })
    } 
});

app.get('/products', (req, res) => {
    console.log(req.query.search);
    if (!req.query.search) {
        return res.send({
            error: "No products available"
        })
    }
    res.send({
        product: "bike",
        color: "black"
    })
});

app.get('*', (req, res) => {
    res.render('404-page', {
        title: " ",
        name: "Sathish"
    });
});

app.listen(port, () => {
    console.log("Server is up on port 3000");
});