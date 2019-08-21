import React, { Component } from 'react';
import axios from 'axios';

let baseURL = 'http://localhost:3003'

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3003';
} else {
  baseURL = 'http://good_tomatoes.surge.sh/';
}

class showSearchResults extends Component {
    constructor(props) {
      super(props);
      this.state = {
        results: {},
        search: ''
      }
    }


    componentDidMount() {
        fetch(`http://www.omdbapi.com/?apikey=b01d6b33&t=batman`)
        .then(response => response.json())
        .then(data => 
          // console.log(data))
          {
          this.setState({
            results: data
          })
          console.log(this.state.results)
        })
      }
        
      
    

      render() {
          return(
              <div>
                {this.state.results.Title}
                  {/* {this.state.results.Search.map(result => {
                    return(
                      <div key={result.imdbID}>
                      <h1>{result.Title}</h1>
                      </div>
                    )
                  })} */}
              </div>
          )
      }
}

export default showSearchResults;