import React from 'react'
import { Route } from 'react-router-dom';
import API from '../API'
import '../App.css';
import TabShareLogo from '../images/TabShareLogo.png'




class Dashboard extends React.Component {

 // LogoutBtnClick = () => (
 //    <Route render={({ history}) => (
 //      <button className='logout-btn' type="button" onClick={() => this.handleLogout}>Log out</button>
 //    )} />
 //  )

  handleLogout = () => {
    const { currentUser, logout } = this.props;
    logout(currentUser)
    this.props.history.push('/')
  }

  render() {
    return(
      <main className='web-page-box'>
        <div className='nav-bar-box'>
            <img className="tab-share-logo" alt="main-logo" src={TabShareLogo} />
            <button className='logout-btn' type="button" onClick={this.handleLogout}>Log out</button>
        </div>
      </main>
    )
  }

}

export default Dashboard;
