import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props);
      }
    
      render() {
        return (
            <div>
                <h2>Sign In</h2>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="" placeholder="email" />
                    <input type="password" placeholder="password" />
                    <input type="submit">Login</input>
                </form>
                </div>
        )

    }
}

export default Login;
