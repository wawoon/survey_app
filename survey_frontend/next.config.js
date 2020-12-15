const webpack = require("webpack");
const withSourceMaps = require("@zeit/next-source-maps");

const path = require("path");
let env = process.env.NODE_ENV || "development";
try {
  const envFileName = `.env.${env}`;
  const fullpath = path.resolve(__dirname, envFileName);
  require("dotenv").config({ path: fullpath });
} catch (error) {
  console.error(error);
}

const config = {
  webpack: (config) => {
    config.plugins.push(
      new webpack.EnvironmentPlugin(["SITE_URL", "SERVER_URL"])
    );
    return config;
  },
};

module.exports = withSourceMaps(config);
