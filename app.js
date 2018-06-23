
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

    if( !req.body.queryResult || !req.body.queryResult.parameters) {
      return res.json({
        err: "Error"
      })
    }
    const parameters = req.body.result.parameters,
          c_from = parameters["currency-from"] || 'USD',
          c_to = parameters["currency-to"] || 'GHS',
          amount = parameters["amount"] || 1,
          reqUrl = encodeURI(`http://www.amdoren.com/?api_key=8v3VvUXYeEGniBPuANKHbqxp5tRV2v&from=${c_from}&to=${c_to}`);
    
    http.get(reqUrl, 
      (res) => {
          let completeResponse = '';

          res.on('data', (chunk) => {
              completeResponse += chunk;
          });

          res.on('end', () => {

              const resp = JSON.parse(completeResponse);
              let dataToSend += `${resp.amount * amount}`;

              return res.json({
                  speech: dataToSend,
                  displayText: dataToSend,
                  source: 'get-movie-details'
              });

          });
      }, 
      (error) => {
          return res.json({
              speech: 'Something went wrong!',
              displayText: 'Something went wrong!',
              source: 'get-movie-details'
          });
      }
    );

});