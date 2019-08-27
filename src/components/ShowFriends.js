import React, { Component } from 'react';
import axios from 'axios';
import NewReview from './NewReview';
import ShowReviews from './ShowReview';

let baseURL = 'http://www.omdbapi.com/';

class ShowFriends extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>PlaceHolder to ShowFriends</h1>
      </div>
    );
  }
}

export default ShowFriends;
