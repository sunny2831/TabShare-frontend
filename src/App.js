
import React, { Component } from 'react';
import {
  withRouter,
  Route
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
      this.setState({ currentUser: user },() => {
        this.getOwedByTabs()
        this.getOwedToTabs()
      })
    };

    logout = () => {
      localStorage.removeItem("token");
      this.setState({ currentUser: ""});
      this.setState({owed_by_tabs: []})
      this.setState({owed_to_tabs: []})
      this.setState({usersOweYou: []})
      this.setState({youOweUsers: []})
    };


    componentDidMount() {
      // console.log("app has mounted")
      // debugger
      API.validate().then(userData => {
        // debugger
        if (userData.error) {
          this.logout();
        } else {
          this.login(userData)
          // this.getOtherUsers()
          // this.getOwedToTabs()
          this.props.history.push("/dashboard");
        }
      })
    }

    getOwedToTabs = () => {
      fetch(`http://localhost:3000/owed_to_tabs`, {
        method: 'GET',
        headers: {'Content-Type': "application/json",
        'Authorization': localStorage.token}
      })
      .then(response => response.json())
      // .then(resp => console.log("returned resp from fetch owed_to_tabs", resp))
      .then(tabs => {
        this.setState({owed_to_tabs: tabs})
      })
    }



    getOwedByTabs = () => {
      fetch(`http://localhost:3000/owed_by_tabs`, {
        method: 'GET',
        headers: {'Content-Type': "application/json",
        'Authorization': localStorage.token}
      })
      .then(response => response.json())
      .then(tabs => {
        this.setState({owed_by_tabs: tabs})
      })
    }

    // getOtherUsers = () => {
    //   // const { owedByTabs, owedToTabs } = this.props
    //   if (this.state.owed_by_tabs.length > 0) {
    //     this.getOwedToUser()
    //   } else if (this.state.owed_to_tabs.length > 0) {
    //     this.getOwedByUser()
    //   } else if (this.state.owed_by_tabs.length > 0 && this.state.owed_to_tabs.length > 0) {
    //       this.getOwedByUser()
    //       this.getOwedToUser()
    //   }
    // }

    // getOwedToTabs = () => {
    //   fetch(`http://localhost:3000/owed_to_tabs`, {
    //     method: 'GET',
    //     headers: {'Content-Type': "application/json",
    //     'Authorization': localStorage.token}
    //   })
    //   .then(response => response.json())
    //   .then(tabs => this.setState({owed_to_tabs: tabs}))
    // }

    addOweToTab = newTab => {
      // console.log("TICK")
      this.setState({ owed_to_tabs: [...this.state.owed_to_tabs, newTab]})
    }

    addOweByTab = newTab => {
      // console.log("TICK")
      this.setState({ owed_by_tabs: [...this.state.owed_by_tabs, newTab]})
    }


    updateDeleteTab = (tabId) => {
      let result = this.state.owed_by_tabs.find(tab => tab.id === tabId) || this.state.owed_to_tabs.find(tab => tab.id === tabId)
      this.setState({ owed_by_tabs: this.state.owed_by_tabs.filter(tab => tab.id !== result.id),
                      owed_to_tabs: this.state.owed_to_tabs.filter(tab => tab.id !== result.id)
                    })
    }

    render() {
      return (
        <div className="App">
              <Route exact path="/" component= {routerProps => (
                  <Home login={this.login} logout={this.logout} {...routerProps}/>
                )} />
              <Route exact path="/log-in" component={routerProps => (
                <LoginForm login={this.login} {...routerProps} />
              )}/>
            <Route exact path="/dashboard" component={routerProps => (
                <Dashboard addOweToTab={this.addOweToTab} addOweByTab={this.addOweByTab} updateDeleteTab={this.updateDeleteTab} logout={this.logout} currentUser={this.state.currentUser} youOweUsers={this.getOwedByUser} usersOweYou={this.getOwedToUser}
                   owedToTabs={this.state.owed_to_tabs} owedByTabs={this.state.owed_by_tabs} {...routerProps} />
              )}/>
        </div>
      );
    }
}



export default withRouter(App);
