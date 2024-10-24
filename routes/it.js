const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', function (req, res) {
    console.log(__dirname);
    res.sendFile(path.join(__dirname, '../views/it.html'));
});
//Export router object and require it in main js file
module.exports = router;