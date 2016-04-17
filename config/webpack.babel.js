import path from 'path';
import webpack from 'webpack';

const isProduction = 'production' == process.env.NODE_ENV;

const defaults = {
  context: process.cwd(),
  devtool: isProduction ? 'hidden-source-map' : '#cheap-module-inline-source-map',
  target: 'web',
  entry: {
    client: [path.resolve('client/index.js')],
    vendor: [
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
    alias: {'common': path.resolve('common')},
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
        'css?modules&localIdentName=[name]_[local]-[hash:base64:4]&importLoaders=1',
        'postcss',
      ],
    }, {test: require.resolve('jquery'), loader: 'expose?$!expose?jQuery'}],
  },
  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.ProvidePlugin({'Promise': 'bluebird'}),
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor', minChunks: 0}),
  ],
  postcss(webpack) {
    return [
      require('postcss-import')({addDependencyTo: webpack, path: ['./']}),
      require('postcss-cssnext')({
        browsers: '> 1%, last 2 versions, not ie <= 8',
      }),
      require('postcss-assets')({
        cachebuster: true,
        basePath: 'public/',
        loadPaths: ['assets/'],
        baseUrl: 'http://localhost:3000/',
      }),
      require('postcss-browser-reporter'),
      require('cssnano')({autoprefixer: false, safe: true}),
    ];
  },
};

export default {
  ...defaults,
  entry: {
    client: isProduction ? defaults.entry.client : [
      ...defaults.entry.client,
      `webpack-hot-middleware/client?noInfo=true&quiet=true&timeout=60000`,
    ],
    vendor: isProduction ? defaults.entry.vendor : [
      ...defaults.entry.vendor, 'redux-logger',
    ]
  },
  module: isProduction ? defaults.module : {
    loaders: defaults.module.loaders,
    preLoaders: [{test: /\.jsx?$/, include: /client|common/, loader: 'eslint'}],
  },
  plugins: isProduction ? [
    ...defaults.plugins,
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMaps: false,
      output: {comments: false},
      compress: {warnings: false},
    }),
  ] : [
    ...defaults.plugins,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
};
