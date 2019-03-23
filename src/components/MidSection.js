import React from 'react';
import { withRouter, Route } from 'react-router-dom';
import API from "../API"

class MidSection extends React.Component {

  // const { currentUser, owedByTabs, owedToTabs } = this.props
  // getOtherUsers = () => {
  //   const { owedByTabs, owedToTabs } = this.props
  //   if (owedByTabs.length >= 0) {
  //     this.getOwedToUser()
  //   } else if (owedToTabs.length >= 0) {
  //     this.getOwedByUser()
  //   }
  // }
  //
  // getOwedToUser = () => {
  //   const { owedByTabs, owedToTabs } = this.props
  //   let users = []
  //   let owedToIds = owedByTabs.map(tab => tab.owed_to_user)
  //   fetch('http://localhost:3000/users', {
  //     method: 'GET',
  //     headers: {'Content-Type': "application.json"}
  //   }).then(resp => resp.json()).then(
  //     data => users.push(data)
  //   )
  //   let usersOweYou = users.flat()
  //   let matchedUser = []
  //     owedToIds.forEach((id) => {
  //     let match
  //     match = usersOweYou.find(user => user.id === id)
  //     matchedUser.push(match) })
  //   return matchedUser.flat()
  // }
  //
  // getOwedByUser = () => {
  //   const { owedByTabs, owedToTabs } = this.props
  //   let users = []
  //   let owedByIds = owedToTabs.map(tab => tab.owed_by_user)
  //   fetch('http://localhost:3000/users', {
  //     method: 'GET',
  //     headers: {'Content-Type': "application.json"}
  //   }).then(resp => resp.json()).then(
  //     data => users.push(data)
  //   )
  //   let youOweUsers = users.flat()
  //   let matchedUser = []
  //     owedByIds.forEach((id) => {
  //     let match
  //     match = youOweUsers.find(user => user.id === id)
  //     matchedUser.push(match) })
  //   return matchedUser.flat()
  // }


   render() {
     const { currentUser, getOtherUsers } = this.props

      return(
      <div className="dash-panel">
        <div className="dark-panel">
          <area className="hoz-line"></area>
          <area className="vert-line1"></area>
          <area className="vert-line2"></area>
          <h1 className="title">Dashboard</h1>
          <button className="add-tab-btn">Add A Tab</button>
          <button className="settle-up-btn">Settle Up</button>
          <h2 className="total-balance">total balance</h2>
          <h2 className="you-owe">you owe</h2>
          <h2 className="you-are-owed">you are owed</h2>
          <div>
            <h3 className="owing-divide">YOU OWE</h3>
            <p>{getOtherUsers}</p>
          </div>

          <h3 className="owed-divide">YOU ARE OWED</h3>
          <area className="divide-rectangle"></area>


        </div>
      </div>
    )
  }

}

export default MidSection
