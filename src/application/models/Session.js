import moment from "moment";
import _ from "lodash";

export class Session {
  constructor(json) {
    this.id = json.id
    this.name = json.name
    this.description = json.description;
    this.start = moment(+json.startTimeMillis);
    this.end = moment(+json.endTimeMillis);
    this.modified = moment(+json.modifiedTimeMillis);
  }
}

export class WorkoutSession {
  constructor(session, sets) {
    this.session = session;
    this.sets = sets;
  }

  totalSessionIntensity(intensityFunc) {
    return this.sets.reduce((acc, current) => intensityFunc(current) + acc, 0);
  }

  meanSessionIntensity(intensityFunc) {
    return this.totalSessionIntensity(intensityFunc) / this.sets.length;
  }

  maxSessionIntensity(intensityFunc) {
    return _.maxBy(this.sets, s => intensityFunc(s));
  }
}