import mutations from "./mutations";
import actions from "./actions";

export default {
  state: {
    user: null,
    isLoggingIn: false,
    error: null
  },

  mutations: {
    [mutations.LOGOUT](state) {
      state.user = null;
    },
    
    [mutations.LOGIN_BEGIN](state) {
      state.isLoggingIn = true;
    },

    [mutations.LOGIN_SUCCESS](state, {user}) {
      state.isLoggingIn = false;
      state.user = user;
    },
    
    [mutations.LOGIN_FAILURE](state, {err}) {
      state.isLoggingIn = false;
      state.error = err;
    }
  },

  getters: {
    isLoggedIn(state) {
      return !!state.user;
    }
  }
}