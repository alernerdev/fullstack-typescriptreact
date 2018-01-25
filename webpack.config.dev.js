const webpack = require('webpack');
const path = require('path');

process.env['NODE_ENV'] = 'development';

module.exports = {
    // sourcemaps inline
    devtool: 'eval',
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
        // look for modules in in .ts(x) first, then .js
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
			}
        ]
    }
}