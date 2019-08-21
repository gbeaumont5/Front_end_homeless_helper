import React, { Component } from 'react';
import axios from 'axios';

let baseURL = 'http://localhost:3003'

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3003';
} else {
  baseURL = 'http://good_tomatoes.surge.sh/';
}

class showMembers extends Component {
    constructor(props) {
      super(props);
      this.state = {
        members: []
      }
    }

    componentDidMount() {
        this.getMembers();
      }
    
      async getMembers() {
        const response = await axios(`${baseURL}/members`)
        const data = response.data;
        this.setState({
          members: data
        })
      }

      render() {
          return(
              <div>
                  {this.state.members.map(member => {
                      return(
                          <div key={member._id}>
                              <h3>{member.name}</h3>
                              <img alt="profile picture" src="{member.memberPic}"></img>
                          </div>
                      )
                  })}
              </div>
          )
      }
}

export default showMembers;