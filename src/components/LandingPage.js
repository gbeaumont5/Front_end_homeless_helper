import React, { Component } from 'react';
import axios from 'axios';
import ShowSearchResults from './ShowSearchResults';

import toggle from './toggle';

class LandingPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>
          G
          <span>
            <img src='images/eyeglasses.png' />
          </span>
          dTomat
          <span>
            <img src='/images/tomato_2.png' />
          </span>
          es
        </h1>
      </div>
    );
  }
}
export default LandingPage;
