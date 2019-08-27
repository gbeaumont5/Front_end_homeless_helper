import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';

let baseURL = process.env.REACT_APP_BASEURL;

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3003';
} else {
  baseURL = 'http://goodtomatoes-backend.herokuapp.com/';
}

class FriendProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      userReviews: [],
      showFriend: false
    };
    this.getUserReviews = this.getUserReviews.bind(this);
    this.addDefaultSrc = this.addDefaultSrc.bind(this);
    this.hideFriend = this.hideFriend.bind(this);
  }

  hideFriend() {
    this.setState({
      showFriend: false
    });
  }

  async getUserReviews() {
    const response = await axios(
      `${baseURL}/reviews/byUser/${this.props.userID}`
    );
    const data = response.data;
    this.setState({
      userReviews: data
    });
    console.log('and the user reviews array is:', this.state.userReviews);
  }

  componentDidUpdate() {
    this.getUserReviews();
  }

  addDefaultSrc(event) {
    event.target.src =
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
  }

  render() {
    return (
      <div className='container'>
        {this.props.userID ? (
          <div>
            <div className='row'>
              <div className='col s12 m6 center'>
                <div className='card'>
                  <div className='card-image'>
                    <img
                      alt='pic'
                      src={this.props.friend.picture}
                      onError={this.addDefaultSrc}
                    />
                    <h2>{this.props.friend.name}</h2>
                    <div className='card-action'>
                      <button
                        className='btn show-friend'
                        onClick={
                          this.state.hideFriend
                        }
                      >
                        Hide Friend
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col s12 m6 center'>
              {this.state.userReviews.map(review => {
                return (
                  <div key={review._id}>
                    <img
                      className='review-pix-friends left circle'
                      src={review.poster}
                      alt={review.movieTitle}
                    />
                    <br />
                    <h6>
                      <strong>{review.movieTitle}</strong>
                    </h6>
                    <br />
                    <h6 className='left'>
                      {review.title} | <span>{review.rating} of 5</span>
                    </h6>
                    <br />
                    <p className='review-text'>{review.reviewNotes}</p>
                    <hr />
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <p>Pick a Friend to see their reviews!</p>
        )}
      </div>
    );
  }
}

export default FriendProfile;
