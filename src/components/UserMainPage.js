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
    const response = await axios(`${baseURL}/members/5d60038c51440c439607787b`);
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
      `${baseURL}/reviews/byUser/5d60038c51440c439607787b`
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

  componentDidMount() {
    this.getCurUser();
    this.getMembers();
    this.getUserReviews();
  }

  render() {
    return (
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

        <h4>My Reviews:</h4>

        {this.state.userReviews.map(review => {
          return (
            <div>
              <h6>
                {review.title} | <span>{review.rating}</span>
              </h6>
              <blockquote>
                {' '}
                <em>A review by: </em>
                {this.state.currentUser.name}
              </blockquote>
              <p>{review.reviewNotes}</p>
              <hr />
            </div>
          );
        })}

        {this.state.edit && (
          <EditMember
            editThisMember={this.state.editThisMember}
            getMembers={this.props.getMembers}
            currentUser={this.state.currentUser}
          />
        )}
      </div>
    );
  }
}

export default UserMainPage;
