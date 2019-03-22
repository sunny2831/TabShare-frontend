import React from 'react'
import { Route } from 'react-router-dom';
import API from '../API'
import '../App.css';
import TabShareLogo from '../images/TabShareLogo.png'
import MidSection from './MidSection'
import SideBar from './SideBar'
import ProjectIcon from '../images/ProjectIcon.png'


class Dashboard extends React.Component {

  dashIcon = {
    imgurl: ProjectIcon
  }
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
      const { currentUser, owedByTabs, owedToTabs } = this.props;

    return(
      <div >
        <main className='web-page-box'>
          <div className='nav-bar-box'>
            <img className="tab-share-logo" alt="main-logo" src={TabShareLogo} />
            <button className='logout-btn' type="button" onClick={this.handleLogout}>Log out</button>
          </div>
          <h1 className="login-welcome">Welcome {currentUser.username} !</h1>
          <MidSection owedByTabs={owedByTabs} owedToTabs={owedToTabs} currentUser={currentUser} />
          <SideBar dashIcon={this.dashIcon.imgurl} />
        </main>
      </div>
    )
  }

}

export default Dashboard;
