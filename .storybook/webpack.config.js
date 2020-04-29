const path = require('path');
const webpack = require("webpack");

// Export a function. Accept the base config as the only param.
module.exports = async ({ config, mode }) => {
  // `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.

  // Make whatever fine-grained changes you need
  config.module.rules.push({
    test: /\.scss$/,
    use: ['style-loader', 'css-loader', 'sass-loader'],
    include: path.resolve(__dirname, '../src'),
  });

  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        "CMS_MEDIA": JSON.stringify("https://joplin3-austin-gov-static.s3.amazonaws.com/staging/media"),
      }
    })
  );

  // Return the altered config
  return config;
};
