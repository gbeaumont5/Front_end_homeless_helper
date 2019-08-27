import React, { Component } from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';
let baseURL = process.env.REACT_APP_BASEURL;

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3003';
} else {
  baseURL = 'http://goodtomatoes-backend.herokuapp.com';
}

class NewMember extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      picture: '',
      redirect: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };

  handleChange(event) {
    this.setState({
      [event.currentTarget.name]: event.currentTarget.value,
      [event.currentTarget.email]: event.currentTarget.value,
      [event.currentTarget.password]: event.currentTarget.value,
      [event.currentTarget.picture]: event.currentTarget.value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const response = await axios.post(`${baseURL}/members`, {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      picture: this.state.picture
    });
    this.setState({
      name: '',
      email: '',
      password: '',
      picture: ''
    });
    this.props.handleAddMember(response.data);
    this.setRedirect();
  }

  render() {
    return (
      <div className='container'>
        <form onSubmit={this.handleSubmit}>
          <br />
          <br />
          <label htmlFor='name' />
          <input
            type='text'
            id='name'
            name='name'
            onChange={this.handleChange}
            value={this.state.name}
            placeholder='your name'
          />
          <input
            type='text'
            id='email'
            name='email'
            onChange={this.handleChange}
            value={this.state.email}
            placeholder='your email'
          />
          <input
            type='text'
            id='picture'
            name='picture'
            onChange={this.handleChange}
            value={this.state.picture}
            placeholder='a url for your picture'
          />
          <input
            type='password'
            id='password'
            name='password'
            onChange={this.handleChange}
            value={this.state.needs}
            placeholder='password'
          />
          <br />

          <input type='submit' class='btn' value='Add Member' />
        </form>
        {this.state.redirect && <Redirect to='/' />}
      </div>
    );
  }
}

export default NewMember;
