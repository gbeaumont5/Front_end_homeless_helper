import React, { Component } from 'react';
import axios from 'axios';
import toggle from './toggle';
import ShowFriends from './ShowFriends';
import EditMember from './EditMember';

let baseURL = process.env.REACT_APP_BASEURL;

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3003';
} else {
  baseURL = 'https://fathomless-sierra-68956.herokuapp.com';
}

class UserMainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      members: [],
      member: {},
      currentUser: {},
      userReviews: [],
      friends: [],
      edit: false
    };
    this.editMember = this.editMember.bind(this);
    this.hideFriend = this.hideFriend.bind(this);
    // this.state.currentUser = this.state.currentUser.bind(this);
  }

  async getMembers() {
    const response = await axios(`${baseURL}/members`);
    const data = response.data;
    this.setState({
      members: data
    });
  }

  async getCurUser() {
    const response = await axios(`${baseURL}/members/${this.props.userID}`);
    const data = response.data;
    this.setState({
      currentUser: data[0]
      // friends: data[0][friends]
    });
    console.log('This is me:', this.state.currentUser);
    // console.log('those are my friends': this.state.friends);
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

  async editMember(id) {
    console.log(id);
    const response = await axios.get(`${baseURL}/members/${id}`);
    const editThisMember = response.data;
    this.setState(prevState => ({
      editThisMember: editThisMember,
      edit: true
    }));
    console.log(editThisMember);
  }

  hideFriend() {
    this.setState({
      showFriend: false
    });
  }

  componentDidMount() {
    this.getCurUser();
    this.getMembers();
    this.getUserReviews();
    console.log(this.props.userID);
  }

  render() {
    return (
      <div className='container'>
        <div className='content-wrapper'>
          <div className='col s12 m7'>
            <h2 className='header'>Welcome Back!</h2>
            <div className='card horizontal'>
              <div className='card-image'>
                <img src={this.state.currentUser.picture} />
              </div>
              <div className='card-stacked'>
                <div className='card-content'>
                  <h5>{this.state.currentUser.name}</h5>
                  <h5>{this.state.currentUser.email}</h5>

                  <button
                    className='btn'
                    onClick={() => {
                      //   console.log(this.state.currentUser._id);
                      this.editMember(this.state.currentUser._id);
                    }}
                  >
                    Edit
                  </button>
                </div>
                <div className='card-action'>
                  <a href='#'>Delete My Account</a>
                </div>
              </div>
            </div>
          </div>

          <hr />
          {this.state.edit && (
            <EditMember
              editThisMember={this.state.editThisMember}
              getMembers={this.props.getMembers}
              currentUser={this.state.currentUser}
            />
          )}

          <h4>My Reviews:</h4>
          <br />


          {this.state.userReviews.map(review => {
            return (
              <div>
                <img
                  className='review-pix left'
                  src={review.poster}
                  alt={review.movieTitle}
                />
                <h6>
                  <strong>{review.movieTitle}</strong>
                </h6>
                <h6 className='left'>
                  {review.title} | <span>{review.rating}</span>
                </h6>
                <blockquote>
                  {' '}
                  <em>A review by: </em>
                  {this.state.currentUser.name}
                </blockquote>
                <p className='review-text'>{review.reviewNotes}</p>
                <hr />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default UserMainPage;
