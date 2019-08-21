import React, { Component } from 'react';
import axios from 'axios';

class LandingPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Good Tomatoes</h1>
        <h3>What To Watch?</h3>
        <div className='search-bar' />
      </div>
    );
  }
}
export default LandingPage;
