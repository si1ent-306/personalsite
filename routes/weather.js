const express = require('express');
const router = express.Router();
const path = require('path');
require('dotenv').config();

router.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, '../views/projects/weather/index.html'))
});

router.get('/api', async (req, res) => {
    const city = req.query.city;
    const apiKey = process.env.WEATHER_API_KEY;
    console.log("Received request for city:", city);
    console.log("Using API Key:", apiKey ? "Key exists" : "Key missing");
    if (!city) {
        return res.status(400).json({ error: "City parameter is required" });
    }

    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    try {
        const response = await fetch(apiURL);
        console.log("API Response Status:", response.status);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`OpenWeather API error: ${response.statusText}. Response: ${errorText}`);
        }

        const data = await response.json();
        console.log("Weather Data Received:", data);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch weather data" });
    }
})

//Export router object and require it in main js file
module.exports = router;