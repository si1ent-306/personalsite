const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../views/projects/pokemon/index.html'))
});

//Export router object and require it in main js file
module.exports = router;