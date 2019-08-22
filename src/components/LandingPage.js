import React, { Component } from 'react';
import axios from 'axios';
import SearchResults from '../components/ShowSearchResults'

class LandingPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Good Tomatoes</h1>

        <form>
        <input type="text" placeholder="What Movie or Tv Show are you looking for?" class="center"/>
        <input type="submit" value="ok" class="btn"/>
        </form>

        <SearchResults />
      </div>
    );
  }
}
export default LandingPage;
