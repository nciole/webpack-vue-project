import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import 'vue-awesome/icons/flag'
import Icon from 'vue-awesome/components/Icon'


Vue.component('icon', Icon)
Vue.config.productionTip = false
Vue.use(Mint)
Vue.prototype.$axios = axios

new Vue ({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')