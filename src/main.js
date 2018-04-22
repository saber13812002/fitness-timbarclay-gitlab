import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

import ElementUi from "element-ui";
import locale from "element-ui/lib/locale/lang/en";
import "element-ui/lib/theme-chalk/display.css";
import 'vue-datetime/dist/vue-datetime.css';
import "./sass/fonts.scss";
import "./sass/style.scss";

import GoogleApi from "./application/googleApi";
import mutations from "./vuex/mutations";
import moment from "moment";

GoogleApi.initialiseGoogleApi()
  .then(() => {
    //debugger;
    store.commit(mutations.INIT_COMPLETE)
  });

store.commit(mutations.SET_DATES, {
  dates: [moment().subtract(3, "months").toDate(), new Date()]
})

Vue.use(ElementUi, {locale});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
