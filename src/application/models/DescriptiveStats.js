export const total = {
  id: "total",
  name: "Total",
  description: "The sum total of the set intensities",
  calculate(numbers) {
    return numbers.reduce((acc, cur) => acc + cur);
  }
}

export const max = {
  id: "max",
  name: "Maximum",
  description: "The maximum set intensity",
  calculate(numbers) {
    return Math.max(...numbers);
  }
}

export const mean = {
  id: "mean",
  name: "Mean",
  description: "The mean average of the set intensities: (total / number)",
  calculate(numbers) {
    return total.calculate(numbers) / numbers.length;
  }
}

export const all = [total, max, mean];

export function getById(id) {
  return _.find(all, a => a.id === id);
}