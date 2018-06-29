require("../helpers/common-expect");

const Cryptocurrencies = require("../config/cryptocurrencies");
const RatePairAPI = require("../lib/api/rate-pair-api");

describe("GET /rate/[pair]", () => {
  let ratePairAPI;

  beforeEach(() => {
    ratePairAPI = new RatePairAPI();
  });

  it("returns a status code of 200 with valid cryptocurrencies supplied", () => {
    return ratePairAPI.getExchangeRate(Cryptocurrencies[0], Cryptocurrencies[1]).then((response) => {
      expect(response.status).toBe(200);
    });
  });

  for (let i in Cryptocurrencies) {
    let currency = Cryptocurrencies[i];
    describe(`${currency} conversion tests`, () => {
      for (let j in Cryptocurrencies) {
        let compare_currency = Cryptocurrencies[j];
        if (currency !== compare_currency) {
          /**
           * Test that is valid for every currency conversion except x -> x
           */
          it(`returns a conversion rate between ${currency} and ${compare_currency}`, () => {
            return ratePairAPI.getExchangeRate(currency, compare_currency).then((response) => {
              expect(response).toBeSuccessful(currency, compare_currency);
            });
          });
        }
      }
    });
  };
});