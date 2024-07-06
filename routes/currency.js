import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import * as currencyControllers from "../controller/currency.ts";

const router = new Router({ prefix: "/currency/:symbol" });
router.get("/currency", currencyControllers.getAll);
// router.get("/currency/:id([0-9]{1,})", currencyControllers.getByDigits); //[0-9]{1,} means 1 or more digits
router.get("/currency/:id([0-9]+(?:\.[0-9]+)?)", currencyControllers.getByDigits);
router.post("currency/", currencyControllers.currencyValidation, currencyControllers.createItem);

export const currencyRoutes = router;

exports.getByDigits = (event, context, callback) => {
    // Extract the currency symbol from the event object
    const { id } = event.pathParameters;
  
    // Convert the symbol to a number
    const symbol = parseFloat(id);
  
    // Use the getCurrency function to retrieve the currency information
    const currency = getCurrency(symbol.toString());
  
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
        body: `Currency with symbol '${id}' not found.`
      });
    }
  };