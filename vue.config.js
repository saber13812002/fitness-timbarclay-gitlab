const webpack = require("webpack");
const path = require('path');

let clientId;
let clientSecret;
let apiKey;

// Indicates that we are building in the Gitlab CI environment and therefore the app is live
const isCiBuild = !!process.env.CI;

// Indicates that we're running unit tests, in which case we don't want to do certain webpack things
const isTest = process.env.NODE_ENV === "test";

if(isCiBuild) {
  console.log("Building on CI server");
}
if(isTest) {
  console.log("Building for tests");
}

if(isCiBuild) {
  // We're running in Gitlab CI environment so use secret variables
  clientId = process.env.CLIENT_ID;
  clientSecret = process.env.CLIENT_SECRET;
  apiKey = process.env.API_KEY;
} else {
  // We're running locally so use a config file that's not checked into the repo
  const config = require("./config");
  clientId = config.google.CLIENT_ID;
  clientSecret = config.google.CLIENT_SECRET;
  apiKey = config.google.API_KEY;
}

if(!isTest) {
  module.exports = {
    configureWebpack: config => {
      config.plugins.push(
        new webpack.DefinePlugin({
          CLIENT_ID: JSON.stringify(clientId),
          CLIENT_SECRET: JSON.stringify(clientSecret),
          API_KEY: JSON.stringify(apiKey),
          IS_LIVE: isCiBuild,
          process: {
            env: {
              NODE_ENV: JSON.stringify(process.env.NODE)
            }
          }
        }))
  
      if(isCiBuild) {
        config.output.publicPath = "/fitness/"
      }
    }
  }
}