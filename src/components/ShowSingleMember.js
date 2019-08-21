import React, { Component } from 'react';
import axios from 'axios';

let baseURL = 'http://localhost:3003'

if (process.env.NODE_ENV === 'development') {
    baseURL = 'http://localhost:3003';
} else {
    baseURL = 'http://homeless_helper.surge.sh/';
}

class showSingleMember extends Component {
    constructor(props) {
        super(props);
        this.state = {
            member: member
        }
    }

    componentDidMount() {
        this.getSingleMember();
    }

    async getSingleMember() {
        const response = await axios(`${baseURL}/member`)
        const data = response.data;
        this.setState({
            member: data
        })
    }

    render() {
        return (
            <div>
                {this.state.member.map(member => {
                    return (
                        <div key={member._id}>
                            <h3>{member.name}</h3>
                            <img alt="profile picture" src="{member.memberPic}"></img>
                            <p>{member.bio}</p>
                            <p>{member.medicalNotes}</p>
                            <p>{member.skills}</p>
                            <p>Able to work: {member.ableToWork}</p>
                            <p>This member needs: {member.needs}</p>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default showSingleMember;