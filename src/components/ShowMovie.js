import React, { Component } from 'react';
import axios from 'axios';
import NewReview from './NewReview';
import ShowReviews from './ShowReview';

let baseURL = 'http://www.omdbapi.com/?apikey=b01d6b33&i=';

class ShowMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {},
      reviews: []
    };
    this.handleAddReview = this.handleAddReview.bind(this);
    console.log('this.props.imdbID: ', +this.state.imdbID);
  }

  componentDidMount() {
    this.getMovie();
  }

  async getReviews() {
    const response = await axios(`http://localhost:3003/reviews`);
    const data = response.data;
    this.setState({
      reviews: data
    });
    console.log('getReviews is rendering:', this.state.reviews);
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

  handleAddReview(newReview) {
    const copyReviews = [...this.state.reviews, newReview];
    this.setState({
      reviews: copyReviews
    });
    console.log(
      'handleAddReview added or not? Check it out:',
      this.state.reviews
    );
  }
  render() {
    return (
      <div>
        <div className='row'>
          <div className='col s12 m4'>
            <div className='card'>
              <div className='card-image'>
                <img src={this.state.movie.Poster} />
                <span className='card-title'>{this.state.movie.Title}</span>
              </div>
            </div>
          </div>
          <div className='col s12 m8'>
            <div className='card'>
              <div className='card horizontal'>
                <span className='card-title center'>
                  {this.state.movie.Title}
                </span>
              </div>
              <div className='card-content'>
                <p>{this.state.movie.Plot}</p>
              </div>

              <div className='card-action'>
                <p>
                  Year: {this.state.movie.Year} | Rated:{' '}
                  {this.state.movie.Rated} | Runtime: {this.state.movie.Runtime}
                </p>
              </div>
              <div className='card-action'>
                <p>
                  Genre: {this.state.movie.Genre} | imdbRating:{' '}
                  {this.state.movie.imdbRating}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class='row'>
          <div class='col s12 m4'>
            <div class='card blue-grey darken-1'>
              <div class='card-content white-text'>
                <span class='card-title'>Director</span>
                <p>{this.state.movie.Director}</p>
              </div>
            </div>
          </div>
          <div class='col s12 m4'>
            <div class='card blue-grey darken-1'>
              <div class='card-content white-text'>
                <span class='card-title'>Actors</span>
                <p>{this.state.movie.Actors}</p>
              </div>
            </div>
          </div>
          <div class='col s12 m4'>
            <div class='card blue-grey darken-1'>
              <div class='card-content white-text'>
                <span class='card-title'>Awards</span>
                <p>{this.state.movie.Awards}</p>
              </div>
            </div>
          </div>
        </div>

        <h2>{this.state.movie.Title}</h2>
        <NewReview imdbID={this.props.imdbID} handleAddReview={this.handleAddReview}/>
        <ShowReviews imdbID={this.props.imdbID} />
      </div>
    );
  }
}

export default ShowMovie;
