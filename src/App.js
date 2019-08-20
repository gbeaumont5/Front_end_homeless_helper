import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='App'>
        <h1>Homeless Helper</h1>
        <h3>Helping people take charge of their lives</h3>
      </div>
    );
  }
}

export default App;
