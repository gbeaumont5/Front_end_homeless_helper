import React, { Component } from 'react'
import axios from 'axios'

const baseURL = 'http://localhost:3003';

class ShowReviews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reviews: []
        }
        this.getAuthor=this.getAuthor.bind(this)
        this.getReviews=this.getReviews.bind(this)
        console.log("Do we have this props coming in???" + this.props.imdbID) //yes
    }

    componentDidMount() {
        this.getReviews();
        console.log(this.state.reviews);
        
    }

    async getReviews() {
        const response = await axios(`${baseURL}/reviews/${this.props.imdbID}`)
        const data = response.data
        this.setState({
            reviews: data
        })
        console.log("reviews is showing?", this.state.reviews);
    }

    async getAuthor(memberID) {
        const response = await axios(`${baseURL}/members/${memberID}`)
        const data = response.data
        return data.name;
    }



    render() {
        return (
            <div>
                <h3>Reviews</h3>
                    <div className="container">
                       {this.state.reviews.map(review => {
                           return (
                           <div >
                           <strong>{review.title}</strong>| Rating: {review.rating} of 5 <br/>
                           <p>{review.reviewNotes}</p>
                           <p>...</p>
                           </div>
                           
                           )
                       })}
                    </div>

            </div>
        )
    }
}

export default ShowReviews