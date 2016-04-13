import path from 'path';
import webpack from 'webpack';

const isProduction = 'production' == process.env.NODE_ENV;

const defaults = {
  context: process.cwd(),
  debug: !isProduction,
  devtool: isProduction ? 'hidden-source-map' : '#cheap-module-inline-source-map',
  module: {
    loaders: [{
      test: /\.jsx?$/, include: /client|common/, loader: 'babel?cacheDirectory'
    }, {
      test: /\.(?:gif|jpe?g|png|svg)$/,
      include: /public/,
      loader: 'url?limit=10240&name=images/[name].[ext]?[hash]',
    }, {
      test: /\.css$/,
      include: /common/,
      loaders: [
        'style',
        'css?modules&localIdentName=[name]_[local]-[hash:base64:4]',
        'postcss',
      ],
    }],
  },
  resolve: {
    alias: {'common': path.resolve('common')},
    fallback: path.resolve('public'),
    extensions: ['', '.js', '.json', '.jsx'],
  },
  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.ProvidePlugin({'Promise': 'bluebird'}),
  ],
  postcss: webpack => [
    require('postcss-import')({addDependencyTo: webpack, path: ['./']}),
    require('postcss-cssnext')({browsers: '> 1%, last 2 versions, not ie <= 8'})
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
    vendor: [
      'velocity-animate', 'velocity-animate/velocity.ui', 'jquery',
      'react', 'react-dom', 'react-router', 'redux', 'react-redux'
    ],
  },
  module: isProduction ? {
    ...defaults.module
  } : {
    preLoaders: [{test: /\.jsx?$/, include: /client|common/, loader: 'eslint'}],
    loaders: [
      ...defaults.module.loaders,
      {test: require.resolve('jquery'), loader: 'expose?$!expose?jQuery'},
    ]
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
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js?[hash]'),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      output: {comments: false},
      compress: {warnings: false},
    }),
  ] : [
    ...defaults.plugins,
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
};
