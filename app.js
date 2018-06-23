
//console.log(util.format('%s:%s', 'foo'));

const express = require('express');
const bodyParser = require('body-parser');
const http = require('https');

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
          reqUrl = `https://www.amdoren.com//api/currency.php?api_key=8v3VvUXYeEGniBPuANKHbqxp5tRV2v&from=${c_from}&to=${c_to}`;
    
    http.get(reqUrl, 
      (t_res) => {
          var chunks = [];

          t_res.on("data", function (chunk) {
            chunks.push(chunk);
          });

          t_res.on('end', () => {

            var body = Buffer.concat(chunks);
            console.log(body.toString())
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