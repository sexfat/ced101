const path = require('path'); 
const webpack  = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //打包css
const HtmlWebpackPlugin = require('html-webpack-plugin'); //打包html
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin'); //清除舊檔案



module.exports = {
    entry: {
       index : './src/app.js',   // chunk name
       aboutus : './src/app2.js'   // chunk name
    },          // 入口文件
    output: {
        // path: path.resolve(__dirname, 'app/js/'), // 資料夾路徑
        path: path.resolve(__dirname, 'dist'), // 資料夾路徑
        filename: '[name].js'  //name chunk
      },           // 出口文件
      module: {
        rules: [{
            // 格式
            test: /\.(sass|scss|css)$/,
            //順序是由下到上 css > style
            use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                      publicPath: './dist'
                    }
                  },
                // 'style-loader',//跟MiniCssExtractPlugin 會衝突所以要關掉
                'css-loader',
                'sass-loader'
            ],
        },
        {
          test: /\.(js)$/,
          exclude: /(node_modules)/,

          use: [{
              loader: 'babel-loader',
              options: {
                  presets: ['@babel/preset-env']
              }
          }],
          include: path.resolve(__dirname, 'src'),
      }
    ]

    }, // 處裡對應模組
    plugins: [
        //清除舊檔案
        new CleanWebpackPlugin(),

        new MiniCssExtractPlugin({
            filename: "./[name].css" //output 打包出來的檔案名稱  //name chunk
        }),
        new HtmlWebpackPlugin({
            //來源
            chunks : ['index'],  //選擇注入資源 chunk
            inject  : 'body', //預設<body> js </body>  head or body
            template : './src/index.html',
            //目的地
            filename : 'index.html'
          }),
          new HtmlWebpackPlugin({
            //來源
            chunks : ['aboutus'],  //選擇注入資源 chunk
            inject  : 'body',
            template : './src/aboutus.html',
            //目的地
            filename : 'aboutus.html'
          }),
          //全域載入jq
          new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
          })

    ], // 服務器配置
    devServer: {
        contentBase: './dist',
        compress: true,// html 壓縮
        host: 'localhost',
        port: 3000,
        index: 'index.html',
        open: true

    }, 
     //解決vue jquery 路徑
     resolve: {
      alias: {
         vue: 'vue/dist/vue.js'
      }
    },
    //mode: 'production'      // 開發模式配置 development  / production 產品上線
}