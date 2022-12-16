// DotEnv
const dotenv = require('dotenv');

dotenv.config();

// Express to run server and routes
const express = require('express');
const path = require('path');
const fetch = require('node-fetch');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Here we are configuring express to use body-parser as middle-ware.
// Cors for cross origin allowance
const cors = require('cors');
const webpack = require('webpack');

app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));

app.get('/', function (req, res) {
    res.sendFile(path.resolve('dist/index.html'));
});

// Spin up the server
const port = 5000;
const server = app.listen(port, () => {
    console.log(`running on localhost: ${port}`);
});

const storedData = [];

// Stores past entries
app.post('/weather', (req, res) => {
    dataFromClient = req.body;
    storedData.push(dataFromClient);
    //console.log('ARRAY')
    //console.log(storedData);
})

app.get('/history', (req, res) => {
    res.send(storedData);
})

// Geonames API call
const get = app.get('/geonames/:place', async (req, res) => {
    const place = req.params.place;
    const enteredPlace = place;
    const geonameKey = process.env.GEONAME_API_KEY;
    const response = await fetch(`http://api.geonames.org/searchJSON?q=${enteredPlace}&maxRows=1&username=${geonameKey}`);
    const geonameData = await response.json();
    res.json(geonameData);

})

// Pix API call
app.get('/pixabay/:destination', async (req, res) => {
    const des = req.params.destination;
    const destination = des;
    console.log(destination);
    const pixKey = process.env.PIX_API_KEY;
    const response3 = await fetch(`https://pixabay.com/api/?key=${pixKey}&q=${destination}&per_page=3`);
    const pixData = await response3.json();
    res.send(pixData);
})

// Weather API call
app.get('/weather/:latlon', async (req, res) => {
    const latlon = req.params.latlon.split(',');
    const lat = latlon[0];
    const lng = latlon[1];
    const weatherKey = process.env.WEATHER_API_KEY;
    const response2 = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?&key=${weatherKey}&lat=${lat}&lon=${lng}`)
    const weatherData = await response2.json();
    res.json(weatherData);

})



module.exports = {
    get
}