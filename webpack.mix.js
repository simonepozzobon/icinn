const mix = require('laravel-mix')
require('laravel-mix-purgecss')

mix
    .sass('src/scss/app.scss', 'dist/css')
    .js('src/js/app.js', 'dist/js')
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
            'dist/{*,**/*}.*',
            'js/{*,**/*}.*',
            'css/{*,**/*}.*',
            'index.html',
        ]
    })
    .webpackConfig(webpack => {
        return {
            resolve: {
                alias: {
                    'styles': path.resolve(__dirname, 'src/scss'),
                    '_js': path.resolve(__dirname, 'src/js'),
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
