import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Heading from './components/Heading';
import LandingPage from './components/LandingPage';
import NewMember from './components/NewMember';
import NewDonor from './components/NewDonor';
import Toggle from './components/toggle';

require('dotenv').config();

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='App'>
        <LandingPage />
        <Toggle />
      </div>
    );
  }
}

export default App;
