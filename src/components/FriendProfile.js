import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';
import Reviews from './Reviews';

const baseURL = 'http://localhost:3003';

class FriendProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: []
    };
  }

  render() {
    return (
      <div className='row'>
        <div className='col s12 m6 center'>
          <div className='card'>
            <div className='card-image'>
              <img alt='pic' src={this.props.friend.picture} />
              <h2>{this.props.friend.name}</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FriendProfile;
