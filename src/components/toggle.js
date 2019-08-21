import React, { Component } from 'react'
import ShowSearchResults from './ShowSearchResults'

class Toggle extends Component {
    constructor(props) {
        super(props)
        this.state = {
        on: false,
    }
}

    toggle = () => {
        this.setState({
            on: !this.state.on
        })
    }

    render() {
        return (
            <div>
                <button onClick={this.toggle}>Show Members</button>
                {this.state.on && (
                    <ShowSearchResults />
                )}
            </div>
        )
    }
}

export default Toggle;