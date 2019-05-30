const mix = require('laravel-mix')
require('laravel-mix-purgecss')

mix
    .sass('_dev/scss/app.scss', 'css')
    // .extract(['jquery', 'tether', 'bootstrap'])
    // .autoload({
    //     jquery: ['$', 'jQuery', 'jquery'],
    //     tether: ['Tether'],
    // })
    .purgeCss({
        globs: [
            path.join(__dirname, 'index.html'),
        ],
        folders: ['_dev'],
        extensions: ['html']
    })
    .browserSync({
        proxy: 'http://icinn.test',
        browser: 'google chrome',
        port: 3013,
        files: [
            'css/{*,**/*}.css',
            'index.html',
            'istituto.html'
        ]
    })
    .webpackConfig(webpack => {
        return {
            resolve: {
                alias: {
                    'styles': path.resolve(__dirname, 'resources/sass'),
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
