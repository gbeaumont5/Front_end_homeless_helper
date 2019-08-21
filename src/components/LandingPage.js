import React, { Component } from 'react';
import axios from 'axios';

class LandingPage extends Component {
  constructor(props) {
    super(props);
  }

  //   createNewMember()

  render() {
    return (
      <div>
        <h1>Brighter Tomorrow</h1>
        <h3>Helping people take charge of their lives</h3>
        <div>
          <h4>Mission Statement</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe
            ipsam consectetur non, enim voluptatum repellendus porro doloremque,
            dolor sequi incidunt nisi odio ipsum delectus quis eum quo cumque
            blanditiis possimus.
          </p>
          <button onClick={() => this.createNewMember()}>ADMIN</button>
        </div>
      </div>
    );
  }
}
export default LandingPage;
