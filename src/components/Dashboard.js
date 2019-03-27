import React from 'react'
import '../App.css';
import TabShareLogo from '../images/TabShareLogo.png'
import MidSection from './MidSection'
import SideBar from './SideBar'
import ProjectIcon from '../images/ProjectIcon.png'
import FriendsList from './FriendsList'


class Dashboard extends React.Component {

  state = { showModal: false }

  dashIcon = {
    imgurl: ProjectIcon
  }
 // // LogoutBtnClick = () => (
 // //    <Route render={({ history}) => (
 // //      <button className='logout-btn' type="button" onClick={() => this.handleLogout}>Log out</button>
 // //    )} />
 // //  )

 componentDidMount() {
   // debugger
 }

  showAddTabForm = () => {
    this.setState({showModal: true})
  }

  hideAddTabForm = () => {
    this.setState({ showModal: false})
  }

  handleLogout = () => {
    const { currentUser, logout } = this.props;
    logout(currentUser)
    this.props.history.push('/')
  }

  render() {
      const { currentUser, youOweUsers, usersOweYou, owedByTabs, owedToTabs } = this.props;

    return(
      <div >
        <main className='web-page-box'>
          <div className='nav-bar-box'>
            <img className="tab-share-logo" alt="main-logo" src={TabShareLogo} />
            <button className='logout-btn' type="button" onClick={this.handleLogout}>Log out</button>
          </div>
          <h1 className="login-welcome">Welcome {currentUser.username} !</h1>
            <MidSection addOweToTab={this.props.addOweToTab} addOweByTab={this.props.addOweByTab} currentUser={currentUser} youOweUsers={youOweUsers} owedByTabs={owedByTabs} owedToTabs={owedToTabs} usersOweyou={usersOweYou} />
            <SideBar dashIcon={this.dashIcon.imgurl} />
            <FriendsList currentUser={currentUser} />
        </main>
      </div>
    )
  }

}

export default Dashboard;
