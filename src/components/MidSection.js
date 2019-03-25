// import React, { Component } from 'react';
import React from 'react';
import { withRouter, Route } from 'react-router-dom';
import API from "../API"
import UserIcon from '../images/UserIcon.png'
import OwedUserIcon from '../images/OwedUserIcon.png'
import AddTabModal from './Modals/AddTabModal'


class MidSection extends React.Component {

  state = ({
    allUsers: [],
    youAreOwedUsers: [],
    usersYouOwe: [],
    showAddTabModal: false,
    showSettleUpModal: false
  })
  // const { currentUser, owedByTabs, owedToTabs } = this.props
  // getOtherUsers = () => {
  //   const { owedByTabs, owedToTabs } = this.props
  //   if (owedByTabs.length >= 0) {
  //     this.getOwedToUser()
  //   } else if (owedToTabs.length >= 0) {
  //     this.getOwedByUser()
  //   }
  // }

 // // LogoutBtnClick = () => (
 // //    <Route render={({ history}) => (
 // //      <button className='logout-btn' type="button" onClick={() => this.handleLogout}>Log out</button>
 // //    )} />
 // //  )

  showAddTabForm = () => {
    this.setState({showAddTabModal: true})
  }

  hideAddTabForm = () => {
    this.setState({ showAddTabModal: false})
  }

  showSettleUpForm = () => {
    this.setState({showSettleUpModal: true})
  }

  hideSettleUpForm = () => {
    this.setState({ showSettleUpModal: false})
  }

  handleLogout = () => {
    const { currentUser, logout } = this.props;
    logout(currentUser)
    this.props.history.push('/')
  }

  componentDidMount= () => {
    this.getAllUsers()
  }

  getAllUsers = () => {
      fetch('http://localhost:3000/users', {
        method: 'GET',
        headers: {'Content-Type': "application.json",
                  'Authorization': localStorage.token}
      }).then(resp => resp.json()).then(
        data => this.setState({ allUsers: data }, () => {
          this.getOwedToUser()
          this.getOwedByUser()
        })
      )
  }

  getOwedToUser = () => {
    let owedToIds = this.props.owedByTabs.map(tab => tab.owed_to_user_id)
    let matchedUser = []
        owedToIds.forEach((id) => {
          let match
          match = this.state.allUsers.find(user => user.id === id)
          matchedUser.push(match)
        })

        this.setState({
          youAreOwedUsers: matchedUser
        })
    }

  getOwedByUser = () => {

    let owedByIds = this.props.owedToTabs.map(tab => tab.owed_by_user_id)


    let matchedUser = []

      owedByIds.forEach((id) => {
      let match
      match = this.state.allUsers.find(user => user.id === id)
      matchedUser.push(match) })

      this.setState({
        usersYouOwe: matchedUser
      })
  }

   render() {
     const { currentUser, youOweUsers, usersOweYou, owedByTabs, owedToTabs} = this.props

      return(
      <div className="dash-panel">
        <div className="dark-panel">
          <area className="hoz-line"></area>
          <area className="vert-line1"></area>
          <area className="vert-line2"></area>
          <h1 className="title">Dashboard</h1>
          <button className="add-tab-btn" onClick={this.showAddTabForm}>Add A Tab</button>
          <AddTabModal
            className="modal"
            show={this.state.showAddTabModal}
            close={this.hideAddTabForm}>
                Maybe aircrafts fly very high because they don't want to be seen in plane sight?
          </AddTabModal>
          <button className="settle-up-btn" onClick={this.showSettleUpForm}>Settle Up</button>
          <h2 className="total-balance">total balance</h2>
          <h2 className="you-owe">you owe</h2>
          <h2 className="you-are-owed">you are owed</h2>
            <h3 className="owing-divide">YOU OWE</h3>
          <div className="you-owe-list" >
            {this.state.usersYouOwe.map(user => (
                 <div className='you-owe-list-div'>
                   <img className="user-icon" src={UserIcon}></img>
                   <div className="you-owe-info">
                     <div className="you-owe-list-name">{user.username}</div>
                   </div>
                 </div>
               ))}
          </div>
          <area className="divide-rectangle"></area>
          <h3 className="owed-divide">YOU ARE OWED</h3>
          <div className="owed-list">
            {this.state.youAreOwedUsers.map(user => (
              <div className='owed-list-div'>
                <img className="owed-user-icon" src={OwedUserIcon}></img>
                <div className="owed-info">
                  <div className="owed-list-name">{user.username}</div>
                </div>
              </div>
            ))}
          </div>


        </div>
      </div>
    )
  }

}

export default MidSection
