import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import NewMember from './components/NewMember';
import Toggle from './components/toggle';
import ShowSearchResults from './components/ShowSearchResults';
import ShowMovie from './components/ShowMovie';
import FriendsPage from './components/FriendsPage';
import UserMainPage from './components/UserMainPage';

let baseURL = process.env.REACT_APP_BASEURL;

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3003';
} else {
  baseURL = 'https://dashboard.heroku.com/apps/goodtomatoes';
}

require('dotenv').config();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imdbID: '',
      movieSelected: false,
      members: [],
      isLoggedIn: false,
      userID: '',
      email: '',
      password: ''
    };
    this.handleClick = this.handleClick.bind(this);
    this.getMembers = this.getMembers.bind(this);
    this.handleAddMember = this.handleAddMember.bind(this);
    this.deleteMember = this.deleteMember.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }
  async getMembers() {
    const response = await axios(`${baseURL}/members`);
    console.log(response);

    const data = response.data;
    this.setState({
      members: data
    });
    console.log(this.state.members);
  }

  //this handle Change function works alongside the handleSubmit for the log in functionality
  handleChange(event) {
    this.setState({
      [event.currentTarget.name]: event.currentTarget.value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.email);
    console.log(this.state.password);

    try {
      console.log('before', this.state);
      const reqBody = {
        email: this.state.email,
        password: this.state.password
      };
      const response = await axios.post(`${baseURL}/users/login`, reqBody);
      const usercall = await axios.get(
        `${baseURL}/members/password/${this.state.password}`
      );
      const user = usercall.data[0];

      console.log('get ok', response);
      console.log('response data', response.data);
      console.log('user call to password?');

      this.setState({
        email: '',
        password: '',
        isLoggedIn: true,
        userID: user._id
      });
    } catch (err) {
      console.log('login error');
    }

    console.log('is user logged in?', this.state.isLoggedIn);
    console.log('user id is...', this.state.userID);
  }

  //this gets passed on to the NewMember component, which is rendered with the path /Register
  handleAddMember(member) {
    const copyMembers = [...this.state.members, member];
    this.setState({
      members: copyMembers
    });
    console.log(this.state.members);
  }

  handleClick(id) {
    // console.log(id);
    this.setState({
      imdbID: id
    });
    console.log(this.state.imdbID);
  }

  async deleteMember(id) {
    console.log('delete route hit');
    await axios.delete(`${baseURL}/members/${id}`);
    const filteredMembers = this.state.members.filter(member => {
      return member._id !== id;
    });
    this.setState({
      members: filteredMembers
    });
    window.location.reload();
  }

  handleLogOut() {
    this.setState({
      isLoggedIn: false,
      userID: ''
    });
  }

  render() {
    return (
      <div className='App'>
        <Router className='nav'>
          <nav className='blue-grey darken-3 navigation-bar'>
            <a className='logo left' href='/'>
              <img src='/images/tomato.png' /> GoodTomatoes
            </a>
            <div className='right'>
              <Link to='/'>HOME | </Link>
              {this.state.isLoggedIn ? (
                <Link to='/MyAccount'>MY ACCOUNT | </Link>
              ) : (
                <Link to='/NewMember'>REGISTER | </Link>
              )}
              <Link to='/Friends'>MEMBERS </Link>
              {/* Modal Trigger */}

              {this.state.isLoggedIn ? (
                <button
                  className='btn-small right main-login'
                  onClick={this.handleLogOut}
                >
                  Logout
                </button>
              ) : (
                <a
                  className='waves-effect waves-light btn-small right
               modal-trigger main-login'
                  href='#modal1'
                >
                  Login
                </a>
              )}
            </div>
          </nav>
          <Route path='/' exact component={LandingPage} />

          {/* Modal Structure*/}
          <div id='modal1' className='modal modal-fixed-footer'>
            <div className='modal-content'>
              <div className='container'>
                <form onSubmit={this.handleSubmit} className='login-form'>
                  <label htmlFor='email' />
                  <input
                    type='text'
                    id='email'
                    name='email'
                    onChange={this.handleChange}
                    value={this.state.email}
                    placeholder='email'
                  />
                  <label htmlFor='password' />
                  <input
                    type='password'
                    id='password'
                    name='password'
                    onChange={this.handleChange}
                    defaultValue={this.state.password}
                    placeholder='password'
                  />
                  <div className='footer'>
                    <input
                      type='submit'
                      className='modal-close waves-effect waves-green btn-small'
                      value='LOGIN'
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* end of Modal Code*/}

          <Route
            path='/Login'
            render={props => (
              <Login
                {...props}
                logIn={this.logIn}
                isLoggedIn={this.state.isLoggedIn}
                component={Login}
              />
            )}
          />

          <Route
            path='/'
            exact
            render={props => (
              <ShowSearchResults {...props} handleClick={this.handleClick} />
            )}
          />

          <Route path='/User' render={props => <UserMainPage {...props} />} />

          <Route
            path={`/Movies/selected/${this.state.imdbID}`}
            render={props => (
              <ShowMovie
                {...props}
                imdbID={this.state.imdbID}
                userID={this.state.userID}
                isLoggedIn={this.state.isLoggedIn}
              />
            )}
          />

          <Route
            path='/NewMember'
            render={props => (
              <NewMember handleAddMember={this.handleAddMember} />
            )}
          />
          <Route
            path='/Friends'
            render={props => (
              <FriendsPage
                friends={this.props.friends}
                deleteMember={this.deleteMember}
              />
            )}
          />
          <Route
            path='/MyAccount'
            render={props => (
              <UserMainPage
                friends={this.props.friends}
                editMember={this.editMember}
                getMembers={this.getMembers}
                userID={this.state.userID}
              />
            )}
          />
          {/*<Route path='/About' component={About} /> */}
        </Router>
        <footer class='page-footer blue-grey darken-3'>
          <div class='container'>
            <div>
              © 2019 Corey Morrison, Sam Fernandes, Gary Beaumont, & David
              Carrano
              <div>
                <em>
                  Icons made by Good Ware and Smashicons from www.flaticon.com
                </em>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
