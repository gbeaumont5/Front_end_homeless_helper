import React, { Component } from 'react';
import axios from 'axios';
import toggle from './toggle';

class UserMainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            members: [],
            member: {},
            currentUserId: this.props.currentUserId
        }
    }

    async getMembers() {
        const response = await axios(`${baseURL}/members`)
        const data = response.data
        this.setState({
            members: data
        })

    }

    <Route
    path='/User'
    render={props => (
      <UserMainPage {...props} />
    )}

    render() {
        return (

            <div class="content-wrapper">

                // top row
                <div class="flex-container">
                    <div>
                        <img src="" width="100px" height="200px" alt="" />
                        <h2>Current User Name</h2>
                        <h2>current user email</h2>
                    </div>
                    <div>
                        <button>Button</button>
                    </div>
                </div>



                // reviews and ratings
                <div class="flex-container">

                    <div class="reviewbox">
                        <img src="" width="140px" height="120px" alt="" />
                        <p>review text goes here</p>
                        <div>ratings</div>
                    </div>

                </div>


                // friends
                <div class="flex-container">

                    <div class="friendbox">
                        <img src="" width="140px" height="120px" alt="" />
                        <p>review text goes here</p>
                    </div>

                </div>

            </div>



        )
    }

}

export default UserMainPage;