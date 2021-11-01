require("dotenv").config();

/* eslint no-process-env:0 */
module.exports.default = {
  environment: process.env.NODE_ENV,
  serverUrl: process.env.SERVER_URI,
  serverPort: process.env.SERVER_PORT,
  externalApiUrl: process.env.GITHUB_API_URI,

  db: {
    dbHost: process.env.DB_HOST,
    dbUser: process.env.DB_USERNAME,
    dbPass: process.env.DB_PASSWORD,
    dbPort: process.env.DB_PORT,
  },
};
