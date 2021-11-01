const express = require("express");
const axios = require("axios");
const redis = require("redis");

const router = require("./app/routes");
const session = require("./app/middlewares/session");
const corsMw = require("./app/middlewares/cors");
const apiErrorHandler = require("./app/errors/api-error-handler");

require("dotenv").config({
  path: ".env",
});

const envConfig = {
  environment: process.env.NODE_ENV,
  serverUrl: process.env.SERVER_URI,
  serverPort: process.env.SERVER_PORT,
  externalApiUrl: process.env.GITHUB_API_URI,
};

const app = express();
app.use(express.json());
// if you run behind a proxy (e.g. nginx)
// app.set('trust proxy', 1);

app.options("*", corsMw);
app.use(corsMw);
app.use(session);
app.use(router);
app.use(apiErrorHandler);

app.listen(envConfig.serverPort || 3000, () => {
  console.log(
    `EMS Server now started on ${envConfig.serverUrl}:${envConfig.serverPort}`
  );
});
