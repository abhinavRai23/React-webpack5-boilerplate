const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');

const devMode = process.env.APP_ENV === 'local';

const otherPlugIns = [];
if (!devMode) {
	otherPlugIns.push(new CleanWebpackPlugin());
	otherPlugIns.push(new MiniCssExtractPlugin());
	if (process.env.BUNDLE_ANALYZE) {
		const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
		otherPlugIns.push(
			new BundleAnalyzerPlugin({
				analyzerMode: 'server',
				generateStatsFile: true,
				statsOptions: { source: false }
			})
		);
	}
}

module.exports = {
	entry: { index: path.resolve(__dirname, 'src', 'index.js') },
	output: {
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},
			{
				test: /\.(sc|c)ss$/,
				use: [
					devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							limit: 8192,
							mimetype: 'image/png',
							name: 'images/[name].[ext]'
						}
					}
				]
			},
			{
				test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192,
							mimetype: 'application/font-woff',
							name: 'fonts/[name].[ext]'
						}
					}
				]
			},
			{
				test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192,
							mimetype: 'application/octet-stream',
							name: 'fonts/[name].[ext]'
						}
					}
				]
			},
			{
				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192,
							mimetype: 'image/svg+xml',
							name: 'images/[name].[ext]'
						}
					}
				]
			}
		]
	},
	optimization: {
		splitChunks: { chunks: 'all' },
		minimize: !devMode,
		minimizer: [
			new TerserWebpackPlugin({
				terserOptions: {
					compress: {
						comparisons: false
					},
					mangle: {
						safari10: true
					},
					output: {
						comments: false,
						ascii_only: true
					},
					warnings: false
				}
			}),
			new OptimizeCssAssetsPlugin()
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'src', 'index.html')
		}),
		...otherPlugIns
	]
};
