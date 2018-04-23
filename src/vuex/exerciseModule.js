import mutations from "./mutations";
import actions from "./actions";
import GoogleApi from "../application/googleApi";
import {WorkoutSession} from "../application/models/Session";
import {Exercise} from "../application/models/Exercise";
import moment from "moment";
import _minBy from "lodash/minBy";
import _maxBy from "lodash/maxBy";
import _uniq from "lodash/uniq";

const googleApi = new GoogleApi();

export default {
  state: {
    dataSources: [],
    sessions: [],
    sets: [],

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
    },
    [mutations.EXERCISE_SESSIONS_FETCH_SUCCESS](state, {sessions}) {
      state.loadingSessions = false;
      const sessionsMin = _minBy(sessions, s => s.start.valueOf()).start;
      const sessionsMax = _maxBy(sessions, s => s.start.valueOf()).start;
      const before = state.sessions.filter(s => s.start.isBefore(sessionsMin));
      const after = state.sessions.filter(s => s.start.isAfter(sessionsMax));
      
      state.sessions = [...before, ...sessions, ...after];
      state.lastRequest = new Date();
    },
    [mutations.EXERCISE_SESSIONS_FETCH_FAILURE](state, {err}) {
      state.loadingSessions = false;
      state.sessionsError = err;
    },

    [mutations.EXERCISE_SETS_FETCH_BEGIN](state, {start, end}) {
      state.loadingSets = true;
    },
    [mutations.EXERCISE_SETS_FETCH_SUCCESS](state, {sets}) {
      state.loadingSets = false;
      const setsMin = _minBy(sets, s => s.start.valueOf()).start;
      const setsMax = _maxBy(sets, s => s.start.valueOf()).start;
      const before = state.sets.filter(s => s.start.isBefore(setsMin));
      const after = state.sets.filter(s => s.start.isAfter(setsMax));
      
      state.sets = [...before, ...sets, ...after];
      state.lastRequest = new Date();
    },
    [mutations.EXERCISE_SETS_FETCH_FAILURE](state, {err}) {
      state.loadingSets = false;
      state.setsError = err;
    },
    [mutations.CLEAR_DATA](state) {
      dataSources = [];
      sessions = [];
      sets = [];

      lastRequest = null;

      loadingDataSources = false;
      loadingSessions = false;
      loadingSets = false;

      dataSourcesError = null;
      sessionsError = null;
      setsError = null;
    }
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
    sessionsByDate(state, getters, root) {
      const {start, end} = root.dates;
      if(!start || !end || !state.sessions.length) {
        return [];
      }
      return state.sessions.filter(s => {
        return s.start.isSameOrAfter(moment(start)) &&
        s.start.isSameOrBefore(moment(end))
      });
    },

    setsByDate(state, getters, root) {
      const {start, end} = root.dates;
      if(!start || !end || !state.sets.length) {
        return [];
      }
      return state.sets.filter(s =>
        s.start.isSameOrAfter(moment(start)) &&
        s.start.isSameOrBefore(moment(end)));
    },
    
    workoutSessions(state, getters) {
      return getters.sessionsByDate.map(session => {
        const sets = getters.setsByDate.filter(set =>
          set.start.isSameOrAfter(session.start) &&
          set.end.isSameOrBefore(session.end));
        return new WorkoutSession(session, sets);
      });
    },

    exercises(state, getters) {
      const allExerciseNames = _uniq(state.sets.map(set => set.exerciseName));
      return allExerciseNames.map(exercise => new Exercise(exercise, getters.workoutSessions))
    }
  }
}