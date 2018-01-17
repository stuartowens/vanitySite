import React from 'react';
import { connect } from 'react-redux';
import { addResult } from '../actions';

let AddResult = ({ dispatch }) => {
  let input;

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          if (!input.value.trim()) {
            return;
          }
          dispatch(addResult(input.value));
          input.value = '';
        }}
      >
        <input
          ref={node => {
            input = node;
          }}
        />
        <button type="submit">Add Result</button>
      </form>
      <h1>I'm HERE!!!!!!!!!!!!!!!!!!!!!!</h1>
    </div>
  );
};

AddResult = connect()(AddResult);

export default AddResult;
