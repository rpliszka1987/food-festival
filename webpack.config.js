const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const webpack = require("webpack");
const path = require("path");
const WebpackPwaManifest = require("webpack-pwa-manifest");

module.exports = {
  entry: {
    app: "./assets/js/script.js",
    events: "./assets/js/events.js",
    schedule: "./assets/js/schedule.js",
    tickets: "./assets/js/tickets.js",
  },
  output: {
    path: path.join(__dirname + "/dist"),
    filename: "[name].bundle.js",
  },
  // used to convert images
  module: {
    rules: [
      {
        test: /\.jpg$/i,
        use: [
          {
            loader: "file-loader",
            // changeto tthe file name we want
            options: {
              esModule: false,
              name(file) {
                return "[path][name].[ext]";
              },
              publicPath: function (url) {
                // replace ../ with /assets/
                return url.replace("../", "/assets/");
              },
            },
          },
          {
            loader: "image-webpack-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "static", // the report outputs to an HTML file in the dist folder
    }),
    new WebpackPwaManifest({
      // Desktop name
      name: "Food Event",
      // Mobile app name
      short_name: "Foodies",
      description: "An app that allows you to view upcoming food events",
      // Specify home page of pwa
      start_url: "../index.html",
      background_color: "#01579b",
      theme_color: "#fff",
      fingerprints: false,
      inject: false,
      // Icons for app
      icons: [
        {
          // Path to the images
          src: path.resolve("assets/img/icons/icon-512x512.png"),
          // Icon sizes
          sizes: [96, 128, 192, 256, 384, 512],
          // Where the icons will be send after creation
          destination: path.join("assets", "icons"),
        },
      ],
    }),
  ],
  mode: "development",
};
