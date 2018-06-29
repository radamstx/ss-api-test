require("../helpers/common-expect");
const Cryptocurrencies = require("../config/cryptocurrencies");
const MarketInfoApi = require("../lib/api/market-info-api");
const pair = require("../helpers/currency-pair");

describe("GET /marketinfo/[pair]", () => {
  let marketInfoApi;

  beforeEach(() => {
    marketInfoApi = new MarketInfoApi();
  });

  // Base Case - Returns a 200
  it("returns a status code of 200 with valid cryptocurrencies supplied", () => {
    return marketInfoApi.getMarketInfo(Cryptocurrencies[0], Cryptocurrencies[1]).then((response) => {
      expect(response.status).toBe(200);
    });
  });

  // Base Case - Invalid pair returns 403
  it("returns an error if an invalid pair is supplied", () => {
    return marketInfoApi.getMarketInfo("herp", "derp").then((response) => {
      expect(false).toBeTruthy();
    }).catch((error) => {
      expect(error.response.status).toBe(403);
    })
  });

  // Tests all cryptocurrency pairs
  for (let i in Cryptocurrencies) {
    let currency = Cryptocurrencies[i];

    // Describe block per cryptocurrency
    describe(`${currency} conversion tests`, () => {

      for (let j in Cryptocurrencies) {
        let compareCurrency = Cryptocurrencies[j];

        // Don't test same currency conversion
        if (currency !== compareCurrency) {

          // Test per lhs, rhs permutation
          it(`returns market info for ${pair(currency, compareCurrency)}`, () => {
            return marketInfoApi.getMarketInfo(currency, compareCurrency).then((response) => {
              expect(response.status).toBe(200);
              expect(response).toReturnPair(currency, compareCurrency);
              expect(response).toReturnLimit();
              expect(response).toReturnRate();
              expect(response).toReturnMinimum();
              expect(response).toReturnMinerFee();
              expect(response).toReturnMaxLimit();
            });
          });
        }
      }
    });
  }
});