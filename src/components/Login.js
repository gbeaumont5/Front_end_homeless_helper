import React, { Component } from 'react';
import axios from 'axios';

let baseURL = 'http://localhost:3003';

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
      [event.currentTarget.id]: event.currentTarget.value,

    });
   
  }

  async handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.email);
    console.log(this.state.password)
    
    try {
      console.log('before', this.state)
      const reqBody = {
        email: this.state.email,
        password: this.state.password
      };
      const response = await axios.post(`${baseURL}/users/login`, reqBody);

      // const foundUser = response.data;

      console.log('get ok', response)
      console.log('response data', response.data)
      if (response.data.email === this.state.email){
        console.log('login working')
        
        // const response = await axios.get(`${baseURL}/users/email/:id`);
        // const data = response.data
        // console.log(data);
        this.props.logIn(response.data);

        // let user = this.props.userID

        

      }

      } catch (err) {
        console.log('login error')
      } 
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
              id='password'
              onChange={this.handleChange}
              defaultValue={this.state.password}
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
