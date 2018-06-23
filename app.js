
console.log(util.format('%s:%s', 'foo'));

const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');

const server = express();
server.use(bodyParser.urlencoded({
    extended: true
}));

server.use(bodyParser.json());

server.post('/get-fx-rate', (req, res) => {

    const movieToSearch = req.body.result && req.body.result.parameters && req.body.result.parameters.movie ? req.body.result.parameters.movie : 'The Godfather';
    const reqUrl = encodeURI(`http://www.amdoren.com/?api_key=8v3VvUXYeEGniBPuANKHbqxp5tRV2v&from=${movieToSearch}&to=${API_KEY}`);
    var options = {
      "method": "GET",
      "hostname": "www.amdoren.com",
      "port": null,
      "path": "/api/currency.php?api_key=8v3VvUXYeEGniBPuANKHbqxp5tRV2v&from=USD&to=EUR",
      "headers": {
        "cache-control": "no-cache",
        "postman-token": "0cb322cd-efc1-7515-b414-131c374bed9e"
      }
    };

    var req = http.request(options, function (res) {
      var chunks = [];

      res.on("data", function (chunk) {
        chunks.push(chunk);
      });

      res.on("end", function () {
        var body = Buffer.concat(chunks);
        const result = JSON.parse(body.toString());

        return res.json({
          speech: dataToSend,
          displayText: dataToSend
        })
      });

    });

});