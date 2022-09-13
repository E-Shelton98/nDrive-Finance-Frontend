// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { createPinia, PiniaVuePlugin } from 'pinia'
import App from './App'
import router from './router'
import VueAxios from 'vue-axios'
import { securedAxiosInstance, plainAxiosInstance } from './backend/axios/index.js'
import './css/main.css'

Vue.config.productionTip = false

const pinia = createPinia()
Vue.use(PiniaVuePlugin)

Vue.use(VueAxios, {
  secured: securedAxiosInstance,
  plain: plainAxiosInstance
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  pinia,
  router,
  components: { App },
  template: '<App/>'
})
