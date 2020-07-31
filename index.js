const express = require('express');
const path = require('path');
var bodyParser = require('body-parser');
const fs = require('fs');

var jsonParser = bodyParser.json();
const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '/LemonProject/build')));

// An api endpoint that returns a short list of items
app.get('/api/getList', (req, res) => {
    var list = ["item1", "item2", "item3"];
    res.json(list);
    console.log('Sent list of items');
});
app.post('/api/add/user', jsonParser, (req, res) => {
    console.log("entered api");
    console.log('POST request to the homepage', req.body);
    //var jsonObj = JSON.parse(req.body);
    //console.log('parsed req.body', req.body);

    // stringify JSON Object
    var jsonContent = JSON.stringify(req.body);
    console.log('string version of object', jsonContent);

    fs.writeFile("output.json", jsonContent, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }

        console.log("JSON file has been saved.");
    });
});
// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/LemonProject/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
