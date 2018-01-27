var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractCSS = new ExtractTextPlugin('vendor.css');
var isDevBuild = process.argv.indexOf('--env.prod') < 0;
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    resolve: {
        extensions: ['.js', '.scss']
    },
    module: {
        rules: [
            { test: /\.(jpe?g|gif|png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
            { test: /\.scss$/i, loaders: extractCSS.extract(['css-loader?minimize', 'sass-loader']) },
            {
                test: /\.css$/,
                loader: extractCSS.extract({ fallbackLoader: 'style-loader', loader: 'css-loader' })
            },
            { test: /\.json$/, loader: 'json-loader' }
        ]
    },
    entry: {
        vendor: [
            '@angular/common',
            '@angular/compiler',
            '@angular/core',
            '@angular/http',
            '@angular/forms',
            '@angular/platform-browser',
            '@angular/platform-browser-dynamic',
            '@angular/router',
            'angular2-toaster',
            'ngx-bootstrap',
            'ngx-color-picker',
            'angular2-image-upload',
            'rxjs',
            'zone.js',  
            'reflect-metadata',
            'bootstrap',
            'admin-lte/plugins/fastclick/fastclick.min.js',
            'admin-lte/plugins/slimScroll/jquery.slimscroll.min.js',
            'admin-lte/plugins/iCheck/icheck.min.js',
            'admin-lte/dist/js/app.js',
            'admin-lte/plugins/iCheck/all.css',
            'bootstrap/dist/css/bootstrap.min.css',
            'admin-lte/dist/css/AdminLTE.min.css',
            'admin-lte/dist/css/skins/skin-blue.min.css',
            'ionicons/dist/css/ionicons.css',
            'angular2-toaster/toaster.css',
            'font-awesome/scss/font-awesome.scss',
            'angular-calendar/dist/css/angular-calendar.css'
        ]
    },
    output: {
        path: path.join(__dirname, '../wwwroot', 'dist'),
        filename: '[name].js',
        library: '[name]_[hash]',
    },
    plugins: [
        extractCSS,
        // To eliminate warning
        // https://github.com/AngularClass/angular2-webpack-starter/issues/993
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            __dirname
        ),
        new webpack.DllPlugin({
            path: path.join(__dirname, '../wwwroot', 'dist', '[name]-manifest.json'),
            name: '[name]_[hash]'
        }),
        new CopyWebpackPlugin([
            { from: 'node_modules/admin-lte/dist/img/avatar.png', to: 'assets/avatar_mad.png' },
            { from: 'node_modules/admin-lte/dist/img/avatar2.png', to: 'assets/avatar_fcl.png' },
            { from: 'node_modules/admin-lte/dist/img/avatar3.png', to: 'assets/avatar_fdr.png' },
            { from: 'node_modules/admin-lte/dist/img/avatar04.png', to: 'assets/avatar_mcl.png' },
            { from: 'node_modules/admin-lte/dist/img/avatar5.png', to: 'assets/avatar_mdr.png' }
        ])
    ].concat(isDevBuild ? [] : [
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            comments: false
        })
    ])
};
