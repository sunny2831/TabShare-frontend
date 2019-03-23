
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
        payment: [],
        usersOweYou: [],
        youOweUsers: []
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
      this.setState({ currentUser: "" });
      this.setState({owed_by_tabs: []})
      this.setState({owed_to_tabs: []})
      this.setState({usersOweYou: []})
      this.setState({youOweUsers: []})
    };


    componentDidMount() {
      // debugger
      API.validate().then(userData => {
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
      .then(tabs => {
        this.setState({owed_to_tabs: tabs})
        // this.getOwedByUser()
      })

    }



    getOwedByTabs = () => {
      let  owedToIds
      fetch(`http://localhost:3000/owed_by_tabs`, {
        method: 'GET',
        headers: {'Content-Type': "application/json",
        'Authorization': localStorage.token}
      })
      .then(response => response.json())
      .then(tabs => {
        this.setState({owed_by_tabs: tabs})
        // this.getOwedToUser()
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

    getOwedToUser = () => {
      let owedToIds = this.state.owed_by_tabs.map(tab => tab.owed_to_user_id)
      let users = []

      fetch('http://localhost:3000/users', {
        method: 'GET',
        headers: {'Content-Type': "application.json"}
      }).then(resp => resp.json()).then(
        data => users.push(data)
      )

      let usersOweYou = users.flat()
      let matchedUser = []

        owedToIds.forEach((id) => {
        let match

        match = usersOweYou.find(user => user.id === id)
        matchedUser.push(match) })
        this.setState({
          usersOweYou: matchedUser
        })
    }

    getOwedByUser = () => {
      // const { owedByTabs, owedToTabs } = this.props
      let users = []
      let owedByIds = this.state.owed_to_tabs.map(tab => tab.owed_by_user_id)

      fetch('http://localhost:3000/users', {
        method: 'GET',
        headers: {'Content-Type': "application.json"}
      }).then(resp => resp.json()).then(
        data => users.push(data)
      )

      let youOweUsers = users.flat()
      let matchedUser = []

        owedByIds.forEach((id) => {
        let match
        match = youOweUsers.find(user => user.id === id)
        matchedUser.push(match) })

        this.setState({
          youOweUsers: matchedUser
        })
    }



    // getOwedToTabs = () => {
    //   fetch(`http://localhost:3000/owed_to_tabs`, {
    //     method: 'GET',
    //     headers: {'Content-Type': "application/json",
    //     'Authorization': localStorage.token}
    //   })
    //   .then(response => response.json())
    //   .then(tabs => this.setState({owed_to_tabs: tabs}))
    // }

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
                <Dashboard logout={this.logout} currentUser={this.state.currentUser} youOweUsers={this.getOwedByUser} usersOweYou={this.getOwedToUser}
                   owedToTabs={this.state.owed_to_tabs} owedByTabs={this.state.owed_by_tabs} {...routerProps} />
              )}/>
        </div>
      );
    }
}



export default withRouter(App);
