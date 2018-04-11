import {nanosToMoment} from "../timeHelpers";
import _ from "lodash";

function normaliseName(name) {
  return _.capitalize(name.split(".").reverse().join(" "));
}

export class Exercise {
  constructor(setJson) {
    this.start = nanosToMoment(setJson.startTimeNanos);
    this.end = nanosToMoment(setJson.endTimeNanos);
    // TODO I'm pretty sure I should get the definitions from these fields from the datasources endpoint
    this.exerciseName = setJson.value[0].stringVal;
    this.reps = setJson.value[1].intVal;
    this.duration = setJson.value[2].intVal;
    this.resistance = setJson.value[4].fpVal;
  }
}