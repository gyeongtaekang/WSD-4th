// config-overrides.js
const webpack = require('webpack');
const fs = require('fs');
const dotenv = require('dotenv');

module.exports = function override(config, env) {
  let envVars = {};
  if (env === 'development') {
    envVars = dotenv.parse(fs.readFileSync('.env-dev'));
  } else if (env === 'production') {
    envVars = dotenv.parse(fs.readFileSync('.env-prod'));
  }

  const envKeys = Object.keys(envVars).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(envVars[next]);
    return prev;
  }, {});

  config.plugins.push(new webpack.DefinePlugin(envKeys));
  return config;
};