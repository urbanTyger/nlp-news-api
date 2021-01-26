const path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const cors = require('cors');
const app = express()
const bodyParser = require('body-parser')
const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();

app.use(cors());
app.use(express.static('dist'))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

console.log(__dirname)

const API_Url = 'https://api.meaningcloud.com/sentiment-2.1?key=';



app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

app.post(('/sentient'), async (request, response) => {
    const dataString = request.body;
    const API_KEY = process.env.API_KEY;
    const requestString = `${API_Url}${API_KEY}&of${dataString.of}&lang=${dataString.lang}&${dataString.type}=${dataString.message}`;
    fetch(requestString)
        .then(res => res.json())
        .then(res => {
            if (res.status.msg != "OK") {
                let error = res;

                throw error;
            } else {
                response.send(res);
            }
        })
        .catch(err => {
            response.status(err.status.code).send(err);
        });
});
// Designates what port the app will listen to for incoming requests
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})
