const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', function (req, res) {
    console.log(__dirname + '/views/programming.html');
    res.sendFile(path.join(__dirname, '../views/programming/programming.html'));
});
router.get('/overview', function (req, res) {
    console.log(__dirname + '/views/overview.html');
    res.sendFile(path.join(__dirname, '../views/programming/overview.html'));
});
router.get('/strengths-and-weaknesses', function (req, res) {
    console.log(__dirname + '/views/strengths-and-weaknesses.html');
    res.sendFile(path.join(__dirname, '../views/programming/strengths-and-weaknesses.html'));
});
router.get('/experiences', function (req, res) {
    console.log(__dirname + '/views/experiences.html');
    res.sendFile(path.join(__dirname, '../views/programming/experiences.html'));
});
router.get('/education', function (req, res) {
    console.log(__dirname + '/views/education.html');
    res.sendFile(path.join(__dirname, '../views/programming/education.html'));
});
router.get('/personal-projects', function (req, res) {
    console.log(__dirname + '/views/personal-projects.html');
    res.sendFile(path.join(__dirname, '../views/programming/personal-projects.html'));
})
//Export router object and require it in main js file
module.exports = router;