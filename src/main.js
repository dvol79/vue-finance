import Vue from 'vue'
import Vuelidate from 'vuelidate'
import M from 'materialize-css'
import App from './App.vue'
import router from './router'
import store from './store'
import VueMeta from 'vue-meta'
import Paginate from 'vuejs-paginate'
import dateFilter from '@/filters/date.filter'
import currencyFilter from '@/filters/currency.filter'
import localizeFilter from '@/filters/localize.filter'
import tooltipDirective from '@/directives/tooltip.directive'
import messagePlugin from '@/plugins/message.plugin'
import titlePlugin from '@/plugins/title.plugin'
import Loader from '@/components/AppLoader'
import './registerServiceWorker'

import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/database'
import fbConfig from './firebaseConfig.local.js'

Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(titlePlugin)
Vue.use(Vuelidate)
Vue.use(VueMeta)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.filter('localize', localizeFilter)
Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)
Vue.directive('tooltip', tooltipDirective)

// 'vue-finance' web app's Firebase initialization
firebase.initializeApp(fbConfig)

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    new Vue({
      M,
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
