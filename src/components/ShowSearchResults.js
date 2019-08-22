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
        search: '',
        loading: false
      }
      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
      this.setState({
        search: event.target.value
      })
    }

    handleSubmit(event) {
      this.setState({
        loading: true
      })
      fetch(`http://www.omdbapi.com/?apikey=b01d6b33&t=${this.state.search}`)
      .then(response => response.json())
      .then(data => 
        // console.log(data))
        {
        this.setState({
          results: data,
          loading: false
        })
        console.log(this.state.results)
      })
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
          let results = this.state.results.Title
          const loadResults = this.state.loading ? "loading..." : results 
          return(
              <div>
                <form onSubmit={this.handleSubmit}>
                  <label>Search
                    <input type="text" value={this.state.search} onChange={this.handleChange}/>
                  </label>
                  <input type="submit" value="Submit"/>
                </form>
                {loadResults}
              </div>
          )
      }
}

export default showSearchResults;