import path from 'path';
import webpack from 'webpack';

const isProduction = 'production' == process.env.NODE_ENV;

const defaults = {
  context: process.cwd(),
  debug: !isProduction,
  devtool: isProduction ? '#source-map' : '#cheap-module-inline-source-map',
  module: {
    preLoaders: [
      {test: /\.jsx?$/, include: /client|common/, loader: 'eslint'},
    ],
    loaders: [{
      test: /\.jsx?$/,
      include: /client|common/,
      loader: 'babel?cacheDirectory'
    }, {
      test: /\.(?:gif|jpe?g|png|svg)$/,
      include: /public/,
      loader: 'url?limit=10240&name=images/[name].[ext]'
    }, {
      test: /\.css$/,
      include: /common/,
      loaders: [
        'style',
        'css?localIdentName=[name]_[local]-[hash:base64:4]&modules',
        'postcss'
      ]
    }],
  },
  resolve: {
    // alias: {'react-router': 'rrtr'},
    fallback: path.resolve('public'),
    extensions: ['', '.js', '.json', '.jsx'],
  },
  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  postcss: webpack => [
    require('postcss-import')({addDependencyTo: webpack}),
    require('postcss-url')(),
    require('postcss-cssnext')(),
  ],
};

export default {
  ...defaults,
  entry: {
    client: isProduction ? [
      path.join(defaults.context, 'client', 'index.js'),
    ] : [
      path.join(defaults.context, 'client', 'index.js'),
      `webpack-hot-middleware/client?noInfo=true&quiet=true&timeout=60000`,
    ],
    // vendor: ['react', 'react-dom'],
  },
  output: {
    libraryTarget: 'var',
    path: path.join(defaults.context, 'public', 'assets'),
    publicPath: '/assets/',
    filename: isProduction ? '[name].js?[hash]' : '[name].js',
    chunkFilename: isProduction ? '[id].chunk.js?[hash]' : '[id].chunk.js',
  },
  target: 'web',
  plugins: isProduction ? [
    ...defaults.plugins,
    new webpack.optimize.CommonsChunkPlugin('vendor.js?[hash]'),
    new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),
  ] : [
    ...defaults.plugins,
    new webpack.optimize.CommonsChunkPlugin('vendor.js'),
  ],
};
