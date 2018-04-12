import mutations from "./mutations";
import actions from "./actions";
import GoogleApi from "../application/googleApi";
import {WorkoutSession} from "../application/models/Session";
import {Exercise} from "../application/models/Exercise";
import moment from "moment";
import _ from "lodash";

const googleApi = new GoogleApi();

export default {
  state: {
    dataSources: [],
    sessions: [],
    sets: [],
    
    // These were the start and end dates at the point data was last fetched so we 
    // can avoid refetching data when we don't need to
    sessionsStart: null,
    sessionsEnd: null,
    setsStart: null,
    setsEnd: null,

    lastRequest: null,

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

    [mutations.EXERCISE_SESSIONS_FETCH_BEGIN](state, {start, end}) {
      state.loadingSessions = true;
      state.sessionsStart = start;
      state.sessionsEnd = end;
    },
    [mutations.EXERCISE_SESSIONS_FETCH_SUCCESS](state, {sessions}) {
      state.loadingSessions = false;
      state.sessions = sessions;
      state.lastRequest = new Date();
    },
    [mutations.EXERCISE_SESSIONS_FETCH_FAILURE](state, {err}) {
      state.loadingSessions = false;
      state.sessionsError = err;
    },

    [mutations.EXERCISE_SETS_FETCH_BEGIN](state, {start, end}) {
      state.loadingSets = true;
      state.setsStart = start;
      state.setsEnd = end;
    },
    [mutations.EXERCISE_SETS_FETCH_SUCCESS](state, {sets}) {
      state.loadingSets = false;
      state.sets = sets;
      state.lastRequest = new Date();
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
      const {start, end} = context.rootState.dates;
      context.commit(mutations.EXERCISE_SESSIONS_FETCH_BEGIN, {start, end});
      googleApi.getSessions(start, end)
        .then(sessions => context.commit(mutations.EXERCISE_SESSIONS_FETCH_SUCCESS, {sessions}))
        .catch(err => context.commit(mutations.EXERCISE_SESSIONS_FETCH_FAILURE, {err}));
    },

    [actions.FETCH_SETS](context) {
      const {start, end} = context.rootState.dates;
      context.commit(mutations.EXERCISE_SETS_FETCH_BEGIN, {start, end});
      googleApi.getDataSets(start, end)
        .then(sets => context.commit(mutations.EXERCISE_SETS_FETCH_SUCCESS, {sets}))
        .catch(err => context.commit(mutations.EXERCISE_SETS_FETCH_FAILURE, {err}));
    }
  },

  getters: {
    workoutSessions(state) {
      return state.sessions.map(session => {
        const sets = state.sets.filter(set =>
          set.start.isSameOrAfter(session.start) &&
          set.end.isSameOrBefore(session.end));
        return new WorkoutSession(session, sets);
      });
    },

    exercises(state, getters) {
      const allExerciseNames = _.uniq(state.sets.map(set => set.exerciseName));
      return allExerciseNames.map(exercise => new Exercise(exercise, getters.workoutSessions))
    }
  }
}