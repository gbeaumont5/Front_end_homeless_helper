import React, { Component } from 'react';
import axios from 'axios';


let baseURL = process.env.REACT_APP_BASEURL;

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3003';
} else {
  baseURL = 'https://dashboard.heroku.com/apps/goodtomatoes';
}

// review schema has a createdById which is the member who created it 
class Reviews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reviews: [],

        }
        // this.getFriendReview = this.getFriendReview.bind(this)
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

    checkID() {
        this.state.reviews.map(review => {
            console.log(review._id)
        })
    }

    // getFriendReview(review) {
    //     console.log('Getting profile')
    //     this.setState({
    //         review: review
    //     })
    // }


    render() {
        return (
            <div>
                <h1>Reviews</h1>
                {
                    this.state.reviews.map(review => {
                        if (review.createdByID == this.props.friend._id) {
                            return (
                                <div>
                                    <h2></h2>
                                    <img alt="movie picture" src="" />
                                    <h3>Movie Title</h3>
                                    <p>This is the movie review text</p>
                                </div>
                            )
                        }
                    })
                }
            </div>



        )
    }


}



export default Reviews;