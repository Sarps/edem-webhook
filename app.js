
//console.log(util.format('%s:%s', 'foo'));
const util = require('util');
const request = require('request')
const {WebhookClient} = require('dialogflow-fulfillment');
const express = require('express');
const bodyParser = require('body-parser');

const server = express();
server.use(bodyParser.urlencoded({
    extended: true
}));

server.use(bodyParser.json());

server.post('/', (req, res) => {

  const agent = new WebhookClient({ request: req, response: res });

    let intents = new Map();
    intents.set('account.balance.check', fallback);
    intents.set('currency.convert', testFx);
    intents.set('account.spending.check', fallback);
    intents.set('transfer.money', fallback);
    agent.handleRequest(intents);

    function testFx() {

      const parameters = req.body.queryResult.parameters,
        c_from = parameters["currency-from"] || 'USD',
        c_to = parameters["currency-to"] || 'GHS',
        amount = parameters["amount"] || 1;

      request
      .get(`https://www.amdoren.com//api/currency.php?api_key=8v3VvUXYeEGniBPuANKHbqxp5tRV2v&from=${c_from}&to=${c_to}`,
        function(error, response, body) {
          let value = `${body.amount * amount}`;
          agent.add(value);
        }
      )
      
    }
    
    function fallback(agent) {
      agent.add(`I'm sorry, api not hooked up yet.`);
    }

});

server.listen((process.env.PORT || 8000), () => {
    console.log("Server is up and running...");
});

