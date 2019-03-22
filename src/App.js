
import React, { Component } from 'react';
import {
  withRouter,
  Route,
  Switch,
} from 'react-router-dom'
// import logo from './logo.svg';
import './App.css';
import Home from './components/Home'
import LoginForm from './components/LoginForm'
import Dashboard from './components/Dashboard'
import API from "./API";



class App extends Component {

  constructor(props) {
    super(props);
      this.state = {
        currentUser: {},
        owed_by_tabs: [],
        owed_to_tabs: [],
        payment: []
      }
  }

    login = user => {
      localStorage.setItem("token", user.token);
      this.setState({ currentUser: user.username });
    };

    logout = () => {
      localStorage.removeItem("token");
      this.setState({ currentUser: "" });
    };


    componentDidMount() {
      // debugger
      API.validate().then(userData => {
        if (userData.error) {
          this.logout();
        } else {
          this.login(userData);
          this.props.history.push("/dashboard");
        }
      })
    }

    render() {
      return (
        <div className="App">
              <Route exact path="/" component= {routerProps => (
                  <Home login={this.login}{...routerProps}/> 
                )} />
              <Route exact path="/log-in" component={routerProps => (
                <LoginForm login={this.login} {...routerProps} />
              )}/>
            <Route exact path="/dashboard" component={routerProps => (
                <Dashboard logout={this.logout} currentUser={this.state.currentUser}{...routerProps} />
              )}/>
        </div>
      );
    }
}



export default withRouter(App);
