let axiosDefaults = require("axios/lib/defaults");
axiosDefaults.baseURL = process.env.TEST_ENV || "https://shapeshift.io";