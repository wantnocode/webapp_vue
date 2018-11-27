const path = require('path');    //path 模块提供了一些工具函数，用于处理文件与目录的路径。
const HtmlWebpackPlugin = require('html-webpack-plugin');   //构建html文件
const CleanWebpackPlugin = require('clean-webpack-plugin');  // 清理构建目录下的文件
const webpack = require('webpack');       //webpack打包工具
const VueLoaderPlugin = require('vue-loader/lib/plugin');         // vue-loader 编译vue文件
const compiler = require('vue-template-compiler')            // 模板函数编译 与vue-loader配合使用
    
module.exports = {
      entry: {       //入口
        "app":"./src/index.js"
      },
      module:{            //处理项目中的不同类型的模块。
        rules:[      // rules 各种规则(数组类型) 每个规则可以分为三部分 - 条件(condition)，结果(result)和嵌套规则(nested rule)
          {
            test:/\.css/,
            use: ['style-loader', 'css-loader']   // style-loader 和css-loader 编译css处理
          },
          {
            test: /\.vue$/,
            loader: 'vue-loader'         //vue-loader 编译vue模块
          },
          {
            test:/\.(png|jpe?j|gif|svg)(\?.*)?$/,
                loader:'url-loader',
                options:{
                    limit:10000,
                    name:'img/[name].[ext]?[hash]'
                }
          }
        ]
      },
      devtool: 'inline-source-map',   //生曾map 映射对应代码  方便错误查询
      devServer:{
        contentBase: './dist',    // 告诉服务从哪提供代码内容(静态文件这么使用)
        hot:true    //hot模式开启 
      },
      plugins:[
        // new CleanWebpackPlugin(['dist']),  // 告诉清理插件的目录
        new HtmlWebpackPlugin({            // 构建html
           filename:'index.html',      //文件名
             title:'my-vue-cli',            //title
             template:'./index.html',       //参照模板样式
        }),
        new webpack.HotModuleReplacementPlugin(),  //热模块替换开启
        new VueLoaderPlugin()                 //vue-loader插件开启
      ],
      output: {        //出口
        filename: 'index.js',    //文件名
        path: path.resolve(__dirname, 'dist'),   //路径
        publicPath:""        //srcript 引入路径
      },
      mode:"development",
      resolve:{
            //引入路径是不用写对应的后缀名
            extensions: ['.js', '.vue', '.json'],
            alias:{
                //正在使用的是vue的运行时版本，而此版本中的编译器时不可用的，我们需要把它切换成运行时 + 编译的版本
                'vue$':'vue/dist/vue.esm.js',
                //用@直接指引到src目录下
                '@': path.resolve(__dirname,'./src'),
            }
      },
     
};