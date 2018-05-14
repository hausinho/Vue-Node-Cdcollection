// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VuePaginate from 'vue-paginate'
import vueResource from 'vue-resource'
import store from './store'
import Api from './services/Api'

import './css/styles.css';
import _ from 'lodash'

Vue.config.productionTip = false

Vue.use(VuePaginate)
Vue.use(vueResource)

export const eventBus = new Vue();


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  Api,
  store,
  components: { App },
  template: '<App/>'
})
