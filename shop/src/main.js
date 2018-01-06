// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import store from './store'
import App from './App'
import router from './router'
import '@/assets/css/app'
import '@/assets/img/common.svg'
import apiConfig from '../config/api.config'
import 'font-awesome/css/font-awesome.min.css'

// import axios
import Axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false
Vue.use(VueAxios, Axios)
// Vue.use(Vuex)
Axios.defaults.baseURL = apiConfig.baseUrl
sync(store, router)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
