const {
  override,
  // addWebpackAlias
} = require("customize-cra");
// const path = require("path");

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

const optBuild= () => config => {
  config.optimization.runtimeChunk = false;
  config.optimization.splitChunks = {
    cacheGroups: {
      default: false,
    },
  }; 
  return config
}

const disableSourceMap = () => (config) => {
  if (process.env.NODE_ENV === "production") {
    config.devtool = false;
  }
  return config;
};

const customizeCraOverride = override(
  disableSourceMap(),
  dropConsole(),
  optBuild(),
  // addWebpackAlias({
  //   'react': path.resolve(__dirname, '../container/node_modules/react'),
  //   'react-dom': path.resolve(__dirname, '../container/node_modules/react-dom')
  // })
);

const webpack = (config, env) => {
  const webpackConfig = customizeCraOverride(config, env);

  return {
    ...webpackConfig,
    output: {
      ...webpackConfig.output,
      library: "subApp",
      libraryTarget: 'window',
    },
    // externals: {
    //   'react': 'react',
    //   'react-dom': 'react-dom'
    // },
  };
};

module.exports = {
  webpack,
};
