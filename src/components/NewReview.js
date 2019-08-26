import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

let baseURL = process.env.REACT_APP_BASEURL;

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3003';
} else {
  baseURL = 'https://dashboard.heroku.com/apps/goodtomatoes';
}

class NewReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createdByID: this.props.userID,
      title: '',
      rating: null,
      reviewNotes: '',
      redirect: false,
      rerouteLink: '/movies/'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    console.log(this.props.userID);
  }

  handleChange(event) {
    this.setState({
      [event.currentTarget.id]: event.currentTarget.value
    });
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };

  async handleSubmit(event) {
    event.preventDefault();

    console.log('new review ID', this.state.createdByID);
    console.log('new review imbd', this.state.imdbID);
    console.log('new review title', this.state.title);
    console.log('new review rating', this.state.rating);
    const response = await axios.post(`${baseURL}/reviews/new`, {
      createdByID: this.props.userID,
      imdbID: this.props.movie.imdbID,
      movieTitle: this.props.movie.Title,
      poster: this.props.movie.Poster,
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
    this.setRedirect();
    console.log(this.props.imdbID);
  }

  render() {
    return (
      <div className='container'>
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
            placeholder='Rating'
          />
          <input
            type='text'
            id='reviewNotes'
            name='reviewNotes'
            onChange={this.handleChange}
            defaultValue={this.state.reviewNotes}
            className='review-textarea'
            placeholder='Write your review here'
          />
          <br />

          <input type='submit' className='btn' value='Submit Review' />
        </form>
        {this.state.redirect && <Redirect to={`/`} />}
      </div>
    );
  }
}

export default NewReview;
