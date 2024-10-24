const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser');
const it = require('./routes/it');
const announcing = require('./routes/announcing');

app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files like CSS and images
app.use('/images', express.static (__dirname+'/public/images'));
app.use('/css', express.static (__dirname+'/public/css'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.use('/it', it);
app.use('/announcing', announcing);

app.set('views', path.join(__dirname, '/views'));