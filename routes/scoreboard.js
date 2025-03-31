const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../views/projects/scoreboard/index.html'))
});

router.get('/game/:gameId',function (req, res) {
    res.sendFile(path.join(__dirname, '../views/projects/scoreboard/game.html'))
});

//Export router object and require it in main js file
module.exports = router;