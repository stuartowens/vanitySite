import { combineReducers } from 'redux';
import {
  AvailabilityFilters,
  TOGGLE_RESULT,
  ADD_RESULT,
  SET_AVAILABILITY_FILTER,
} from './actions';
const { SHOW_ALL } = AvailabilityFilters;

const initialState = {
  availabilityFilter: SHOW_ALL,
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
});

export default resultsApp;
