module.exports = {
  // 是否使用cdn
  useCDN: true,
  // key是'包名', value是静态资源引入后全局的名称 import Vue from 'vue'
  externals: {
    'vue': 'Vue',
    'vuex': 'Vuex',
    'vue-router': 'VueRouter',
    'axios': 'axios',
    // 必须是ELEMENT，否则会报‘elementUI is not defined’
    'element-ui': 'Element',
   
  },
  CDN: {

    css: [
      'http://cdn.rellal.com/index.css'/*element-ui*/
    ],
    js: [
      'http://cdn.rellal.com/vue.js',
      'http://cdn.rellal.com/vue-router.js',
      'http://cdn.rellal.com/vuex.min.js',
      'http://cdn.rellal.com/index.js',/*element-ui*/
      'http://cdn.rellal.com/axios.min.js',
    ]
  }
}