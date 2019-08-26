import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';


const baseURL = 'http://localhost:3003';

class FriendProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      userReviews: []
    };
    this.getUserReviews=this.getUserReviews.bind(this)
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
    this.getUserReviews()
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
        <div className='col s12 m6 center'>
          {this.state.userReviews.map(review => {
           return (
             <div key={review._id}>
             <img className="review-pix-friends left circle" src={review.poster} alt={review.movieTitle} />
             <br />
             <h6><strong>{review.movieTitle}</strong></h6>
             <br/>
             <h6 className="left">{review.title} | <span>{review.rating} of 5</span></h6>
             <br/>
             <p className="review-text">{review.reviewNotes}</p>
             <hr/>
             </div>
            )})}
        </div>
      </div>
    )
  }
}

export default FriendProfile;
