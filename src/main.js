import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store/index';
import './assets/styles/tailwind.css';
import PortalVue from 'portal-vue'
// import { makeServer } from "./server";
import Axios from 'axios'

import AppLayout from '@/layouts/AppLayout';
import EmptyLayout from '@/layouts/EmptyLayout';

Vue.component('app-layout', AppLayout);
Vue.component('empty-layout', EmptyLayout);

const token = localStorage.getItem('token')
if (token) {
  Axios.defaults.headers.common['Authorization'] = token
}

Vue.directive('focus', {
  // When the bound element is inserted into the DOM...
  inserted: function (el) {
    // Focus the element
    el.focus()
  }
})

Vue.use(PortalVue)
Vue.config.productionTip = false;

if (process.env.NODE_ENV === "development") {
  // makeServer()
}

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
