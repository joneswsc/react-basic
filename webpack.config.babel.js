import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import precss from 'precss';
import path from 'path';

const assetsDir = path.resolve(__dirname, 'public/assets');
const nodeModulesDir = path.resolve(__dirname, 'node_modules');

const config = {
  entry: [
    path.resolve(__dirname, 'src/app/index.jsx')
  ],
  output: {
    path: assetsDir,
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.jsx', '.js', '.json', '.coffee']
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel',
      exclude: [nodeModulesDir]
    },
    {
      test: /\.scss$/,
      loader: 'style!css!postcss!sass'
    },
    {
      test: /\.css$/,
      loader: 'style!css!postcss'
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
      loader: 'url?limit=100000@name=[name][ext]'
    }]
  },
  postcss: () => ([precss, autoprefixer]),
  plugins: [
    getImplicitGlobals(),
    setNodeEnv()
  ]
};

/*
* here using hoisting so don't use `var NAME = function()...`
*/
function getImplicitGlobals() {
  return new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery'
  });
}

function setNodeEnv() {
  return new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('dev')
    }
  });
}

export default config;
