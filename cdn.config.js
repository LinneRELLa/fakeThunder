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
    'moment': 'moment',
    'less': 'less',
    'qs':'Qs',
    'three':'{FontLoader,TextGeometry,OrbitControls,Scene,PerspectiveCamera,WebGLRenderer,MeshBasicMaterial,BoxGeometry,Mesh,AxesHelper,PlaneGeometry,MeshLambertMaterial,AmbientLight,SpotLight,Vector2,Color,SpotLightHelper,CameraHelper,Vector3}',
  },
  CDN: {

    css: [
      'http://cdn.rellal.com/index.css'/*element-ui*/
    ],
    js: [
      'https://cdn.rellal.com/three.module.cus.js',
      'http://cdn.rellal.com/vue.js',
      'http://cdn.rellal.com/vue-router.js',
      'http://cdn.rellal.com/vuex.min.js',
      'http://cdn.rellal.com/index.js',/*element-ui*/
      'http://cdn.rellal.com/axios.min.js',
      'http://cdn.rellal.com/moment.js',
      'http://cdn.rellal.com/less.js',
      'http://cdn.rellal.com/qs.js'
    ]
  }
}