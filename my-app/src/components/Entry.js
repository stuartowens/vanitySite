import React, { Component } from 'react';
// import './Entry.js';
import '../App.css';

function Entry(props) {
  return (
    <div className="Results">
      <h1>Hello Entry {props.text}!</h1>
      <div>{props.children}</div>
      <h1>{props.available ? 'Not Sold Yet' : 'Sorry unavailable'}</h1>
      <button onClick={props.onClick}>Help me! This is my result!</button>
      <button onClick={props.onFilterUnsold}>
        Help me! I only want to see unsold results!
      </button>
      <button onClick={props.onFilterSold}>
        Help me! I only want to see Sold numbers!
      </button>
      <button onClick={props.onFilterAll}>
        Help me! I only want to see All numbers!
      </button>
    </div>
  );
}

export default Entry;
