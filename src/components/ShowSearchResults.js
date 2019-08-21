import React, { Component } from 'react';
import axios from 'axios';
require('dotenv').config();

let baseURL = 'http://localhost:3003'
let API_URL = 'ttp://www.omdbapi.com/'

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3003';
} else {
  baseURL = 'http://good_tomatoes.surge.sh/';
}

class showSearchResults extends Component {
    constructor(props) {
      super(props);
      this.state = {
        results:[],
        search: ''
      }
    }


    componentDidMount() {
        // fetch(`${API_URL}/?apikey=${dotenv}&t=batman`)
        fetch(`http://www.omdbapi.com/?apikey=b01d6b33&s=batman`)
        .then(response => response.json())
        .then(data => 
          // console.log(data))
          {
          this.setState({
            results: data.Search
          })
          console.log(this.state.results)
        })
      }
        
      
    

      render() {
          return(
              <div>
                <div class="row">
                {this.state.results.map(movie => {
                  return (
                  <div class="col s12 m6 l4">
                    <div class="card" key={movie.imdbID}>
                      <div class="card-image">
                        <img src={movie.Poster} alt={movie.Title} />
                        
                      </div>
                      <div class="card-content">
                        <h4 class="card-title">{movie.Title}</h4>
                        <p>{movie.Type} release year: {movie.Year}</p>
                      </div>
                    </div>
                  </div>

                )
              })}
                </div>
              
 
              </div>
          )
      }
}

export default showSearchResults;