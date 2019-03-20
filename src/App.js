
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
// import logo from './logo.svg';
import './App.css';
import Home from './components/Home'
import LoginForm from './components/LoginForm'



class App extends Component {

    state = {
      currentUser: {},
      owed_by_tabs: [],
      owed_to_tabs: [],
      payment: []
    }


    render() {
    return (
      <div>
        <Router>
          <React.Fragment>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/log-in" component={LoginForm}/>
            </Switch>
          </React.Fragment>
        </Router>
      </div>
     );
    }
}



export default App;
