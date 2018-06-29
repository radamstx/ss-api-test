require("../helpers/common-expect");
const Cryptocurrencies = require("../config/cryptocurrencies");
const LimitApi = require("../lib/api/limit-api");
const pair = require("../helpers/currency-pair");

describe("GET /limit/[pair]", () => {
  let limitApi;

  beforeEach(() => {
    limitApi = new LimitApi();
  });

  // Base Case - Returns a 200
  it("returns a status code of 200 with valid cryptocurrencies supplied", () => {
    return limitApi.getDepositLimit(Cryptocurrencies[0], Cryptocurrencies[1]).then((response) => {
      expect(response.status).toBe(200);
    });
  });

  // Base Case - Invalid Pair
  it("returns an error if an invalid pair is supplied", () => {
    return limitApi.getDepositLimit("herp", "derp").then((response) => {
      expect(response).toReturnError("Unknown pair");
    })
  });

  // Tests all cryptocurrency pairs
  for (let i in Cryptocurrencies) {
    let currency = Cryptocurrencies[i];

    // Describe block per cryptocurrency
    describe(`${currency} deposit limit tests`, () => {

      for (let j in Cryptocurrencies) {
        let compareCurrency = Cryptocurrencies[j];

        // Don't test same currency conversion
        if (currency !== compareCurrency) {

          // Test per lhs, rhs permutation
          it(`returns a deposit limit for ${pair(currency, compareCurrency)}`, () => {
            return limitApi.getDepositLimit(currency, compareCurrency).then((response) => {
              expect(response.status).toBe(200);
              expect(response).toReturnPair(currency, compareCurrency);
              expect(response).toReturnLimit();
            });
          });
        }
      }
    });
  }
});