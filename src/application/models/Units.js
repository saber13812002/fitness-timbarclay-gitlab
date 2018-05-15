import _find from "lodash/find";

export const kilograms = {
  id: "kg",
  name: "Kilograms",
  unit: "kg",
  calculate() {
    return kgWeight => kgWeight;
  }
}

export const pounds = {
  id: "lb",
  name: "Pounds",
  unit: "lbs",
  calculate() {
    return kgWeight => kgWeight / 0.45359237;
  }
}

export const all = [kilograms, pounds];

export function getById(id) {
  return _find(all, a => a.id === id);
}