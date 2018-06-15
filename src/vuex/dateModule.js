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
    [mutations.SET_DATE](state, {startDate}) {
      state.start = startDate;
      state.end = new Date();
    },
    [mutations.PUSH_DATE](state) {
      state.start = moment(state.start).subtract(1, "months").toDate();
    }
  },

  getters: {
    dates(state) {
      return [state.start, state.end];
    }
  }
}