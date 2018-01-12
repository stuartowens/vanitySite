import { connect } from 'react-redux';
import { toggleResults, setAvailabilityFilter } from '../actions';
import Results from '../components/Results';

const getAvailableResults = (results, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return results;
    case 'SHOW_UNSOLD':
      return results.filter(r => r.available);
    case 'SHOW_SOLD':
      return results.filter(r => !r.available);
  }
};

const mapStateToProps = state => {
  return {
    results: getAvailableResults(state.results, state.availabilityFilter),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onResultClick: id => {
      dispatch(toggleResults(id));
    },
    onAvailibilityFilterClick: filter => {
      dispatch(setAvailabilityFilter(filter));
    },
  };
};

const ResultsContainer = connect(mapStateToProps, mapDispatchToProps)(Results);

export default ResultsContainer;
