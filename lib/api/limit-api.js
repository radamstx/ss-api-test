require("../../config/server");
const axios = require("axios");
const pair = require("../../helpers/currency-pair");

class LimitApi {
  // Get the limit on exchanging for a given pair
  getDepositLimit(startingCurrency, endingCurrency) {
    return axios.get(`/limit/${pair(startingCurrency, endingCurrency)}`,
      {
        responseType: "json"
      });
  }
}

module.exports = LimitApi;
