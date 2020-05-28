const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

//var PEERS = ['http://localhost:3000', 'http://localhost:3500'];
var PEERS = ['https://bfe1c125.ngrok.io'];

var dataObj;
var map = new Map();

try {
    const jsonString = fs.readFileSync('data.json', 'utf8');
    if(jsonString) {
        dataObj = JSON.parse(jsonString);
        for(let[key,value] of Object.entries(dataObj)) {
            key = parseInt(key);
            map.set(key, value);
        }
    }
    else dataObj = {};
}
catch(err) {
    console.log(err);
    return ;
}

app.post('/add', (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    const key = req.body.key;
    const value = req.body.value;
    if(!map.has(key)) {
        console.log(`Set ${key}: ${value}`);
        map.set(key, value);
        dataObj[key] = value;

        const data = {
            "key": key,
            "value": value
        }

        for(i=0; i<PEERS.length; i++) {
            axios.post(PEERS[i] + '/add', data)
                .then((res) => {
                    console.log(`Sent ${key}: ${value} to ${PEERS[i]}`);
                })
                .catch((err) => {
                    console.log('Error while performing POST request ', err);
                });
        }

        var jsonText = JSON.stringify(dataObj);
        fs.writeFile('./data.json', jsonText, err => {
            if(err) console.log('Error while writing file ', err);
            else console.log('File successfully written!');
        })
    }
    else console.log(`Value of ${key} already exists`);

    res.send('Pair received');
});

app.get('/list', (req, res) => {
    res.send(dataObj);
});


app.listen(8000, () => {
    console.log('Server started on port 8000');
})