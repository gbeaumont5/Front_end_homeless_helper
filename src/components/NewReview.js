import React, { Component } from 'react';
import axios from 'axios';

let baseURL = 'http://localhost:3003';

class NewReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createdByID: '',
      title: '',
      rating: null,
      reviewNotes: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    this.props.handleAddReview(response.data); //this is a prop coming from , still need to create at App.js
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className='input-field'>
          <br />
          <br />
          <label htmlFor='name' />

          <input
            type='text'
            id='createdById'
            name='createdById'
            onChange={this.handleChange}
            defaultValue={this.state.createdById}
            placeholder='createdById'
          />
          <input
            type='text'
            id='title'
            name='title'
            onChange={this.handleChange}
            defaultValue={this.state.Title}
            placeholder='Review Title'
          />
          <input
            type='number'
            id='rating'
            name='rating'
            onChange={this.handleChange}
            defaultValue={this.state.rating}
            placeholder='3'
          />
          <input
            type='textarea'
            id='reviewNotes'
            name='reviewNotes'
            onChange={this.handleChange}
            defaultValue={this.state.reviewNotes}
            placeholder='Write your review here'
          />
          <br />
          <input type='submit' className='btn' value='Submit Review' />
        </form>
      </div>
    );
  }
}

export default NewReview;
