import {nanosToMillis} from "../timeHelpers";
import _capitalize from "lodash/capitalize";
import _kebabCase from "lodash/kebabCase";

function normaliseName(name) {
  return _capitalize(name.split(".").reverse().join(" ").replace("_", " "));
}

export class Set {
  constructor(setJson) {
    this.exerciseName = normaliseName(setJson.value[0].stringVal);
    this.id = `${setJson.startTimeNanos}-${_kebabCase(this.exerciseName)}`;
    this.start = nanosToMillis(setJson.startTimeNanos);
    this.end = nanosToMillis(setJson.endTimeNanos);

    // TODO I'm pretty sure I should get the definitions from these fields from the datasources endpoint
    this.reps = setJson.value[1].intVal;
    this.duration = setJson.value[2].intVal;
    this.resistance = setJson.value[4].fpVal;
  }
}