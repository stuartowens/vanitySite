export const ADD_RESULT = 'ADD_RESULT';
export const TOGGLE_RESULT = 'TOGGLE_RESULT';
export const SET_AVAILABILITY_FILTER = 'SET_AVAILABILITY_FILTER';

export const AvailabilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_SOLD: 'SHOW_SOLD',
  SHOW_UNSOLD: 'SHOW_UNSOLD',
};

export function toggleResults(index) {
  return { type: TOGGLE_RESULT, index };
}

export function setAvailabilityFilter(filter) {
  return { type: SET_AVAILABILITY_FILTER, filter };
}

export function addResult(text) {
  return { type: ADD_RESULT, text };
}
