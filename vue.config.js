const webpack = require("webpack");
const CompressionPlugin = require("compression-webpack-plugin");
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

let clientId;
let clientSecret;
let apiKey;

// Indicates that we are building in the Gitlab CI environment and therefore the app is live
const isCiBuild = !!process.env.CI;

// Indicates that we're running unit tests, in which case we don't want to do certain webpack things
const isTest = process.env.NODE_ENV === "test";

const isProd = process.env.NODE_ENV === "production";

if(isCiBuild) {
  console.log("Building on CI server");
}
if(isTest) {
  console.log("Building for tests");
}
if(isProd) {
  console.log("Building for production");
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
    baseUrl: isCiBuild ? "/fitness/" : "/",

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
        }
      ));
      
      // Exclude moment locale files from bundle
      // TODO remove moment altogether and use Luxon
      config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));
      
      // Uncomment this to generate webpack bundle analysis
      //config.plugins.push(new BundleAnalyzerPlugin());

      if(isProd) {
        config.plugins.push(new CompressionPlugin());
      }
    },
    chainWebpack: config => {
      config.module
        .rule("md")
          .test(/\.md$/)
          .use("html")
            .loader("html-loader").end()
          .use("markdown")
            .loader("markdown-loader");
    }
  }
}
