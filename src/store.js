import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from "vuex-persist"

import login from "./vuex/loginModule";

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  key: "fitness",
  modules: ["login"]
});

export default new Vuex.Store({
  modules: {
    login
  },
  state: {
    thing: "hello"
  },
  mutations: {
    change(state) {
      state.thing = state.thing.split("").reverse().join("");
    }
  },
  actions: {

  },
  plugins: [vuexLocal.plugin]
})
