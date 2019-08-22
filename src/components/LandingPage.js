import React, { Component } from 'react';
import axios from 'axios';
import SearchResults from '../components/ShowSearchResults';
import toggle from './toggle';

class LandingPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Good Tomatoes</h1>

        <SearchResults />
      </div>
    );
  }
}
export default LandingPage;
