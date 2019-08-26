
import React, { Component } from 'react';
import ShowMembers from './ShowSearchResults';

class Toggle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      on: false
    };
  }


  toggle = () => {
    this.setState({
      on: !this.state.on
    });
  };

  render() {
    return (
      <div>
        <button onClick={this.toggle}>Show Results</button>
        {this.state.on && <ShowMembers />}
      </div>
    );
  }
}

export default Toggle;
