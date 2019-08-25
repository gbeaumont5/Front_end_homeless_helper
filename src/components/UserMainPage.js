import React, { Component } from 'react';
import axios from 'axios';


let baseURL = process.env.REACT_APP_BASEURL;
let API_URL = 'http://www.omdbapi.com/?apikey=b01d6b33&i=';

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3003';
} else {
  baseURL = 'https://fathomless-sierra-68956.herokuapp.com';
}

class UserMainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            members: [],
            member: {},
            currentUser: {},
            userReviews: [],
            friends: [],
            movieInfo: []
        }
    }

    async getAllMembers() {
        const response = await axios(`${baseURL}/members`)
        const data = response.data
        this.setState({
            members: data
        })
    }

    async getCurUser() {
        const response = await axios(`${baseURL}/members/5d60038c51440c439607787b`)
        const data = response.data
        this.setState({
            currentUser: data[0]
        })
        console.log('This is me:', this.state.currentUser)
        // console.log('those are my friends': this.state.friends);
        
    }

    async getUserReviews() {
    const response = await axios(
      `${baseURL}/reviews/byUser/5d60038c51440c439607787b`
    );
    const data = response.data;
    this.setState({
      userReviews: data
    });
    console.log('and the user reviews array is:', this.state.userReviews);
    }   

    async getMovieObjects(review) { // to display on each review
        let id = review.imdbID
        const response = await axios(`${API_URL}${id}`)
        let moviePic = response.data.Poster;
        let movieTitle = response.data.Title
            return (
                <a>
                <img src={moviePic} alt={movieTitle} />
                <p>{movieTitle}</p>
                </a>
            )    
        }
    

  componentDidMount() {
    this.getCurUser();
    this.getAllMembers();
    this.getUserReviews();
  }


    render() {
        return (

            <div class="content-wrapper">

                <div class="col s12 m7">
                    <h2 class="header">Welcome Back!</h2>
                    <div class="card horizontal">
                        <div class="card-image">
                            <img src={this.state.currentUser.picture}/>
                        </div>
                        <div class="card-stacked">
                            <div class="card-content">
                                <h5>{this.state.currentUser.name}</h5>
                                <h5>{this.state.currentUser.email}</h5>
                                <button className="btn">Edit</button>
                            </div>
                            <div class="card-action">
                                <a href="#">Delete My Account</a>
                                <br/>
                                <a href="/Friends">See what my friends are saying</a>
                            </div>
                        </div>
                    </div>
                </div>

                <hr />
                
                <h4>My Reviews:</h4>
                
                {this.state.userReviews.map(review => {
                    return (
                    <div>
                       
                        <h6>{review.title} | <span>{review.rating}</span></h6>
                        <blockquote> <em>A review by: </em>{this.state.currentUser.name}</blockquote>
                        <p>{review.reviewNotes}</p>
                        <hr />
                    </div>)     
                })}
            </div>
        )
    }
}
              

export default UserMainPage;
