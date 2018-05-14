import mutations from "./mutations";
import actions from "./actions";
import GoogleApi from "../application/googleApi";
import {WorkoutSession, Session} from "../application/models/Session";
import {Exercise} from "../application/models/Exercise";
import {Set} from "../application/models/Set";
import * as metric from "../application/models/IntensityMetrics";
import * as stats from "../application/models/DescriptiveStats";
import moment from "moment";
import _minBy from "lodash/minBy";
import _maxBy from "lodash/maxBy";
import _uniq from "lodash/uniq";
import _pick from "lodash/pick";

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
    setsError: null,

    intensityMetric: metric.volumeLoad.id,
    statsType: stats.max.id
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
      const sessionsMin = _minBy(sessions, s => s.start).start;
      const sessionsMax = _maxBy(sessions, s => s.start).start;
      const before = state.sessions.filter(s => moment(s.start).isBefore(moment(sessionsMin)));
      const after = state.sessions.filter(s => moment(s.start).isAfter(moment(sessionsMax)));
      
      state.sessions = [...before, ...sessions, ...after];
      state.lastRequest = new Date().getTime();
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
      const setsMin = _minBy(sets, s => s.start).start;
      const setsMax = _maxBy(sets, s => s.start).start;
      const before = state.sets.filter(s => moment(s.start).isBefore(moment(setsMin)));
      const after = state.sets.filter(s => moment(s.start).isAfter(moment(setsMax)));
      
      state.sets = [...before, ...sets, ...after];
      state.lastRequest = new Date().getTime();
    },
    [mutations.EXERCISE_SETS_FETCH_FAILURE](state, {err}) {
      state.loadingSets = false;
      state.setsError = err;
    },

    [mutations.CLEAR_DATA](state) {
      state.dataSources = [];
      state.sessions = [];
      state.sets = [];

      state.lastRequest = null;

      state.loadingDataSources = false;
      state.loadingSessions = false;
      state.loadingSets = false;

      state.dataSourcesError = null;
      state.sessionsError = null;
      state.setsError = null;
    },

    [mutations.SET_INTENSITY_METRIC](state, {metricId}) {
      state.intensityMetric = metricId;
    },
    [mutations.SET_STATS_TYPE](state, {statsId}) {
      state.statsType = statsId;
    }
  },

  actions: {
    [actions.FETCH_SOURCES](context) {
      context.commit(mutations.EXERCISE_SOURCES_FETCH_BEGIN);
      if(!context.rootState.initialised) return;
      googleApi.getDataSources()
        .then(dataSources => context.commit(mutations.EXERCISE_SOURCES_FETCH_SUCCESS, {dataSources}))
        .catch(err => context.commit(mutations.EXERCISE_SOURCES_FETCH_FAILURE, {err}));
    },

    [actions.FETCH_SESSIONS](context) {
      const {start, end} = context.rootState.dates;
      if(!context.rootState.initialised) return;
      context.commit(mutations.EXERCISE_SESSIONS_FETCH_BEGIN, {start, end});
      googleApi.getSessions(start, end)
        .then(sessions => context.commit(mutations.EXERCISE_SESSIONS_FETCH_SUCCESS, {sessions}))
        .catch(err => context.commit(mutations.EXERCISE_SESSIONS_FETCH_FAILURE, {err}));
    },

    [actions.FETCH_SETS](context) {
      const {start, end} = context.rootState.dates;
      if(!context.rootState.initialised) return;
      context.commit(mutations.EXERCISE_SETS_FETCH_BEGIN, {start, end});
      googleApi.getDataSets(start, end)
        .then(sets => context.commit(mutations.EXERCISE_SETS_FETCH_SUCCESS, {sets}))
        .catch(err => context.commit(mutations.EXERCISE_SETS_FETCH_FAILURE, {err}));
    }
  },

  getters: {
    /**
     * All sessions that fall within the chosen dates
     * @returns {Session[]}
     */
    sessionsByDate(state, getters, root) {
      const {start, end} = root.dates;
      if(!start || !end || !state.sessions.length) {
        return [];
      }
      return state.sessions.filter(s => {
        const startMoment = moment(s.start);
        return startMoment.isSameOrAfter(moment(start)) &&
          startMoment.isSameOrBefore(moment(end))
      });
    },

    /**
     * All sets that fall withing the chosen dates
     * @returns {Set[]}
     */
    setsByDate(state, getters, root) {
      const {start, end} = root.dates;
      if(!start || !end || !state.sets.length) {
        return [];
      }
      return state.sets.filter(s => {
        const startMoment = moment(s.start);
        return startMoment.isSameOrAfter(moment(start)) &&
        startMoment.isSameOrBefore(moment(end))
      });
    },
    
    /**
     * All workout sessions (i.e. sessions with their sets attached) within the chosen dates
     * @returns {WorkoutSession[]}
     */
    workoutSessions(state, getters) {
      return getters.sessionsByDate.map(session => {
        const sets = getters.setsByDate.filter(set => 
          moment(set.start).isSameOrAfter(session.start) &&
            moment(set.end).isSameOrBefore(session.end));
        return new WorkoutSession(session, sets);
      });
    },

    /**
     * All exercises done within the chosen dates
     * @returns {Exercise[]}
     */
    exercises(state, getters) {
      const allExerciseNames = _uniq(state.sets.map(set => set.exerciseName));
      return allExerciseNames.map(exercise => new Exercise(exercise, getters.workoutSessions))
    },

    /**
     * The selected intensity metric. This is the way we're defining the intensity of a set, e.g volume load, resisitance etc
     * @returns {{id: String, name: String, description: String, calculate: (set: Set) => Number}}
     */
    intensityMetric(state) {
      return metric.getById(state.intensityMetric);
    },

    /**
     * The selected stats method. This is the method we're using to reduce the intensity of a set to a single metric, e.g mean, total, max etc
     * @returns {{id: String, name: String, description: String, calculate: (numbers: Number[]) => Number}}
     */
    statsType(state) {
      return stats.getById(state.statsType);
    }
  }
}

export function exerciseReducer(state) {
  return _pick(state, ["dataSources", "sessions", "sets", "lastRequest", "intensityMetric", "statsType"]);
}