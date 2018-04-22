import mutations from "./mutations";
import moment from "moment";

const defaultStart = moment().subtract(3, "months").toDate();
const defaultEnd = new Date();

export default {
  state: {
    start: defaultStart,
    end: defaultEnd
  },

  mutations: {
    [mutations.SET_DATES](state, {dates}) {
      debugger;
      state.start = dates[0];
      state.end = dates[1];
    }
  },

  getters: {
    dates(state) {
      return [state.start, state.end];
    }
  }
}