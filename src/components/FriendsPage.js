import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';
import FriendProfile from './FriendProfile';

const baseURL = 'http://localhost:3003';

class FriendsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      friend: {},
      friendID: '',
      showFriend: false
    };
    this.getFriendProfile = this.getFriendProfile.bind(this);
    this.hideFriend = this.hideFriend.bind(this);
  }

  componentDidMount() {
    this.getFriends();
  }

  async getFriends() {
    const response = await axios(`${baseURL}/members`);
    const data = response.data;
    this.setState({
      friends: data
    });
  }

  async getFriendProfile(friend) {
    const response = await axios(`${baseURL}/members/${friend._id}`);
    this.setState({
      friend: friend,
      showFriend: true
    });
    console.log('name' + this.state.friend.name);
    console.log('user id' + this.state.friend._id);
  }

  hideFriend() {
    this.setState({
      showFriend: false
    });
  }

  render() {
    return (
      <div className='container'>
        <h3>Members</h3>
        <div className='row'>
          {this.state.friends.map(friend => {
            return (
              <div className='col s12 m4'>
                <div className='card small'>
                  <div
                    onClick={() => this.getFriendProfile(friend)}
                    className='card-image'
                    key={friend._id}
                  >
                    <img
                      alt='profile picture'
                      className='circle'
                      src={friend.picture}
                    />
                  </div>
                  <span className='card-title'>{friend.name}</span>
                  <div className='card-action'>
                    <div
                      className='btn'
                      onClick={() => this.props.deleteMember(friend._id)}
                    >
                      {' '}
                      Delete
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>


        <FriendProfile friend={this.state.friend} userID={this.state.friend._id}/>

        {this.state.showFriend && (
          <FriendProfile
            friend={this.state.friend}
            showFriend={this.state.showFriend}
            hideFriend={this.hideFriend}
          />
        )}

      </div>
    );
  }
}

export default FriendsPage;
