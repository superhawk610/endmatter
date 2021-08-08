const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin');
const HtmlInlineCSSPlugin = require('html-inline-css-webpack-plugin').default;
const TwineFormatPlugin = require('./twine-format-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const prod = process.env.NODE_ENV === 'production';

module.exports = {
  mode: prod ? 'production' : 'development',
  entry: './src/index.ts',
  devtool: prod ? false : 'inline-source-map',
  output: { clean: true, path: path.resolve(__dirname, './dist') },
  resolve: { extensions: ['.tsx', '.ts', '.js'] },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: { transpileOnly: true },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new CssMinimizerPlugin(),
    new HtmlWebpackPlugin({ template: './src/index.html', inject: 'body' }),
    prod && new HtmlInlineScriptPlugin([/main.js/]),
    prod && new HtmlInlineCSSPlugin(),
    new TwineFormatPlugin({
      name: prod ? 'Endmatter' : 'Endmatter (DEV)',
      author: 'Aaron Ross <superhawk610@gmail.com>',
      description: 'Simple JSON export supporting YAML meta in endmatter.',
    }),
  ].filter(Boolean),
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,
  },
};
