import moment from "moment";

const nanoFactor = 1000000;

export function nanosToMillis(nanos) {
  return nanos / nanoFactor;
}

export function millisToNanos(millis) {
  return millis * nanoFactor;
}

export function nanosToMoment(nanos) {
  return moment(nanosToMillis(nanos));
}

export function momentToNanos(date) {
  return millisToNanos(date.valueOf());
}

export function dateToNanos(date) {
  return millisToNanos(date.getTime());
}

export function isValidDate(date) {
  return !isNaN(new Date(date).getTime());
}