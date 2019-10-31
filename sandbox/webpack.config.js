const path = require("path");
/**
  webpackCommonFactory is a factory function that builds webpack configs that are common to both local and production builds.
  It is invoked in each form's webpack.config.js.
  Assuming that each form follows the same file structure conventions
  (eg: using src/app.js as the entrypoint, outputting to public/).

  You can overwrite or add additional configs specific to your form by plugging them into
  extraCommonConfigs within your form's webpack.config.js.

  Source environment variables with 'dotenv' library in your form's webpack.config.js before running webpackCommonFactory.
  All `process.env.___` variables in this factory function will be plugged in with your form's specific variables.

  @param __dirname: plug in your form's __dirname to resolve all of the filepaths correctly.
    Note: the __dirname in this file will not refer to *this* particular directory,
    it will refer to the form-specific __dirname that you plug in at webpack.config.js.
**/

module.exports = {
  resolve: {
    modules: ["node_modules"],
    extensions: [".js", ".jsx"],
    alias: {}
  },
  context: __dirname,
  node: { __filename: true },
  entry: path.resolve(__dirname, "App.js"),
  output: {
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        },
      },
      {
        test: /\.css$/,
        loaders: ["style-loader", "css-loader"]
      },
      {
        test: /\.svg/,
        loaders: ["svg-url-loader"]
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: {
          loader: "url-loader",
          options: {
            limit: 4096,
            name: "images/[name].[ext]"
          }
        }
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 4096,
            name: "fonts/[name].[ext]",
            mimetype: "application/font-woff"
          }
        }
      },
      {
        test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: {
          loader: "file-loader",
          options: {
            limit: 4096,
            name: "fonts/[name].[ext]"
          }
        }
      }
    ]
  }
}
