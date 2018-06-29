require("../../config/server");
const axios = require("axios");

class RatePairAPI {
  // Get the exchange rate for 2 currencies
  getExchangeRate(starting_currency, ending_currency) {
    return axios.get(`/rate/${starting_currency}_${ending_currency}`,
      {
        responseType: "json"
      });
  }
}

module.exports = RatePairAPI;
