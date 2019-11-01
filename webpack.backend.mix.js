const mix = require('laravel-mix')
require('laravel-mix-purgecss')
require('laravel-mix-polyfill')

mix
    .setPublicPath(path.normalize('public/backend'))
    .options({
        processCssUrls: false
    })
    .sass('resources/scss/admin.scss', 'admin.css')
    .js('resources/js/admin/app.js', 'admin.js')
    .extract([
        'jquery',
        'bootstrap',
        'bootstrap-vue',
        'moment',
        'string-strip-html',
        'mime-types',
        'text-clipper',
        'gsap'
    ])
    // .autoload({
    //     jquery: ['$', 'jQuery', 'jquery'],
    //     tether: ['Tether'],
    // })
    .purgeCss()
    .polyfill({
        enabled: false,
        useBuiltIns: 'usage',
        targets: 'last 2 version, not dead',
        debug: true
    })
    .browserSync({
        proxy: 'http://icinn.test',
        startPath: '/admin',
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
