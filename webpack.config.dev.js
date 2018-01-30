const webpack = require('webpack');
const path = require('path');

process.env['NODE_ENV'] = 'development';

module.exports = {
    // sourcemaps inline
	devtool: 'inline-source-map',
	context: path.resolve(__dirname, "src"),
    entry: {
        app: 'index.tsx'
    },

    target: 'web',
	output: {
		// absolute path
		path: path.resolve(__dirname, 'dist'),
		// this is whats used by HTML files when specifying path
		publicPath: '/',
		filename: '[name].bundle.js'
	},
	plugins:[
    ],

    resolve: {
        // look for modules in .ts(x) first, then .js
        extensions: ['.ts', '.tsx', '.js'],

        // add 'src' to the modules so that when you import files you can do so with 'src'
        // as the relative route
        modules: ['src', 'node_modules']
    },

    module: {
        // .ts(x) files should first pass through the typescript loader first and then through babel
        loaders: [
            {
                test: /\.tsx?$/,
                loaders: ['babel-loader', 'ts-loader'],
                include: path.resolve('src')
            },
			{
				test: /\.js$/,
				include: [
					path.resolve(__dirname, "src"),
					path.resolve(__dirname, "tools"),
					path.resolve(__dirname, "test")
			    ],
				loaders: ['babel-loader']
			},
			{ test: /\.css$/, loaders: ['style-loader', 'css-loader'] },
			{test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream'},
			{
				test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				use: [
				{
					loader: 'url-loader',
					options: {
						limit: 10000,
						mimetype: 'application/font-woff'
					}
				}]
			},
			{
				test: /\.eot(\?v=\d+.\d+.\d+)?$/,
				use: ['file-loader']
			},
			{
				test: /\.(jpe?g|png|gif|ico)$/i,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 6000,
						name: 'images/[name].[ext]'
					}
				}]
			},
			{
				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 10000,
						mimetype: 'image/svg+xml'
					}
				}]
			}

        ]
    }
}
