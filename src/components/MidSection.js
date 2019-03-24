// import React, { Component } from 'react';
import React from 'react';
import { withRouter, Route } from 'react-router-dom';
import API from "../API"
import UserIcon from '../images/UserIcon.png'


class MidSection extends React.Component {

  state = ({
    allUsers: [],
    youAreOwedUsers: [],
    usersYouOwe: []
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
          <button className="add-tab-btn">Add A Tab</button>
          <button className="settle-up-btn" onClick={this.onSettleUp}>Settle Up</button>
          <h2 className="total-balance">total balance</h2>
          <h2 className="you-owe">you owe</h2>
          <h2 className="you-are-owed">you are owed</h2>
            <h3 className="owing-divide">YOU OWE</h3>
          <div className="you-owe-list">
            {this.state.usersYouOwe.map(user => (
               <button>
                 <div className='you-owe-list-div'>
                   <img className="user-icon" src={UserIcon}></img>
                   <div className="you-owe-info">
                     <div className="you-owe-list-name">{user.username}</div>
                   </div>
                 </div>
               </button>
             ))}
          </div>
          <h3 className="owed-divide">YOU ARE OWED</h3>
          <area className="divide-rectangle"></area>


        </div>
      </div>
    )
  }

}

export default MidSection
