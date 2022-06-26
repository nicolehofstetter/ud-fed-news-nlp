const dotenv = require('dotenv');
dotenv.config();
require('path');
const express = require('express');
require('./mockAPI.js');
var bodyParser = require('body-parser');
var cors = require('cors');
var FormData = require('form-data');
var fetch = require('node-fetch');

const app = express();
app.use(cors());
// to use json
app.use(bodyParser.json());
// to use url encoded values
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static('dist'));

console.log(__dirname);

app.get('/', function (req, res) {
    res.sendFile('dist/index.html');
});

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!');
});

app.post('/classify', async function (req, res) {
    let inputText = req.body.url;
    let responseObject = await postSentimentApi(inputText);
    res.send(responseObject);
});


async function postSentimentApi(url) {
    let apiKey = process.env.API_KEY;

    let formData = new FormData();
    formData.append('key', apiKey);
    formData.append('lang', 'en');
    formData.append('url', url);

    return await fetch('https://api.meaningcloud.com/sentiment-2.1', {
        method: 'POST',
        redirect: 'follow',
        body: formData
    })
        .then(res => res.json())
        .then(function (res) {
            return mapResponse(res);
        }).catch((error) => {
            console.error('Error calling external api' + error);
        });
}


function mapResponse(res) {
    let polarityMap = new Map([
        ['P+', 'strong positive'],
        ['P', 'positive'],
        ['NEU', 'neutral'],
        ['N', 'negative'],
        ['N+', 'strong negative'],
        ['NONE', 'without polarity'],
    ]);

    let polarity = polarityMap.get(res.score_tag);
    let subjectivity = res.subjectivity.toLowerCase();
    let irony = res.irony.toLowerCase();
    let mappedResponse = {
        polarity: polarity,
        subjectivity: subjectivity,
        irony: irony
    };
    return mappedResponse;
}
