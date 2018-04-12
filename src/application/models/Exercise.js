import {WorkoutSession} from "./Session";
import {Set} from "./Set";
import _ from "lodash";

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
    return this._getMaxResistance(_.flatMap(this.sessions, session => session.sets));
  }

  /**
   * Get the maximum resistance achieved during the most recent session of the time frame
   * @returns {Set}
   */
  maxResistanceLastSession() {
    const lastSession = _.maxBy(this.sessions, s => s.session.start.valueOf());
    return this._getMaxResistance(lastSession.sets);
  }

  _getMaxResistance(sets) {
    const allLoads = sets.map(set => set.resistance);
    return _.maxBy(sets, set => set.resistance);
  }
}