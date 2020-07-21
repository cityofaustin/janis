const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// This is how we modify webpack with react-static v6+
export default pluginOptions => ({
  webpack: config => {
    // Include babel poyfill for IE 11 and below
    // https://github.com/react-static/react-static/blob/master/docs/concepts.md#browser-support
    config.entry = [
      'babel-polyfill',
      'core-js/web/url',
      ...(Array.isArray(config.entry) ? config.entry : [config.entry]),
    ];

    config.optimization.minimizer = [new UglifyJsPlugin()]

    config.devtool = false;

    return config;
  }
})
