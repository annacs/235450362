// import { addCurrency } from './currency-api';
// import { getCurrency } from './currency-api';
const { getCurrency, addCurrency } = require('./currency-api');

// const addCurrency = require('./currency-api');

exports.handler = (event, context, callback) => {
  const result = currency-api.addCurrency(id);
  // use the imported function in your logic
  callback(null, result);
};

// exports.handler = (event, context, callback) => {
//   const usdCurrency = getCurrency('USD');
//   console.log(usdCurrency);

//   addCurrency('JPY', 'Japanese Yen', '¥', 0.0075, 'The official currency of Japan.');
//   callback(null, 'Currency operations completed');
// };

var getRawBody = require('raw-body');
var getFormBody = require('body/form');
var body = require('body');

const httpStatus = {
  OK: 200,
  CREATED: 201,
  NOT_FOUND: 404
};

/*
To enable the initializer feature (https://help.aliyun.com/document_detail/156876.html)
please implement the initializer function as below：
exports.initializer = (context, callback) => {
  console.log('initializing');
  callback(null, '');
};
*/

exports.handler = (event, context, callback) => {
  // Extract the currency symbol from the event object
  const { symbol } = event.pathParameters;

  // Use the getCurrency function to retrieve the currency information
  const currency = getCurrency(symbol);

  // Check if the currency was found
  if (currency) {
    // Prepare the response in the desired JSON format
    const response = {
      name: currency.name,
      symbol: currency.symbol,
      description: currency.description
    };

    // Return the response
    callback(null, {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(response)
    });
  } else {
    // If the currency is not found, return a 404 error
    callback(null, {
      statusCode: 404,
      body: `Currency with symbol '${symbol}' not found.`
    });
  }
};

exports.handler = (req, resp, context) => {
    console.log('hello world');

    var params = {
        path: req.path,
        queries: req.queries,
        headers: req.headers,
        method : req.method,
        requestURI : req.url,
        clientIP : req.clientIP,
    }

    switch(req.method) {
      case 'GET':
        if (req.path === "/currency/") {
          resp.statusCode = httpStatus.OK;
          resp.setHeader("Content-Type", "application/json");
          resp.send(JSON.stringify(getCurrency(symbol), null, ' '));
        } else if (req.path === "/rate/") {
          resp.statusCode = httpStatus.OK;
          resp.setHeader("Content-Type", "application/json");
          resp.send(JSON.stringify(getCurrency(), null, ' '));
        }
        break; 
      case 'POST':
        resp.statusCode = httpStatus.CREATED;
        addCurrency(req.body);
        resp.send(getCurrency());
        break;
      case 'PUT','DELETE':
        resp.statusCode = httpStatus.NOT_FOUND;
        resp.send("Only GET and POST methods are allowed!");
        break;
    }  

    getRawBody(req, function(err, body) {
        for (var key in req.queries) {
          var value = req.queries[key];
          resp.setHeader(key, value);
        }
        resp.setHeader("Content-Type", "text/plain");
        params.body = body.toString();
        resp.send(JSON.stringify(params, null, '    '));
    });

    /*
    getFormBody(req, function(err, formBody) {
        for (var key in req.queries) {
          var value = req.queries[key];
          resp.setHeader(key, value);
        }
        params.body = formBody;
        console.log(formBody);
        resp.send(JSON.stringify(params));
    });
    */
}