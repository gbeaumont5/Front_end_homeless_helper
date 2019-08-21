import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Heading from './components/Heading';
import LandingPage from './components/LandingPage';
import NewMember from './components/NewMember';
import NewDonor from './components/NewDonor';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='App'>
        <LandingPage />
      </div>
    );
  }
}

export default App;
