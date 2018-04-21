import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from "vuex-persist"

import login from "./vuex/loginModule";
import dates from "./vuex/dateModule";
import exercise from "./vuex/exerciseModule";
import mutations from "./vuex/mutations";

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  key: "fitness"
});

export default new Vuex.Store({
  modules: {
    login,
    dates,
    exercise
  },
  state: {
    initialised: false
  },
  mutations: {
    [mutations.INIT_COMPLETE](state) {
      state.initialised = true;
    }
  },
  actions: {

  },
  //plugins: [vuexLocal.plugin]
})
