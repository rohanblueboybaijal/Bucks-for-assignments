const express = require('express');
const bodyParser = require('body-parser');
const { Worker, isMainThread, workerData } = require('worker_threads');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

var nonce = -1;

app.post('/start', (req, res) => {
    var str = req.body.data;
    console.log(str);
    res.status = 200;
    res.send('Finding nonce')

    nonce = -1;
    const minerNode = new Worker('./miner.js', { workerData : str});
    minerNode.on('message', (data) => {
        nonce = data.nonce;
        console.log('found', nonce);
    });

    minerNode.on('error', (err) => {
        console.log(err);
    });

});

app.get('/result', (req, res) => {
    var obj = {};
    if(nonce==-1) {
        obj["result"] = "searching";
        obj["nonce"] = nonce;
    }
    else {
        obj["result"] = "found";
        obj["nonce"] = nonce;
    }
    res.send(obj);
});

console.log(nonce);

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
