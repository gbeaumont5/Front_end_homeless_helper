import React, { Component } from 'react';
import axios from 'axios';
require('dotenv').config();

let baseURL = 'http://localhost:3003';
let API_URL = 'http://www.omdbapi.com/';

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3003';
} else {
  baseURL = 'http://good_tomatoes.surge.sh/';
}

class ShowSearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      search: '',
      loading: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      search: event.target.value,
      movieSelected: true
    });
  }

  handleSubmit(event) {
    this.setState({
      loading: true
    });
    fetch(`http://www.omdbapi.com/?apikey=b01d6b33&s=${this.state.search}`)
      .then(response => response.json())
      .then(data =>
        // console.log(data))
        {
          this.setState({
            results: data.Search,
            loading: false
          });
          console.log(this.state.results);
          console.log();
        }
      );
    event.preventDefault();
  }

  // componentDidMount() {
  //     this.setState({
  //       loading: true
  //     })
  //     fetch(`http://www.omdbapi.com/?apikey=b01d6b33&t=${this.state.search}`)
  //     .then(response => response.json())
  //     .then(data =>
  //       // console.log(data))
  //       {
  //       this.setState({
  //         results: data,
  //         loading: false
  //       })
  //       console.log(this.state.results)
  //     })
  //   }

  render() {
    return (
      <div className='container'>
        <form onSubmit={this.handleSubmit}>
          <input
            type='text'
            value={this.state.search}
            onChange={this.handleChange}
            placeholder='What Movie or Tv Show are you looking for?'
            className='center'
          />
          <input type='submit' value='ok' className='btn' />
        </form>
        {
      
          <div className='main-display'>
            {this.state.loading
              ? 'loading...'
              : this.state.results.map(result => {
                  return (
                    <div className='col s12 m6 l4 ' key={result.imdbID}>
                      <a
                        onClick={() => {
                          this.props.handleClick(result.imdbID);
                          this.props.history.push(
                            `/movies/selected/${result.imdbID}`
                          );
                        }}
                      >
                        {' '}
                        <div className='card'>
                          <div className='card-image'>
                            <img src={result.Poster} alt={result.Title} />
                          </div>
                          <div className='card-content'>
                            <h4 className='card-title'>{result.Title}</h4>
                            <p>
                              {result.Type} release year: {result.Year}
                            </p>
                          </div>
                        </div>
                      </a>
                    </div>
                  );
                })}
          </div>
  
        }
      </div>
    );
  }
}

export default ShowSearchResults;
