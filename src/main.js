import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import dayjs from 'dayjs'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
// 自定义指令
import * as directives from '@/directives'
// 组件封装
import components from '@/components'
// 过滤器封装
import * as filters from '@/filters'
// 统一注册过滤器
for (let key in filters) {
  Vue.filter(key, filters[key])
}
// 自定义指令
for (let key in directives) {
  Vue.directive(key, directives[key])
}
// 统一注册组件封装
Vue.use(components)

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

// // 时间过滤器
// Vue.filter('formatTime', (val) => {
//   return dayjs(val).format('YYYY-MM-DD')
// })

new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App),
})
