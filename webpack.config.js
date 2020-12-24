const path = require('path'); 
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
       index : './src/app.js' 
    },          // 入口文件
    output: {
        // path: path.resolve(__dirname, 'app/js/'), // 資料夾路徑
        path: path.resolve(__dirname, 'dist'), // 資料夾路徑
        filename: '[name].js'
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
        }]

    }, // 處裡對應模組
    plugins: [
        new MiniCssExtractPlugin({
            filename: "./[name].css" //output 打包出來的檔案名稱
        })
    ],            // 對應的插件
    // devServer: {},           // 服務器配置
    mode: 'production'      // 開發模式配置 development  / production 產品上線
}