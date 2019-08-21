import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import NewMember from './components/NewMember';
import NewDonor from './components/NewDonor';
import SearchResults from './components/ShowSearchResults'



import Toggle from './components/toggle';
import showSearchResults from './components/ShowSearchResults';

require('dotenv').config();

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='App'>
        <Router>
          <div className='container'>
            <nav>
              <Link to='/'>Home</Link>
              <Link to='/Login'>Login | My Account</Link>
              <Link to='/NewMember'>Register</Link>
              <Link to='/About'>About</Link>
            </nav>
            <Route path='/' exact component={LandingPage} />
            <Route path='/Login' component={Login} />
            <Route path='/NewMember' component={NewMember} />
            {/*<Route path='/About' component={About} /> */}
          </div>
        </Router>

        <SearchResults />
      </div>
    );
  }
}

export default App;
