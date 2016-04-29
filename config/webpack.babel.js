import path from 'path';
import webpack from 'webpack';

const isProduction = 'production' == process.env.NODE_ENV;

const defaults = {
  context: process.cwd(),
  devtool: isProduction ? '#source-map' : 'cheap-module-inline-source-map',
  target: 'web',
  entry: {
    client: [path.resolve('client/index.js')],
    vendor: [
      'babel-polyfill', 'isomorphic-fetch', 'device.js',
      'velocity-animate', 'velocity-animate/velocity.ui', 'jquery',
      'react', 'react-dom', 'react-router', 'redux', 'react-redux',
    ],
  },
  output: {
    libraryTarget: 'var',
    path: path.resolve('public/assets'),
    publicPath: '/assets/',
    filename: isProduction ? '[name].js?[hash]' : '[name].js',
    chunkFilename: isProduction ? '[id].chunk.js?[hash]' : '[id].chunk.js',
  },
  resolve: {
    alias: {
      'fetch': 'isomorphic-fetch',
      'common': path.resolve('common'),
      'velocity': path.resolve('node_modules/velocity-animate/velocity.js'),
      'ScrollMagic': path.resolve('node_modules/scrollmagic/scrollmagic/uncompressed/ScrollMagic.js'),
      'debug.addIndicators': path.resolve('node_modules/scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js'),
      'ScrollMagic.velocity': path.resolve('node_modules/scrollmagic/scrollmagic/uncompressed/plugins/animation.velocity.js'),
    },
    fallback: path.resolve('public'),
    extensions: ['', '.js', '.json', '.jsx'],
  },
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
    }, {
      test: require.resolve('jquery'), loader: 'expose?$!expose?jQuery'
    }, {
      test: require.resolve('scrollmagic'), loader: 'expose?ScrollMagic'
    }],
  },
  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.ProvidePlugin({
      'Promise': 'bluebird',
      'IScroll': 'iscroll/build/iscroll-probe'
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
  ],
  postcss(webpack) {
    return [
      require('postcss-import')({addDependencyTo: webpack, path: ['./']}),
      require('postcss-clearfix')({display: 'table'}),
      require('postcss-hexrgba'),
      require('postcss-position'),
      require('postcss-responsive-type'),
      require('postcss-cssnext')({browsers: '> 1%, last 2 versions'}),
      require('postcss-assets')({
        cachebuster: true,
        basePath: 'public/',
        loadPaths: ['assets/'],
        baseUrl: 'http://localhost:3000/',
      }),
      require('laggard')({opacity: false, pixrem: false, pseudo: false}),
      require('cssnano')({autoprefixer: false, safe: true}),
      require('postcss-browser-reporter'),
    ];
  },
};

export default {
  ...defaults,
  entry: {
    client: isProduction ? defaults.entry.client : [
      ...defaults.entry.client,
      `webpack-hot-middleware/client?noInfo=true&quiet=true&reload=true`,
    ],
    vendor: isProduction ? defaults.entry.vendor : [
      ...defaults.entry.vendor, 'redux-logger',
    ],
  },
  module: isProduction ? defaults.module : {
    loaders: defaults.module.loaders,
    preLoaders: [{test: /\.jsx?$/, include: /client|common/, loader: 'eslint'}],
  },
  plugins: isProduction ? [
    ...defaults.plugins,
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      output: {comments: false},
      compress: {warnings: false},
    }),
  ] : [
    ...defaults.plugins,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
};
