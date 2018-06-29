require("../../config/server");
const axios = require("axios");
const pair = require("../../helpers/currency-pair");

class MarketInfoApi {
  // Get the current market info for the currency pair
  getMarketInfo(startingCurrency, endingCurrency) {
    return axios.get(`/marketinfo/${pair(startingCurrency, endingCurrency)}`,
      {
        responseType: "json"
      });
  }
}

module.exports = MarketInfoApi;
