import {WorkoutSession} from "./Session";
import {Set} from "./Set";
import _flatMap from "lodash/flatMap";
import _maxBy from "lodash/maxBy";
import _max from "lodash/max";

export class Exercise {
  constructor(name, workoutSessions) {
    this.name = name;
    
    this.sessions = workoutSessions
      .map(session => {
        const exerciseSets = session.sets.filter(set => set.exerciseName === name);
        return new WorkoutSession(session.session, exerciseSets);
      })
      .filter(session => session.sets.length);
  }

  /**
   * Get the maximum resistance ever achieved for this exercise in the timeframe
   * @returns {Set}
   */
  maxResistance() {
    return this._getMaxResistance(_flatMap(this.sessions, session => session.sets));
  }

  /**
   * Get the maximum resistance achieved during the most recent session of the time frame
   * @returns {Set}
   */
  maxResistanceLastSession() {
    return this._getMaxResistance(this._lastSession().sets);
  }

  maxReps() {
    return this._getMaxReps(_flatMap(this.sessions, session => session.sets));
  }

  maxRepsLastSession() {
    return this._getMaxReps(this._lastSession().sets);
  }

  /**
   * Get the highest estimated 1 rep max from any of the sets performed of this exercise
   * @param {(set: Set) => Number} oneRepMaxFunc The 1 rep max function to use
   */
  maxOneRepMax(oneRepMaxFunc) {
    const sets = _flatMap(this.sessions, session => session.sets);
    return _max(sets.map(s => oneRepMaxFunc(s)));
  }

  /**
   * Get the set with the maximum resistance from a collection of sets
   * @returns {Set}
   */
  _getMaxResistance(sets) {
    return _maxBy(sets, set => set.resistance);
  }

  /**
   * Get the set with highest number of reps
   * @param {Set[]} sets 
   * @returns {Set}
   */
  _getMaxReps(sets) {
    return _maxBy(sets, set => set.reps);
  }

  _lastSession() {
    return _maxBy(this.sessions, s => s.session.start.valueOf());
  }
}