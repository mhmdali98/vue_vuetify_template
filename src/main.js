import Vue from 'vue'
import axios from 'axios'
import myDirective from 'vue-touch-card-effect';
import VAvatar from "v-avatar";
import VCharts from 'v-charts'

import './plugins/base'
import './plugins/chartist'
import './plugins/vee-validate'
import './plugins/vue-world-map'
import vuetify from './plugins/vuetify'
import i18n from './i18n'
import App from './App.vue'
import router from './router'
import store from './store'
Vue.use(VAvatar);
Vue.use(VCharts)

Vue.directive('touch-card', myDirective);
Vue.config.productionTip = false
axios.defaults.baseURL = process.env.VUE_APP_URL
axios.defaults.headers.get['Accepts'] = 'application/json'

new Vue({
  router,
  store,
  vuetify,
  i18n,

  render: h => h(App)
}).$mount('#app')
