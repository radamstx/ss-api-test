const util = require("util");

expect.extend({
  toBeSuccessful(received, lhs, rhs) {
    const expectedStatus = 200;
    const expectedPair = `${lhs}_${rhs}`;
    const expectedRateFormat = /^\d+.\d+$/;
    const message = `expected status to be ${expectedStatus}, pair to be "${expectedPair}", rate to be non-null, \
                    and rate to match format: ${expectedRateFormat}. Got: "${util.inspect(received)}"`;

    const pass = received.status === expectedStatus &&
                  received.data["pair"] === expectedPair &&
                  received.data["rate"] !== null &&
                  expectedRateFormat.test(received.data["rate"]);

    return {
      message: () => message,
      pass: pass
    };
  }
});