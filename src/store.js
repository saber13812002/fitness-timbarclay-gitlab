import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from "vuex-persist"

import login, {loginReducer} from "./vuex/loginModule";
import dates from "./vuex/dateModule";
import exercise, {exerciseReducer} from "./vuex/exerciseModule";
import settings, {settingsReducer} from "./vuex/settingsModule";
import mutations from "./vuex/mutations";

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  key: "superset",
  reducer(state) {
    return {
      login: loginReducer(state.login),
      exercise: exerciseReducer(state.exercise),
      settings: settingsReducer(state.settings)
    }
  }
});

export default new Vuex.Store({
  modules: {
    login,
    dates,
    exercise,
    settings
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
