import React, { Component } from 'react';
import axios from 'axios';

let baseURL = 'http://www.omdbapi.com/?apikey=b01d6b33&i=';

class ShowMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
    console.log('this.props.imdbID: ', +this.state.imdbID);
  }

  componentDidMount() {
    this.getMovie();
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
  }

  render() {
    return (
      <div>
        <h2>On the Show Movie Page!!!</h2>
      </div>
    );
  }
}

export default ShowMovie;
