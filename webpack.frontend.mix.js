const mix = require('laravel-mix')
require('laravel-mix-purgecss')
require('laravel-mix-polyfill')

mix
    .js('resources/js/app.js', 'public/js/app.js')
    .sass('resources/scss/app.scss', 'public/css/app.css')
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
        enabled: true,
        useBuiltIns: 'usage',
        targets: 'last 2 version, not dead',
        debug: true
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
            ]
        }
    })
