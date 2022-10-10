module.exports = {
    // 项目部署的基础路径
    publicPath: './',

    // 将构建好的文件输出到哪里（或者说将编译的文件）
    outputDir: 'dist',

    // 放置静态资源的地方 (js/css/img/font/...)
    assetsDir: 'assets',

    // 是否在保存的时候使用 `eslint-loader` 进行检查。
    // 有效的值：`ture` | `false` | `"error"`
    // 当设置为 `"error"` 时，检查出的错误会触发编译失败。
    lintOnSave: false,

    // 是否为生产环境构建生成 source map？
    productionSourceMap: true,

    devServer: {

    },

    runtimeCompiler: true,

    css: {
        //是否为 CSS 开启 source map。设置为 true 之后可能会影响构建的性能
        sourceMap: false,

    }
}