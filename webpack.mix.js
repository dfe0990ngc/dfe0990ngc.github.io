const mix = require('laravel-mix');
const purgeCss = require('laravel-mix-purgecss');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

mix.js('resources/js/app.js', 'public/js')
	.sass('resources/sass/main.scss', 'public/css/style.min.css')
	.options({
		processCssUrls: false,
	})
   .purgeCss({
      enabled: mix.inProduction(),
	  content:[
		'index.html',
	  ]
   }).webpackConfig({
		optimization: {
		minimizer: [
			new OptimizeCssAssetsPlugin({}),
		],
		}
	});
