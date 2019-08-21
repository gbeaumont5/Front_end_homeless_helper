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
        fetch(`http://www.omdbapi.com/?apikey=b01d6b33&s=batman`)
        .then(response => response.json())
        .then(data => {
          this.setState({
            results: data
          })
        })
      }
        
      
    

      render() {
          return(
              <div>
                  {this.state.results.Title}
              </div>
          )
      }
}

export default showSearchResults;