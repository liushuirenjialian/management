import 'babel-polyfill'// 兼容IE9
import 'es6-promise/auto'// 兼容IE9
import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import echarts from 'echarts'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // 权限控制
import VueQuillEditor from 'vue-quill-editor'
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor)
Vue.use(ElementUI, { zhLocale })

Vue.config.productionTip = false

Vue.prototype.$echarts = echarts

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
