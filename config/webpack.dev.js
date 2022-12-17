// cpu 信息
const os = require("os");
// 多入口配置
const path = require("path");
// 处理 js 资源
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
// html文件自动引入配置
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 提取css成单独文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// css压缩
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
// 开启多进程
const TerserPlugin = require("terser-webpack-plugin");
// 兼容性处理
const PreloadWebpackPlugin = require("@vue/preload-webpack-plugin");

// cpu核数
const threads = os.cpus().length;

// 获取处理样式的Loaders
const getStyleLoaders = (preProcessor) => {
    return [
        MiniCssExtractPlugin.loader,
        "css-loader",
        {
            loader: "postcss-loader",
            options: {
                postcssOptions: {
                    plugins: [
                        "postcss-preset-env", // 能解决大多数样式兼容性问题
                    ],
                },
            },
        },
        preProcessor,
    ].filter(Boolean);
};

module.exports = {
    // 入口
    entry: "./src/main.js",
    // entry: {
    //     "main": "./src/main.js",
    //     "index": "./src/index.js"
    // },
    // 出口
    output: {
        path: path.resolve(__dirname, "../dist"), // 生产模式需要输出
        // [contenthash:8]使用contenthash，取8位长度
        filename: "js/[name]-[contenthash:8].js", // 入口文件打包输出资源命名方式
        chunkFilename: "js/[name]-[contenthash:8].chunk.js", // 动态导入输出资源命名方式
        // assetModuleFilename: "media/[name]-[hash][ext]", // 图片、字体等资源命名方式（注意用hash）
        clean: true,
    },
    // 加载器
    module: {
        rules: [
            {
                oneOf: [
                    {
                        // 用来匹配 .css 结尾的文件
                        test: /\.css$/,
                        // use 数组里面 Loader 执行顺序是从右到左
                        use: getStyleLoaders(),
                    },
                    {
                        test: /\.s[ac]ss$/,
                        use: getStyleLoaders("sass-loader"),
                    },
                    {
                        test: /\.(png|jpe?g|gif|svg)$/,
                        type: "asset",
                        parser: {
                            dataUrlCondition: {
                                maxSize: 10 * 1024, // 小于10kb的图片会被base64处理
                            },
                        },
                        generator: {
                            // 将图片文件输出到 imgs 目录中
                            // 将图片文件命名 [hash:8][ext][query]
                            // [hash:8]: hash值取8位
                            // [ext]: 使用之前的文件扩展名
                            // [query]: 添加之前的query参数
                            filename: "images/[hash:8][ext][query]",
                        },
                    },
                    {
                        test: /\.(ttf|woff2?)$/,
                        type: "asset/resource",
                        generator: {
                            filename: "iconfont/[hash:8][ext][query]",
                        },
                    },
                    {
                        test: /\.js$/,
                        // exclude: /node_modules/, // 排除node_modules代码不编译
                        include: path.resolve(__dirname, "../src"), // 也可以用包含
                        use: [
                            {
                                loader: "thread-loader", // 开启多进程
                                options: {
                                    workers: threads, // 数量
                                },
                            },
                            {
                                loader: "babel-loader",
                                options: {
                                    cacheDirectory: true, // 开启babel编译缓存
                                    cacheCompression: false, // 缓存文件不要压缩
                                    plugins: ["@babel/plugin-transform-runtime"], // 减少代码体积
                                },
                            },
                        ],
                    },
                ],
            },
        ],
    },
    // 插件
    plugins: [
        new ESLintWebpackPlugin({
            // 指定检查文件的根目录
            context: path.resolve(__dirname, "../src"),
            exclude: "node_modules", // 默认值
            cache: true, // 开启缓存
            // 缓存目录
            cacheLocation: path.resolve(
                __dirname,
                "../node_modules/.cache/.eslintcache"
            ),
            threads, // 开启多进程
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "../src/index.html"),
        }),
        // new HtmlWebpackPlugin({
        //     // title : "苏宁易购-官方网站",
        //     // 如果使用template选项则title属性不生效
        //     template: "./src/index.html",
        //     inject: "body",
        //     chunks: ["main"],
        //     filename: "index.html"
        // }),
        // 提取css成单独文件
        new MiniCssExtractPlugin({
            // 定义输出文件名和目录
            filename: "css/[name]-[contenthash:8].css",
            chunkFilename: "css/[name]-[contenthash:8].chunk.css",
        }),
        new PreloadWebpackPlugin({
            rel: "preload", // preload兼容性更好
            as: "script",
            // rel: 'prefetch' // prefetch兼容性更差
        }),
       
    ],
    optimization: {
        minimizer: [
            // css压缩也可以写到optimization.minimizer里面，效果一样的
            new CssMinimizerPlugin(),
            // 当生产模式会默认开启TerserPlugin，但是我们需要进行其他配置，就要重新写了
            new TerserPlugin({
                parallel: threads, // 开启多进程
            }),
        ],
        // 代码分割配置
        splitChunks: {
            chunks: "all", // 对所有模块都进行分割
            // 其他内容用默认配置即可
        },
    },
    devServer: {
        // host: "localhost",
        // 设置服务入口，localhost:9000就可以直接访问public和dist里面的资源文件了
        static: [path.resolve(__dirname, '../public'), path.resolve(__dirname, '../dist')],
        // 端口
        port: 3000,
        // 开启压缩
        compress: true,
        // 打开默认浏览器
        open: true,
        // 模块热更新
        hot: true
    },
    // 打包模式配置;
    mode: "development",
    // 创建一个map文件, 说明我们每个代码的源码位置, 方便我们在调试过程之中对代码进行修改; 
    devtool: "source-map",
};