import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.currentTarget.id]: event.currentTarget.value
    });
    // console.log('handle change');
    // console.log(event.currentTarget.value);
  }

  async handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.email);
    //Not sure where to put this ter

    // this.setState({email: '', password: ''})
  }

  render() {
    return (
      <div id='modal'>
        <div id='modal-textbox' className='login container'>
          <h3>Account Login</h3>
          <form onSubmit={this.handleSubmit} className='login-form'>
            <label htmlFor='email' />
            <input
              type='text'
              id='email'
              onChange={this.handleChange}
              value={this.state.email}
              placeholder='email'
            />
            <label htmlFor='password' />
            <input
              type='password'
              id='username'
              onChange={this.handleChange}
              value={this.state.password}
              placeholder='password'
            />
            <input type='submit' value='LOGIN' className='btn' />
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
