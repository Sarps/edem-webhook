
//console.log(util.format('%s:%s', 'foo'));

const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');

const server = express();
server.use(bodyParser.urlencoded({
    extended: true
}));

server.use(bodyParser.json());

server.post('/get-fx-rate', (req, res) => {

    if( !(req.body.queryResult && req.body.queryResult.parameters) ) {
      return res.json({
        err: "Error"
      })
    }
    const parameters = req.body.queryResult.parameters,
          c_from = parameters["currency-from"] || 'USD',
          c_to = parameters["currency-to"] || 'GHS',
          amount = parameters["amount"] || 1,
          reqUrl = encodeURI(`http://www.amdoren.com/?api_key=8v3VvUXYeEGniBPuANKHbqxp5tRV2v&from=${c_from}&to=${c_to}`);
    
    http.get(reqUrl, 
      (res) => {
          var chunks = [];

          res.on("data", function (chunk) {
            chunks.push(chunk);
          });

          res.on('end', () => {

            const resp = JSON.parse(body.toString());
            let dataToSend = `${resp.amount * amount}`;

            return res.json({
              speech: dataToSend,
              displayText: dataToSend
            });

          });
      }, 
      (error) => {
          return res.json({
              speech: 'Something went wrong!',
              displayText: 'Something went wrong!'
          });
      }
    );

});

server.listen((process.env.PORT || 8000), () => {
    console.log("Server is up and running...");
});