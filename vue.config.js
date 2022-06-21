const { defineConfig } = require('@vue/cli-service')
const cdnConfig = require('./cdn.config.js');


module.exports = defineConfig({
	lintOnSave:false,  /*关闭语法检查*/
  transpileDependencies: true,
     publicPath:'',
     productionSourceMap:false,
     
      configureWebpack: {
     

     

    // 生产环境注入CDN
    externals: cdnConfig.useCDN ? cdnConfig.externals : {},
  
    optimization: {
            splitChunks: {
                chunks: "all",          //async异步代码分割 initial同步代码分割 all同步异步分割都开启
                 minSize: 1000,         //字节 引入的文件大于30kb才进行分割
                // minChunks: 2,           //模块至少使用次数
                // maxAsyncRequests: 25,    //同时加载的模块数量最多是5个，只分割出同时引入的前5个文件
                 maxInitialRequests: 3,  //首页加载的时候引入的文件最多3个
                automaticNameDelimiter: '-', //缓存组和生成文件名称之间的连接符
                // name: true,                  //缓存组里面的filename生效，覆盖默认命名
                cacheGroups: {
                    components: {
                        name: " components",
                        test: /[\\/]src[\\/]components[\\/]/,
                        test: /[\\/]src[\\/]components[\\/]/,

                        priority: -10
                    },
                    libs:{
                      name:'libs',
                       test: /[\\/]libs[\\/]/,
                         priority: -10
                    }
                 

           
                
                  
                }
            }
        }





    },

  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
        chunks: ['chunk-vendors','chunk-common','index'],
        CDN: cdnConfig.useCDN ? cdnConfig.CDN : null
    }

}
 
  

})
