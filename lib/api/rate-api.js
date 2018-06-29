require("../../config/server");
const axios = require("axios");
const pair = require("../../helpers/currency-pair");

class RateApi {
  // Get the exchange rate for the currency pair
  getExchangeRate(startingCurrency, endingCurrency) {
    return axios.get(`/rate/${pair(startingCurrency, endingCurrency)}`,
      {
        responseType: "json"
      });
  }
}

module.exports = RateApi;
