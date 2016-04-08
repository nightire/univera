import path from 'path';
import webpack from 'webpack';

const debug = 'debug' == process.env.NODE_ENV;
const final = 'production' == process.env.NODE_ENV;

const defaults = {
  context: process.cwd(),
  bail: !final,
  debug: !final,
  devtool: final ? '#srouce-map' : '#cheap-module-inline-source-map',
  module: {
    preLoaders: [
      {test: /\.jsx?$/, include: /client|common/, loader: 'eslint'},
    ],
    loaders: [
      {test: /\.jsx?$/, include: /client|common/, loader: 'babel?cacheDirectory'},
      {test: /\.(?:gif|jpe?g|png|svg)$/, include: /public/, loader: 'file?name=images/[name].[ext]'}
    ],
  },
  resolve: {
    extensions: ['', '.js', '.json', '.jsx'],
  },
  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV'])
  ]
};

export default {
  ...defaults,
  name: 'client side',
  entry: {
    client: path.join(defaults.context, 'client', 'index.js'),
    vendor: ['babel-polyfill', 'react', 'react-dom'],
  },
  output: {
    libraryTarget: 'var',
    path: path.join(defaults.context, 'public', 'assets'),
    publicPath: '/assets/',
    filename: final ? '[name].[hash].js' : '[name].js',
  },
  target: 'web',
  plugins: final ? [
    ...defaults.plugins,
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.[hash].js'),
  ] : [
    ...defaults.plugins,
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
  ],
};
