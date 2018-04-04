const webpack = require("webpack");

let clientId;
let clientSecret;
let apiKey;

if(process.env.CI) {
  // We're running in Gitlab CI environment so use secret variables
  clientId = process.env.CLIENT_ID;
  clientSecret = process.env.CLIENT_SECRET;
  apiKey = process.env.API_KEY;
} else {
  const config = require("./config");
  clientId = config.google.CLIENT_ID;
  clientSecret = config.google.CLIENT_SECRET;
  apiKey = config.google.API_KEY;
}

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        CLIENT_ID: JSON.stringify(clientId),
        CLIENT_SECRET: JSON.stringify(clientSecret),
        API_KEY: JSON.stringify(apiKey),
        process: {
          env: {
            NODE_ENV: JSON.stringify(process.env.NODE)
          }
        }
      })
    ]
  }
}