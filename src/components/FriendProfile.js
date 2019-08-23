import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';
import Reviews from './Reviews';

const baseURL = 'http://localhost:3003';

class FriendProfile extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="row">
                <div>
                    <h2>{this.props.friend.name}</h2>
                    <img alt="pic" src={this.props.friend.picture} />
                </div>
                <div>
                    <Reviews friend={this.props.friend} />
                </div>

            </div>


        )
    }
}


export default FriendProfile
