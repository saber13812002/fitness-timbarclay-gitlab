export const resistance = {
  id: "resistance",
  name: "Resistance",
  description: "The resistance/weight used in the set",
  units: "kg",
  calculate(set) {
    return set.resistance;
  }
}

export const volumeLoad = {
  id: "volumeLoad",
  name: "Volume Load",
  description: "A widely used measure of the volume of a set. Calculated using: number of reps * resistance",
  units: "kg",
  calculate(set) {
    return set.reps * set.resistance;
  }
}

export const exerciseDensityLoad = {
  id: "exerciseDensityLoad",
  name: "Exercise Density Load",
  description: "A measure of volume that takes time into account. Calculated using: volume load / set duration (in seconds)",
  units: "kg/s",
  calculate(set) {
    return volumeLoad.calculate(set) / (set.duration / 1000);
  }
}

/* export const percentageOf1RepMax = {
  id: "%1rm",
  name: "Percentage of 1 Rep Max",
  description: "The weight of a set as a percentage of your estimated 1 Rep Max for the exercise",
  units: "%",
  calculate(set) {
    // TODO
    return 0;
  }
} */

export const all = [resistance, volumeLoad, exerciseDensityLoad/* , percentageOf1RepMax */];

export function getById(id) {
  return _.find(all, a => a.id === id);
}