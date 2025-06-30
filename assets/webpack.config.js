const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = ({
  out = 'public/dist',
}) => ({
  devtool: 'source-map',
  context: __dirname,
  entry: {
    home: './src/js/home/index.jsx',
    admin: './src/js/admin/index.jsx',
  },
  output: {
    filename: '[name].js',
    path: resolve(__dirname, `../${out}`, 'assets'),
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '~': resolve(__dirname, './src/js'),
    },
    // webpack 4 to 5 fix
    fallback: { path: require.resolve('path-browserify') },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new CopyPlugin({
      patterns: [
        { from: './src/img', to: 'img' },
        { from: './src/locales', to: '../locales' },
      ],
    }),
  ],
  optimization: {},
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: ['pug-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              // url: false,
              sourceMap: true,
            },
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
});
