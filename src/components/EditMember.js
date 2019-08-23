import React, { Component } from 'react';
import axios from 'axios';

let baseURL = 'http://localhost:3003';

class EditMember extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      picture: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    this.props.handleEditMember(response.data); //this is a prop coming from app.js, need to create it
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor='name' />
        <input
          type='text'
          id='name'
          name='name'
          onChange={this.handleChange}
          value={this.props.name}
          placeholder='member name'
        />
        <input
          type='text'
          id='email'
          name='email'
          onChange={this.handleChange}
          value={this.props.email}
          placeholder='member email'
        />

        <input
          type='text'
          id='picture'
          name='picture'
          onChange={this.handleChange}
          value={this.props.picture}
          placeholder='member url picture'
        />
        <input
          type='password'
          id='password'
          name='password'
          onChange={this.handleChange}
          value={this.props.password}
          placeholder='member password'
        />

        <input type='submit' value='Save Changes' />
      </form>
    );
  }
}

export default EditMember;
