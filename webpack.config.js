const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { EnvironmentPlugin } = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'index.[chunkhash].js',
        chunkFilename: `js/[name].[chunkhash].js`,
        publicPath: './'
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
                reactVendor: {
                    test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                    name: 'reactVendor',
                    priority: 10
                },
                pfVendor: {
                    test: /[\\/]node_modules[\\/](@patternfly)[\\/]/,
                    name: 'pfVendor',
                    priority: 10
                },
                rhcsVendor: {
                    test: /[\\/]node_modules[\\/](@redhat-cloud-services)[\\/]/,
                    name: 'rhcsVendor',
                    priority: 10
                },
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    priority: 9
                }
            }
        }
    },
    devServer: {
        https: Boolean(process.env.PROXY),
        allowedHosts: 'all',
        port: process.env.PORT || 3000,
        historyApiFallback: true,
        client: {
            overlay: false
        },
        ...(process.env.PROXY && { proxy: {
            '/api': {
                target: 'https://internal.console.stage.redhat.com/app/payload-tracker/',
                changeOrigin: true,
                autoRewrite: true,
                secure: true
            }
        } })
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.s?[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(woff(2)?|ttf|jpg|png|eot|gif|svg)(\?v=\d+\.\d+\.\d+)?$/,
                type: 'asset/resource',
                generator: {
                    filename: 'public/[name][ext]'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './src/index.html' }),
        new EnvironmentPlugin({ ENV: '', PROXY: '' }),
        ...(process.env.ANALYZE === 'true' ? [new BundleAnalyzerPlugin()] : [])
    ]
};
