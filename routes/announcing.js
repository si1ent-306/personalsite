const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', function (req, res) {
    console.log(__dirname + '/../views/announcing.html');
    res.sendFile(path.join(__dirname, '../views/announcing/announcing.html'))
});
router.get('/overview', function (req, res) {
    console.log(__dirname + '/../views/overview.html');
    res.sendFile(path.join(__dirname, '../views/announcing/overview.html'))
});
router.get('/strengths-and-weaknesses', function (req, res) {
    console.log(__dirname + '/../views/strengths-and-weaknesses.html');
    res.sendFile(path.join(__dirname, '../views/announcing/strengths-and-weaknesses.html'))
});
router.get('/experiences', function (req, res) {
    console.log(__dirname + '/../views/experiences.html');
    res.sendFile(path.join(__dirname, '../views/announcing/experiences.html'))
});
router.get('/teamsandvenues', function (req, res) {
    console.log(__dirname + '/../views/teamsandvenues.html');
    res.sendFile(path.join(__dirname, '../views/announcing/teamsandvenues.html'))
});
router.get('/education', function (req, res) {
    console.log(__dirname + '/../views/education.html');
    res.sendFile(path.join(__dirname, '../views/announcing/education.html'))
});

router.get('/highlights', function (req, res) {
    console.log(__dirname + '/../views/highlights.html');
    res.sendFile(path.join(__dirname, '../views/announcing/highlights.html'))
});

router.get('/other', function (req, res) {
    console.log(__dirname + '/../views/other.html');
    res.sendFile(path.join(__dirname, '../views/announcing/other.html'))
});
//Export router object and require it in main js file
module.exports = router;