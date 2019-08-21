import React, { Component } from 'react';
import axios from 'axios';
const baseURL = "http://localhost:3003"

class NewMember extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name:'',
            email: '',
            bio: '',
            memberPic: '',
            medicalNotes: '',
            skills: '',
            ableToWork: true,
            needs: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.currentTarget.name]: event.currentTarget.value,
            [event.currentTarget.email]: event.currentTarget.value,
            [event.currentTarget.bio]: event.currentTarget.value,
            [event.currentTarget.memberPic]: event.currentTarget.value,
            [event.currentTarget.medicalNotes]: event.currentTarget.value,
            [event.currentTarget.skills]: event.currentTarget.value,
            [event.currentTarget.ableToWork]: event.currentTarget.value,
            [event.currentTarget.needs]: event.currentTarget.value,
        })
    }

    async handleSubmit (event) {
        event.preventDefault()
        const response = await axios.post(`${baseURL}/holidays`, { 
            name: this.state.name,
            email: this.state.email,
            bio: this.state.bio,
            memberPic: this.state.memberPic,
            medicalNotes: this.state.medicalNotes,
            skills: this.state.skills,
            ableToWork: this.state.ableToWork,
            needs: this.state.needs
        })
        this.setState({ 
            name: '',
            email: '',
            bio: '',
            memberPic: '',
            medicalNotes: '',
            skills: "",
            ableToWork: 'checked',
            needs: ''

    })
        this.props.handleAddMember(response.data) //this is a prop coming from app.js
    }


    render () {
        return (
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="name"></label>
            <input type="text" id="name" name="name" onChange={this.handleChange} value={this.state.name} placeholder="member name"/>
            <input type="text" id="email" name="email" onChange={this.handleChange} value={this.state.email} placeholder="member email"/>
            <input type="text" id="bio" name="bio" onChange={this.handleChange} value={this.state.bio} placeholder="member bio"/>
            <input type="text" id="memberPic" name="memberPic" onChange={this.handleChange} value={this.state.memberPic} placeholder="member picture url"/>
            <input type="text" id="medicalNotes" name="medicalNotes" onChange={this.handleChange} value={this.state.medicalNotes} placeholder="medical notes"/>
            <input type="text" id="skills" name="skills" onChange={this.handleChange} value={this.state.skills} placeholder="skills"/>
            <input type="text" id="needs" name="needs" onChange={this.handleChange} value={this.state.needs} placeholder="member name"/>
            <input type="checkbox" id="needs" name="needs" onChange={this.handleChange} value={this.state.needs} placeholder="member name"/>

            <input type="submit" value="Add Member"/>
          </form>
        )
      }
}

export default NewMember;
