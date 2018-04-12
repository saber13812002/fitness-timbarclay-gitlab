import {nanosToMoment} from "../timeHelpers";
import _ from "lodash";

function normaliseName(name) {
  return _.capitalize(name.split(".").reverse().join(" ").replace("_", " "));
}

export class Set {
  constructor(setJson) {
    this.exerciseName = normaliseName(setJson.value[0].stringVal);
    this.id = `${setJson.startTimeNanos}-${_.kebabCase(this.exerciseName)}`;
    this.start = nanosToMoment(setJson.startTimeNanos);
    this.end = nanosToMoment(setJson.endTimeNanos);

    // TODO I'm pretty sure I should get the definitions from these fields from the datasources endpoint
    this.reps = setJson.value[1].intVal;
    this.duration = setJson.value[2].intVal;
    this.resistance = setJson.value[4].fpVal;
  }

  static volumeLoad(set) {
    return set.reps * set.resistance;
  }

  static exerciseDensityLoad(set) {
    return Set.volumeLoad(set) / (set.duration / 1000);
  }
}