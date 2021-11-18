const publicPath = process.env.VUE_APP_PUBLIC_PATH || '/';

module.exports = {
    publicPath: publicPath,
    css: {
        extract: true
    },
    devServer: {
        disableHostCheck: true
    },
    chainWebpack: config => {
        config.module
            .rule('images')
            .use('url-loader')
            .loader('url-loader')
            .tap(options => {
                options.limit = -1
                return options
            })
    }
}