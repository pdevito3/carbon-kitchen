import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store/index';
import './assets/styles/tailwind.css';
import PortalVue from 'portal-vue'
// import { makeServer } from "./server";

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
