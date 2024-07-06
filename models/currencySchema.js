import { required, isString } from "https://deno.land/x/validasaur/mod.ts";

export const currencySchema= {
  id: [required, isString],
  name: [required, isString],
  symbol: [required, isString],
  rate: [required, isString],
  sescription: [required, isString]
};