import React, { Component } from 'react';
import axios from 'axios';


const baseURL = 'http://localhost:3003';

// review schema has a createdById which is the member who created it 
class Reviews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            friends: [],
            friend: {}
        }
        this.getFriendReview = this.getFriendReview.bind(this)
    }

    componentDidMount() {
        this.getReviews();
    }

    async getReviews() {
        const response = await axios(`${baseURL}/reviews`)
        const data = response.data
        this.setState({
            reviews: data
        })

    }

    getFriendReview(review) {
        console.log('Getting profile')
        this.setState({
            review: review
        })
    }


    render() {
        return (
            <div>
                <h2></h2>
                <img alt="movie picture" src="" />
                <h3>Movie Title</h3>
                <p>This is the movie review text</p>
            </div>

        )
    }


}



export default Reviews;