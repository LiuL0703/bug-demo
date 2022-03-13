const { override } = require("customize-cra");

const dropConsole = () => {
  return (config) => {
    if (config.optimization.minimizer) {
      config.optimization.minimizer.forEach((minimizer) => {
        if (minimizer.constructor.name === "TerserPlugin") {
          minimizer.options.terserOptions.compress.drop_console = true;
        }
      });
    }
    return config;
  };
};

const disableSourceMap = () => (config) => {
  if (process.env.NODE_ENV === "production") {
    config.devtool = false;
  }
  return config;
};

const customizeCraOverride = override(
  disableSourceMap(),
  dropConsole()
);

const webpack = (config, env) => {
  return customizeCraOverride(config, env);
};

module.exports = {
  webpack
};
