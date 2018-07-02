import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

import "element-ui/lib/theme-chalk/display.css";
import "./setupElement";
import 'vue-datetime/dist/vue-datetime.css';
import "./sass/style.scss";

import GoogleApi from "./application/googleApi";
import mutations from "./vuex/mutations";
import moment from "moment";

GoogleApi.initialiseGoogleApi()
  .then(() => store.commit(mutations.INIT_COMPLETE));

store.commit(mutations.SET_DATE, {
  startDate: moment().subtract(3, "months").toDate()
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
