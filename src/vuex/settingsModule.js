import mutations from "./mutations";
import actions from "./actions";
import {getById} from "../application/models/OneRepMax";

export default {
  state: {
    oneRepMaxId: "brzycki"
  },
  mutations: {
    [mutations.SET_1_REP_MAX](state, {oneRepMaxId}) {
      state.oneRepMaxId = oneRepMaxId
    }
  },
  getters: {
    oneRepMax(state) {
      return getById(state.oneRepMaxId);
    }
  }
}

export function settingsReducer(state) {
  return state;
}