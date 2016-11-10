const path = require( 'path' );
const webpack = require( 'webpack' );
const NODE_ENV = process.env.NODE_ENV || 'development';

const webpackConfig = {
	progress: true,
	output: {
		publicPath: '/js/',
		path: path.resolve( __dirname, './js' ),
		filename: '[name].js',
		chunkFilename: '[id].js',
		libraryTarget: 'var',
		library: 'Anadam'
	},
	plugins: [
		new webpack.DefinePlugin( {
			// NODE_ENV is used inside React to enable/disable features that should only
			// be used in development
			'process.env': {
				NODE_ENV: JSON.stringify( NODE_ENV ),
			}
		} ),
	],
	devtool: ( 'production' === NODE_ENV ) ? false : '#source-map',
	debug: ( 'production' === NODE_ENV ) ? false : true,
	resolve: {
		extensions: [ '', '.js', '.jsx' ],
		alias: {
			utils: path.resolve( __dirname, 'js/utils' ),
		}
	},
	stats: { colors: true, reasons: true },
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loader: 'babel',
				query: {
					presets: [ 'react', 'es2015' ]
				},
				exclude: [ /node_modules\/moment/ ],
			},
			{
				test: /\.jsx?$/,
				loader: 'eslint',
				exclude: [ /node_modules/ ],
			}
		]
	},
	eslint: {
		configFile: path.join( __dirname, '.eslintrc' ),
		failOnError: true,
		quiet: true,
	}
};

if ( NODE_ENV === 'production' ) {
	// When running in production, we want to use the minified script so that the file is smaller
	webpackConfig.plugins.push( new webpack.optimize.UglifyJsPlugin( {
		compress: {
			warnings: false
		}
	} ) );

	webpackConfig.plugins.push( new webpack.optimize.DedupePlugin() );
}

module.exports = webpackConfig;
