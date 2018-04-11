import moment from "moment";

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
}