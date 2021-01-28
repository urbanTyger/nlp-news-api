// /.netlify/functions/sentient
const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();


exports.handler = function (event, context, callback) {
    const dataString = JSON.parse(event.body);
    const { API_KEY, API_URL } = process.env;
    const requestString = `${API_URL}${API_KEY}&of${dataString.of}&lang=${dataString.lang}&${dataString.type}=${dataString.message}`;
    fetch(requestString)
        .then(res => res.json())
        .then(message => {
            callback(null, {
                statusCode: 200,
                // headers: {
                //     'Access-Control-Allow-Origin': '*',
                //     'Access-Control-Allow-Headers':
                //         'Origin, X-Requested-With, Content-Type, Accept'
                // },
                body: JSON.stringify(message)
            });

        })
}