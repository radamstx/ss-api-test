const pair = require("../helpers/currency-pair");

expect.extend({
  toReturnPair(received, lhs, rhs) {
    const pairReturned = received.data["pair"];
    const _pair = pair(lhs, rhs);
    const message = `expected ${_pair}, got ${pairReturned}`;

    return {
      message: () => message,
      pass: _pair.toLowerCase() === pairReturned.toLowerCase()
    };
  },
  toReturnRate(received) {
    // no rate key returned
    if (!received.data.hasOwnProperty("rate")) {
      return { message: () => "rate not returned in response", pass: false };
    }

    const rate = received.data["rate"];

    // Null limit value
    if (rate === null) {
      return { message: () => "rate returned is null", pass: false };
    }

    if (!/^\d+.\d+$/.test(rate)) {
      return { message: () => `${rate} is not of the proper floating point format`, pass: false };
    }

    return { message: () => "success", pass: true };
  },
  toReturnLimit(received) {
    // no limit key returned
    if (!received.data.hasOwnProperty("limit")) {
      return { message: () => "limit not returned in response", pass: false };
    }

    const limit = received.data["limit"];

    // Null limit value
    if (limit === null) {
      return { message: () => "limit returned is null", pass: false };
    }

    if (!/^\d+.\d+$/.test(limit)) {
      return { message: () => `${limit} is not of the proper floating point format`, pass: false };
    }

    return { message: () => "success", pass: true };
  },
  toReturnMinimum(received) {
    // no minimum key returned
    if (!received.data.hasOwnProperty("minimum")) {
      return { message: () => "min not returned in response", pass: false };
    }

    const minimum = received.data["minimum"];

    // Null minimum value
    if (minimum === null) {
      return { message: () => "minimum returned is null", pass: false };
    }

    if (!/^\d+.\d+$/.test(minimum)) {
      return { message: () => `${minimum} is not of the proper floating point format`, pass: false };
    }

    return { message: () => "success", pass: true };
  },
  toReturnMinerFee(received) {
    // no miner fee key returned
    if (!received.data.hasOwnProperty("minerFee")) {
      return { message: () => "minerFee not returned in response", pass: false };
    }

    const minerFee = received.data["minerFee"];

    // Null miner fee value
    if (minerFee === null) {
      return { message: () => "minerFee returned is null", pass: false };
    }

    if (!/^\d+.\d+$/.test(minerFee)) {
      return { message: () => `${minerFee} is not of the proper floating point format`, pass: false };
    }

    return { message: () => "success", pass: true };
  },
  toReturnMaxLimit(received) {
    // no max limit key returned
    if (!received.data.hasOwnProperty("maxLimit")) {
      return { message: () => "maxLimit not returned in response", pass: false };
    }

    const maxLimit = received.data["maxLimit"];

    // Null max limit value
    if (maxLimit === null) {
      return { message: () => "minerFee returned is null", pass: false };
    }

    if (!/^\d+.\d+$/.test(maxLimit)) {
      return { message: () => `${maxLimit} is not of the proper floating point format`, pass: false };
    }

    return { message: () => "success", pass: true };
  }
});