import { combineReducers } from 'redux';
import * as ActionTypes from '../actions';
import merge from 'lodash';
import paginate from './paginate';
import {
  AvailabilityFilters,
  TOGGLE_RESULT,
  ADD_RESULT,
  SET_AVAILABILITY_FILTER,
} from '../actions';
const { SHOW_ALL } = AvailabilityFilters;

function entities(
  state = { availabilityFilter: SHOW_ALL, addresses: {}, results: [] },
  action
) {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities);
  }

  return state;
}

// Updates error message to notify about the failed fetches.
function errorMessage(state = null, action) {
  const { type, error } = action;

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null;
  } else if (error) {
    return action.error;
  }

  return state;
}

function router(state = { pathname: '/' }, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_ROUTER_STATE:
      return action.state;
    default:
      return state;
  }
}

const initialState = {
  availabilityFilter: SHOW_ALL,
  errorMessage: "",
  router: {},
  addresses: [],
  results: [
    {
      text: '1800-BailBond',
      available: true,
    },
  ],
};
function availabilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_AVAILABILITY_FILTER:
      return action.filter;
    default:
      return state;
  }
}

function results(state = [], action) {
  switch (action.type) {
    case ADD_RESULT:
      return [
        ...state,
        {
          text: action.text,
          date: Date(),
          available: true,
        },
      ];
    case TOGGLE_RESULT:
      return state.map((result, index) => {
        if (index === action.index) {
          return Object.assign({}, result, {
            available: !result.available,
          });
        }
        return result;
      });
    default:
      return state;
  }
}

const resultsApp = combineReducers({
  availabilityFilter,
  results,
  errorMessage,
  router,
});

export default resultsApp;
