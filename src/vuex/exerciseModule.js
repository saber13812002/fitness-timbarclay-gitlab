import mutations from "./mutations";
import actions from "./actions";
import GoogleApi from "../application/googleApi";

const googleApi = new GoogleApi();

export default {
  state: {
    dataSources: [],
    sessions: [],
    sets: [],

    loadingDataSources: false,
    loadingSessions: false,
    loadingSets: false,

    dataSourcesError: null,
    sessionsError: null,
    setsError: null
  },

  mutations: {
    [mutations.EXERCISE_SOURCES_FETCH_BEGIN](state) {
      state.loadingDataSources = true;
    },
    [mutations.EXERCISE_SOURCES_FETCH_SUCCESS](state, {dataSources}) {
      state.loadingDataSources = false;
      state.dataSources = dataSources;
    },
    [mutations.EXERCISE_SOURCES_FETCH_FAILURE](state, {err}) {
      state.loadingDataSources = false;
      state.dataSourcesError = err;
    },

    [mutations.EXERCISE_SESSIONS_FETCH_BEGIN](state) {
      state.loadingSessions = true;
    },
    [mutations.EXERCISE_SESSIONS_FETCH_SUCCESS](state, {sessions}) {
      state.loadingSessions = false;
      state.sessions = sessions;
    },
    [mutations.EXERCISE_SESSIONS_FETCH_FAILURE](state, {err}) {
      state.loadingSessions = false;
      state.sessionsError = err;
      console.error(err)
    },

    [mutations.EXERCISE_SETS_FETCH_BEGIN](state) {
      state.loadingSets = true;
    },
    [mutations.EXERCISE_SETS_FETCH_SUCCESS](state, {sets}) {
      state.loadingSets = false;
      state.sets = sets;
    },
    [mutations.EXERCISE_SETS_FETCH_FAILURE](state, {err}) {
      state.loadingSets = false;
      state.setsError = err;
    },
  },

  actions: {
    [actions.FETCH_SOURCES](context) {
      context.commit(mutations.EXERCISE_SOURCES_FETCH_BEGIN);
      googleApi.getDataSources()
        .then(dataSources => context.commit(mutations.EXERCISE_SOURCES_FETCH_SUCCESS, {dataSources}))
        .catch(err => context.commit(mutations.EXERCISE_SOURCES_FETCH_FAILURE, {err}));
    },

    [actions.FETCH_SESSIONS](context) {
      context.commit(mutations.EXERCISE_SESSIONS_FETCH_BEGIN);
      googleApi.getSessions(context.rootState.dates.start, context.rootState.dates.end)
        .then(sessions => context.commit(mutations.EXERCISE_SESSIONS_FETCH_SUCCESS, {sessions}))
        .catch(err => context.commit(mutations.EXERCISE_SESSIONS_FETCH_FAILURE, {err}));
    },

    [actions.FETCH_SETS](context) {
      context.commit(mutations.EXERCISE_SETS_FETCH_BEGIN);
      googleApi.getDataSets(context.rootState.dates.start, context.rootState.dates.end)
        .then(sets => context.commit(mutations.EXERCISE_SETS_FETCH_SUCCESS, {sets}))
        .catch(err => context.commit(mutations.EXERCISE_SETS_FETCH_FAILURE, {err}));
    }
  }
}