import path from 'path';
import webpack from 'webpack';
import NpmInstallPlugin from 'npm-install-webpack-plugin';

const debug = 'debug' == process.env.NODE_ENV;
const final = 'production' == process.env.NODE_ENV;

const defaults = {
  context: process.cwd(),
  devtool: final ? '#srouce-map' : '#cheap-module-eval-source-map',
  module: {
    preLoaders: [
      {test: /\.jsx?$/i, include: /client|common|server/, loader: 'eslint'},
    ],
    loaders: [
      {test: /\.json$/i, include: /client|common|server/, loader: 'json'},
      {test: /\.jsx?$/i, include: /client|common|server/, loader: 'babel?cacheDirectory'},
    ],
  },
  resolve: {
    extensions: ['', '.js', '.json', '.jsx'],
    modulesDirectories: ["node_modules"],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: `vendor${final ? '.[hash]' : ''}.js`,
    }),
    new NpmInstallPlugin(),
  ],
  debug,
  bail: !final,
};

export default {
  ...defaults,
  entry: {
    client: path.join(defaults.context, 'client', 'index.js'),
    vendor: ['react', 'react-dom'],
  },
  output: {
    libraryTarget: 'var',
    path: path.join(defaults.context, 'public', 'assets'),
    publicPath: '/assets/',
    filename: final ? '[name].[hash].js' : '[name].js',
  },
  target: 'web',
  plugins: [
    ...defaults.plugins,
  ],
};
