import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

import ElementUi from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./sass/style.scss";

import GoogleApi from "./application/googleApi";

GoogleApi.initialiseGoogleApi();

Vue.use(ElementUi);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
