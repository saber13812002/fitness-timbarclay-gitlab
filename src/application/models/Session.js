import {Set} from "./Set";
import moment from "moment";
import _ from "lodash";

/**
 * A single workout session. This will generally be a single trip to the gym
 */
export class Session {
  constructor(json,) {
    this.id = json.id
    this.name = json.name
    this.description = json.description;
    this.start = moment(+json.startTimeMillis);
    this.end = moment(+json.endTimeMillis);
    this.modified = moment(+json.modifiedTimeMillis);
  }
}

/**
 * An object containing both a workout session and the list of sets that took place in it.
 * Note this class is used to represent both a full workout session (containing multiple sets of various exercises)
 * and a single exercise session, where the sets are filtered to just a specific exercise we're interested in
 */
export class WorkoutSession {
  constructor(session, sets) {
    this.session = session;
    this.sets = sets;
  }

  // Note the functions below probably only really make sense when all sets are of the same exercise. Otherwise they're not really comparable
  /**
   * The sum of the intensities of the included sets
   * @param {(set: Set) => Number} intensityFunc 
   * @returns {Number}
   */
  totalSessionIntensity(intensityFunc) {
    return this.sets.reduce((acc, current) => intensityFunc(current) + acc, 0);
  }

  /**
   * The mean of the intensities of the included sets
   * @param {(set: Set) => Number} intensityFunc 
   */
  meanSessionIntensity(intensityFunc) {
    return this.totalSessionIntensity(intensityFunc) / this.sets.length;
  }

  /**
   * The set that represented the highest intensity based on the passed in intensity function
   * @param {(set: Set) => Number} intensityFunc 
   * @returns {Set}
   */
  maxSessionIntensity(intensityFunc) {
    return _.maxBy(this.sets, s => intensityFunc(s));
  }

  /**
   * The set that represented the lowest intensity based on the passed in intensity function
   * @param {(set: Set) => Number} intensityFunc 
   * @returns {Set}
   */
  minSessionIntensity(intensityFunc) {
    return _.minBy(this.sets, s => intensityFunc(s));
  }

  /**
   * Returns an ohlc object defined by the sets in a WorkoutSession.
   * @param {(set: Set) => Number} intensityFunc,
   * @returns {{open: Set, high: Set, low: Set, close: Set}}
   */
  sessionIntensityOhlc(intensityFunc) {
    if(!this.sets.length) {
      return {open: null, high: null, low: null, close: null};
    }

    return {
      open: this.sets[0],
      high: this.maxSessionIntensity(intensityFunc),
      low: this.minSessionIntensity(intensityFunc),
      close: _.last(this.sets)
    };
  }
}