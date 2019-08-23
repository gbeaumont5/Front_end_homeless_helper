import React, { Component } from 'react';
import axios from 'axios';
import NewReview from './NewReview'
import ShowReviews from './ShowReview'

let baseURL = 'http://www.omdbapi.com/?apikey=b01d6b33&i=';

class ShowMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {},
      reviews: []
    };
    this.handleAddReview=this.handleAddReview.bind(this)
    console.log('this.props.imdbID: ', +this.state.imdbID);
  }

  componentDidMount() {
    this.getMovie();
  }

  async getReviews() {
    const response = await axios(`http://localhost:3003/reviews`)
    const data = response.data
    this.setState({
      reviews: data
    })
    console.log('getReviews is rendeding:', this.state.reviews);
    
  }

  async getMovie() {
    const response = await axios(`${baseURL}${this.props.imdbID}`);
    console.log('response: ', response);
    const data = response.data;
    console.log('base url: ', `${baseURL}${this.props.imdbID}`);
    console.log('id: ', this.props.imdbID);
    console.log('data: ', data);
    this.setState({
      movie: data
    });
    console.log(this.state.movie.Title);
  }

  handleAddReview (review) {
    const copyReviews = [...this.state.reviews, review];
    this.setState({
      reviews: copyReviews
    });
    console.log('handleAddReview added or not? Check it out:', this.state.reviews);
  }
  render() {
    return (
      <div>
        <h2>{this.state.movie.Title}</h2>
        <NewReview imdbID={this.state.imdbID} />
        <ShowReviews imdbID={this.props.imdbID} />
      </div>
    );
  }

  }





export default ShowMovie;
