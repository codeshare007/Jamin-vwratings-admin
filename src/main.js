import Vue from 'vue'
import App from './App.vue'

import router from './modules/router'
import store from './store'
import Api from './modules/api'

Vue.config.productionTip = false
Vue.use(Api, store, router)

import '@/plugins/bootstrap-vue'
import '@/plugins/vuelidate'
import '@/plugins/v-viewer'
import '@/plugins/vue-fontawesome'
import '@/plugins/vue-sidebar-menu'

import '@/assets/scss/main.scss'

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
