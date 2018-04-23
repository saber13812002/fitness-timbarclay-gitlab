import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from "vuex-persist"

import login, {loginReducer} from "./vuex/loginModule";
import dates from "./vuex/dateModule";
import exercise, {exerciseReducer} from "./vuex/exerciseModule";
import mutations from "./vuex/mutations";

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  key: "fitness",
  reducer(state) {
    return {
      login: loginReducer(state.login),
      exercise: exerciseReducer(state.exercise)
    }
  }
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
  plugins: [vuexLocal.plugin]
})
