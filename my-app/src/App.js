import React, { Component } from 'react';
import logo from './logo.svg';
import ResultsContainer from './containers/ResultsContainer';
import AddResult from './containers/AddResult';
import './App.css';

const App = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Welcome to React</h1>
    </header>
    <AddResult />
    <ResultsContainer />
  </div>
);

export default App;
