require("../helpers/common-expect");
const Cryptocurrencies = require("../config/cryptocurrencies");
const RateApi = require("../lib/api/rate-api");
const pair = require("../helpers/currency-pair");

describe("GET /rate/[pair]", () => {
  let rateApi;

  beforeEach(() => {
    rateApi = new RateApi();
  });

  // Base case - Returns a 200
  it("returns a status code of 200 with valid cryptocurrencies supplied", () => {
    return rateApi.getExchangeRate(Cryptocurrencies[0], Cryptocurrencies[1]).then((response) => {
      expect(response.status).toBe(200);
    });
  });

  // Base Case - Invalid Pair
  it("returns an error if an invalid pair is supplied", () => {
    return rateApi.getExchangeRate("herp", "derp").then((response) => {
      expect(response).toReturnError("Pair herp_derp is currently unavailable.");
    })
  });

  // Tests all cryptocurrency pairs
  for (let i in Cryptocurrencies) {
    let currency = Cryptocurrencies[i];

    // Describe block per cryptocurrency
    describe(`${currency} rate tests`, () => {

      for (let j in Cryptocurrencies) {
        let compareCurrency = Cryptocurrencies[j];

        // Don't test same currency conversion
        if (currency !== compareCurrency) {

          // Test per lhs, rhs permutation
          it(`returns a rate for ${pair(currency, compareCurrency)}`, () => {
            return rateApi.getExchangeRate(currency, compareCurrency).then((response) => {
              expect(response.status).toBe(200);
              expect(response).toReturnPair(currency, compareCurrency);
              expect(response).toReturnRate();
            });
          });
        }
      }
    });
  }
});