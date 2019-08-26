import React, { Component } from 'react';
import axios from 'axios';

let baseURL = process.env.REACT_APP_BASEURL;

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3003';
} else {
  baseURL = 'https://dashboard.heroku.com/apps/goodtomatoes';
}
class EditMember extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.currentUser.name,
      email: this.props.currentUser.email,
      password: this.props.currentUser.password,
      picture: this.props.currentUser.picture,
      id: this.props.currentUser._id
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    console.log('From EditMember page : ' + this.props.currentUser.name);
  }

  handleChange(event) {
    this.setState({
      [event.currentTarget.name]: event.currentTarget.value,
      [event.currentTarget.email]: event.currentTarget.value,
      [event.currentTarget.password]: event.currentTarget.value,
      [event.currentTarget.picture]: event.currentTarget.value
    });
  }

  async handleSubmit(event) {
    console.log(this.state);
    console.log('Edit Member Handle Submit' + this.props.editThisMember);
    event.preventDefault();
    const response = await axios.put(
      `${baseURL}/members/${this.props.currentUser._id}`,
      this.state
    );
    this.setState({
      name: '',
      email: '',
      password: '',
      picture: ''
    });
    // this.props.getMembers(); //this is a prop coming from app.js, need to create it
    window.location.reload();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='name' />
          <input
            type='text'
            id='name'
            name='name'
            onChange={this.handleChange}
            defaultValue={this.props.currentUser.name}
            placeholder='member name'
          />
          <input
            type='text'
            id='email'
            name='email'
            onChange={this.handleChange}
            defaultValue={this.props.currentUser.email}
            placeholder='member email'
          />

          <input
            type='text'
            id='picture'
            name='picture'
            onChange={this.handleChange}
            defaultValue={this.props.currentUser.picture}
            placeholder='member url picture'
          />
          <input
            type='password'
            id='password'
            name='password'
            onChange={this.handleChange}
            defaultValue={this.props.currentUser.password}
            placeholder='member password'
          />

          <input type='submit' value='Save Changes' />
        </form>
      </div>
    );
  }
}

export default EditMember;
