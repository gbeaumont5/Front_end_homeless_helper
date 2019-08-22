import React, { Component } from 'react'
import axios from 'axios'

const baseURL = 'http://localhost:3003';

class FriendsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            friends: []
        }
    }

    componentDidMount() {
        this.getFriends();
    }

    async getFriends() {
        const response = await axios(`${baseURL}/members`)
        const data = response.data
        this.setState({
            friends: data
        })

    }


    render() {
        return (
            <div>
                <h3>My Friends</h3>
                <div class='row'>
                    {this.state.friends.map(friend => {
                        return (
                            <div key={friend._id}>
                                <h5>{friend.name}</h5>
                                <img alt="profile picture" src="{friend.picture}"></img>

                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}





export default FriendsPage