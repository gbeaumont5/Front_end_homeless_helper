import React, { Component } from 'react';
import axios from 'axios';

class NewReview extends Component {
    super(props)
    state = {
        createdByID: '',
        imdbID: this.props.imdbID,
        title: '',
        rating: null,
        reviewNotes: '',
    }

    handleChange(event) {
        this.setState({
          [event.currentTarget.createdByID]: event.currentTarget.createdByID,
          [event.currentTarget.imdbID]: event.currentTarget.imdbID,
          [event.currentTarget.title]: event.currentTarget.title,
          [event.currentTarget.rating]: event.currentTarget.rating,
          [event.currentTarget.reviewNotes]: event.currentTarget.reviewNotes
        });
      }
    
      async handleSubmit(event) {
        event.preventDefault();
        const response = await axios.post(`${baseURL}/reviews`, {
            createdByID: this.state.createdByID,
            imdbID: this.props.imdbID,
            title: this.state.title,
            rating: this.state.rating,
            reviewNotes: this.state.reviewNotes
        });
        this.setState({
            createdByID: '',
            imdbID: this.props.imdbID,
            title: '',
            rating: null,
            reviewNotes: ''
        });
        this.props.handleAddMember(response.data); //this is a prop coming from , still need to create at App.js
      }

    render (
        return (
            <div>
            <form onSubmit={this.handleSubmit}>
            <br />
            <br />
            <label htmlFor='name' />

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
            </div>
        )
    )
}
