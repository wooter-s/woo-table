`use strict`;

const path = require('path'),
	  merge = require('lodash.merge');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function(config) {

	var configWebpack = config.webpack;

	// 样式loader
	const commonLoaders = [
	    {
	        loader: 'cache-loader',
	        options: {
	            // provide a cache directory where cache items should be stored
	            cacheDirectory: path.resolve('.cache')
	        }
	    },
	    {
	        loader: 'css-loader',
	        options: {
	            localIdentName: '[name]-[local]-[hash:base64:5]',
	            module: config.webpack.cssModule,
	            autoprefixer: true,
		        minimize: true
	        }
	    },
	    { 
	        loader: 'postcss-loader' 
	    }
	];

	const styleRules = {
	    css: {
	        test: /\.css$/,
	        // 单独抽出样式文件
	        loader: ExtractTextPlugin.extract({
	            fallback: 'style-loader', 
	            use: commonLoaders
	        }),
	        include: path.resolve(config.webpack.path.src)
	    },
	    less: {
	        test: /\.less$/,
	        loader: ExtractTextPlugin.extract({
	            fallback: 'style-loader', 
	            use: merge([], commonLoaders).concat([{
	                loader: 'less-loader'
	            }])
	        })
	    },
	    stylus: {
	        test: /\.styl$/,
	        loader: ExtractTextPlugin.extract({
	            fallback: 'style-loader',
	            use: merge([], commonLoaders).concat([{
	                loader: 'stylus-loader'
	            }])
	        })
	    },
	    sass: {
	        test: /\.s(a|c)ss$/,
	        loader: ExtractTextPlugin.extract({
	            fallback: 'style-loader', 
	            use: merge([], commonLoaders).concat([{
	                loader: 'sass-loader'
	            }])
	        })
	    }
	};

	var rules = [];

	configWebpack.style.forEach((style) => {
	    style = (style === 'scss') ? 'sass' : style;
	    let rule = styleRules[style] || '';
	    rule && rules.push(rule);
	});

	return rules;
};