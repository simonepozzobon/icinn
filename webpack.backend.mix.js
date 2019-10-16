const mix = require('laravel-mix')
require('laravel-mix-purgecss')

// const mix = require('laravel-mix');
//
// /*
//  |--------------------------------------------------------------------------
//  | Mix Asset Management
//  |--------------------------------------------------------------------------
//  |
//  | Mix provides a clean, fluent API for defining some Webpack build steps
//  | for your Laravel application. By default, we are compiling the Sass
//  | file for the application as well as bundling up all the JS files.
//  |
//  */
//
// mix.js('resources/js/app.js', 'public/js')
//     .sass('resources/sass/app.scss', 'public/css');


mix
    .sass('resources/scss/admin.scss', 'public/css/admin.css')
    .js('resources/js/admin/app.js', 'public/js/admin.js')
    // .extract(['jquery', 'tether', 'bootstrap'])
    // .autoload({
    //     jquery: ['$', 'jQuery', 'jquery'],
    //     tether: ['Tether'],
    // })
    .purgeCss({
        globs: [
            path.join(__dirname, 'index.html'),
        ],
        folders: ['src'],
        extensions: ['html']
    })
    .browserSync({
        proxy: 'http://icinn.test',
        browser: 'google chrome',
        port: 3013,
        files: [
            'resources/{*,**/*}.*',
            'public/{*,**/*}.*',
            'app/{*,**/*}.*',
            'index.html',
        ]
    })
    .webpackConfig(webpack => {
        return {
            resolve: {
                alias: {
                    'styles': path.resolve(__dirname, 'resources/scss'),
                    '_js': path.resolve(__dirname, 'resources/js'),
                    'node_modules': path.resolve(__dirname, 'node_modules'),
                }
            },
            plugins: [
                new webpack.DefinePlugin({
                    'process.env': {
                        'NODE_ENV': JSON.stringify('production')
                    }
                }),
                // new webpack.LoaderOptionsPlugin({
                //     options: {
                //         loaders: [
                //             {
                //                 test: /\.vue$/,
                //                 exclude: /node_modules/,
                //                 loader: 'vue-loader'
                //             },
                //             {
                //                 test: /\.js$/,
                //                 exclude: /node_modules/,
                //                 use: {
                //                     loader: 'babel-loader'
                //                 }
                //             }
                //         ],
                //     }
                // }),
                // new webpack.optimize.UglifyJsPlugin(),
                // new webpack.optimize.AggressiveMergingPlugin()
            ]
        }
    })
