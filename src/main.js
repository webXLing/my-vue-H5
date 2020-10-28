/*
 * @Author: web_XL
 * @Date: 2020-06-19 14:07:31
 * @LastEditors: web_XL
 * @LastEditTime: 2020-10-28 11:11:18
 * @Description: main.js
 */
import Vue from 'vue'
import 'lib-flexible'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import 'utils/permission'
import SvgIcon from 'components/SvgIcon'
import '@/icons' // icon
import '@/style/common.scss'
import { Lazyload, Button, Popup, Field, Toast } from 'vant'
import defaultSettings from '@/settings'

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
import { mockXHR } from '../mock'

if (process.env.NODE_ENV === 'production') {
  mockXHR()
}

import * as filters from "@/filters/index";
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

// options 为可选参数，无则不传
Vue.use(Lazyload)
  .use(Button)
  .use(Popup)
  .use(Field)

Vue.component('svg-icon', SvgIcon)

if (process.env.NODE_ENV === 'development' && defaultSettings.vconsole) {
  const VConsole = require('vconsole')
  // eslint-disable-next-line
  const my_console = new VConsole()
}
// var vConsole = new VConsole(option)

Vue.config.productionTip = false
Vue.config.ignoredElements = ['wx-open-launch-weapp']

Vue.prototype.$toast = Toast



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
