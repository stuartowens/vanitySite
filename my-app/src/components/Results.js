import React from 'react';
import Entry from './Entry.js';
import AddResult from '../containers/AddResult';
import '../App.css';

const Results = ({ results, onResultClick, onAvailibilityFilterClick }) => (
  <div>
    <div className="Results">
      {results.map((result, i) => {
        return (
          <Entry
            key={i}
            {...result}
            onClick={() => onResultClick(i)}
            onFilterUnsold={() => onAvailibilityFilterClick('SHOW_UNSOLD')}
            onFilterSold={() => onAvailibilityFilterClick('SHOW_SOLD')}
            onFilterAll={() => onAvailibilityFilterClick('SHOW_ALL')}
          >
            <h3>Welcome to Entry {result.text}</h3>
          </Entry>
        );
      })}
    </div>
    <AddResult />
  </div>
);

export default Results;
