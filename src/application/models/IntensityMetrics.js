import _find from "lodash/find";
import _round from "lodash/round";

export const resistance = {
  id: "resistance",
  name: "Resistance",
  description: "The resistance/weight used in the set",
  units: unit => unit.unit,
  stats: ["max", "mean"],
  calculate() {
    return (set, unit) => unit.calculate()(set.resistance);
  }
}

export const volumeLoad = {
  id: "volumeLoad",
  name: "Volume Load",
  description: "A widely used measure of the volume of a set. Calculated using: number of reps * resistance",
  units: unit => unit.unit,
  stats: ["total", "max", "mean"],
  calculate() {
    return (set, unit) => set.reps * unit.calculate()(set.resistance);
  }
}

export const exerciseDensityLoad = {
  id: "exerciseDensityLoad",
  name: "Exercise Density Load",
  description: "A measure of volume that takes time into account. Calculated using: volume load / set duration (in seconds)",
  units: unit => `${unit.unit}/s`,
  stats: ["total", "max", "mean"],
  calculate() {
    return (set, unit) => volumeLoad.calculate()(set, unit) / (set.duration / 1000);
  }
}

export const percentageOf1RepMax = {
  id: "%1rm",
  name: "Percentage of 1 Rep Max",
  description: "The weight of a set as a percentage of your estimated 1 Rep Max for the exercise",
  units: () => "%",
  stats: ["max", "mean"],
  calculate(oneRepMax) {
    return (set, unit) => _round((unit.calculate()(set.resistance) / oneRepMax) * 100);
  }
}

export const all = [resistance, volumeLoad, exerciseDensityLoad, percentageOf1RepMax];

export function getById(id) {
  return _find(all, a => a.id === id);
}