import Vue from 'vue'
import Vuex from 'vuex'

import login from "./vuex/loginModule";

Vue.use(Vuex)

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

  }
})
