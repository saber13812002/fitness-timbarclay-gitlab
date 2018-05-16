import _round from "lodash/round";
import store from "../store";

export function renderWeight(kgWeight) {
  const {calculate, unit} = store.getters.weightUnit;
  return `${_round(calculate()(kgWeight), 1)}${unit}`;
}