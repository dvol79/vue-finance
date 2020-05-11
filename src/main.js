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
firebase.initializeApp({
  apiKey: 'AIzaSyAjNKz1AG30eU-0Q2pEnebW5rXErw6OsOk',
  authDomain: 'vue-finance-5632d.firebaseapp.com',
  databaseURL: 'https://vue-finance-5632d.firebaseio.com',
  projectId: 'vue-finance-5632d',
  storageBucket: 'vue-finance-5632d.appspot.com',
  messagingSenderId: '617073120799',
  appId: '1:617073120799:web:7f54f94aa2119b2e29672a',
  measurementId: 'G-GQ253V8DZC'
})

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
