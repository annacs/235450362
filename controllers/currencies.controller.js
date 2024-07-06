import { currencies } from "../models/currencies.ts";
import { currencySchema } from "../models/currencySchema.ts";
import { validate } from "https://deno.land/x/validasaur/mod.ts";

export const createCurrency = async(ctx, next) => {
    const body = ctx.request.body();
    const value = await body.value;
    console.log(`Got ${value}`);
    //console.log("One currency is created");
    currencies.push(value);
    ctx.response.status = 201; //201: successful
    ctx.response.body = value;
    await next();
  };