const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const bodyParser = require('body-parser');
const programming = require('./routes/programming');
const announcing = require('./routes/announcing');
const scoreboard = require('./routes/scoreboard');
const pokemon = require('./routes/pokemon');
const weather = require('./routes/weather');
const blackjack = require('./routes/blackjack');
 

app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files like CSS and images
app.use('/scripts', express.static (__dirname+'/public/scripts'));
app.use('/images', express.static (__dirname+'/public/images'));
app.use('/css', express.static (__dirname+'/public/css'));

app.use('/programming', programming);
app.use('/announcing', announcing);
app.use('/scoreboard', scoreboard);
app.use('/pokemon', pokemon);
app.use('/weather', weather);
app.use('/blackjack', blackjack);

app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'index.html'));
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

