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

const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

function createRequestTypes(base) {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    acc[type] = `${base}_${type}`;
    return acc;
  }, {});
}
function action(type, payload = {}) {
  return { type, ...payload };
}
export const ADDRESS = createRequestTypes('ADDRESS');

export const UPDATE_ROUTER_STATE = 'UPDATE_ROUTER_STATE';
export const NAVIGATE = 'NAVIGATE';
export const LOAD_ADDRESSES = 'LOAD_ADDRESSES';
export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE';

export const address = {
  request: name => action(ADDRESS[REQUEST], { name }),
  success: (name, response) => action(ADDRESS[SUCCESS], { name, response }),
  failure: (name, error) => action(ADDRESS[FAILURE], { name, error }),
};

export const updateRouterState = state =>
  action(UPDATE_ROUTER_STATE, { state });
export const navigate = pathname => action(NAVIGATE, { pathname });
export const loadAddresses = (name, requiredFields = []) =>
  action(LOAD_ADDRESSES, { name, requiredFields });
export const resetErrorMessage = () => action(RESET_ERROR_MESSAGE);
