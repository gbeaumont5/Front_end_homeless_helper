import React, { Component } from 'react';
import axios from 'axios';
import toggle from './toggle';
import ShowFriends from './ShowFriends'

let baseURL = process.env.REACT_APP_BASEURL;

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
            userReview: {},
            reviewPhoto: ''
        }
    }

    async getMembers() {
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
        console.log(this.state.currentUser)
    }

    async getUserReviews () {
        const response = await axios(`${baseURL}/reviews/byUser/5d60038c51440c439607787b`)
        const data = response.data
        this.setState({
            userReviews: data
        })
        console.log('and the user reviews array is:', this.state.userReviews);
    }

    componentDidMount() {
        this.getCurUser()
        this.getMembers()
        this.getUserReviews()
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
                            </div>
                        </div>
                    </div>
                </div>

                <hr />
                
                <h2>My Reviews:</h2>


                        
    



                // reviews and ratings
                <div class="flex-container">

                    <div class="reviewbox">
                        <img src="" width="140px" height="120px" alt="" />
                        <p>review text goes here</p>
                        <div>ratings</div>
                    </div>

                </div>


                <hr />
                <ShowFriends currentUser={this.state.currentUser} />

            </div>



        )
    }

}

export default UserMainPage;