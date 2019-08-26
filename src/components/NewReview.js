import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom'

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
      [event.currentTarget.title]: event.currentTarget.title,
      [event.currentTarget.rating]: event.currentTarget.rating,
      [event.currentTarget.reviewNotes]: event.currentTarget.reviewNotes
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const response = await axios.post(`${baseURL}/reviews`, {
      createdByID: this.props.userID,
      imdbID: this.props.movie.imdbID,
      poster: this.props.movie.Poster,
      movieTitle: this.props.movie.Title,
      title: this.state.title,
      rating: this.state.rating,
      reviewNotes: this.state.reviewNotes
    });
    this.setState({
      imdbID: this.props.movie.imdbID,
      title: '',
      reviewNotes: ''
    });
    this.props.handleAddReview(response.data); 
    window.location.reload()
    console.log(this.state.imdbID)
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
            placeholder='1'
          />
          <input
            type='textarea'
            name='reviewNotes'
            onChange={this.handleChange}
            defaultValue={this.state.reviewNotes}
            className="review-textarea"
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
