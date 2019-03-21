import React from 'react'
import { Route } from 'react-router-dom';
import API from '../API'
import '../App.css';
import TabShareLogo from '../images/TabShareLogo.png'
import MidSection from './MidSection'
import SideBar from './SideBar'



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
      const { currentUser } = this.props;


    return(
      <div {...this.props}>
        <main className='web-page-box' {...this.props}>
          <div className='nav-bar-box'>
            <img className="tab-share-logo" alt="main-logo" src={TabShareLogo} />
            <button className='logout-btn' type="button" onClick={this.handleLogout}>Log out</button>
          </div>
          <h1 className="login-welcome">Welcome {this.props.value} !</h1>
          <MidSection />
          <SideBar />
        </main>
      </div>
    )
  }

}

export default Dashboard;
