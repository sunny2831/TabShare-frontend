import React from 'react';
import { withRouter, Route } from 'react-router-dom';
import API from "../API"

class MidSection extends React.Component {

  // const { currentUser, owedByTabs, owedToTabs } = this.props
  getOtherUser = () => {
    const { owedByTabs, owedToTabs } = this.props
    if (owedByTabs.length >= 0) {
      this.getOwedToUserIds()
    } else if (owedToTabs.length >= 0) {
      this.getOwedByUserIds()
    }
  }

  getOwedToUserIds = () => {
    const { owedByTabs, owedToTabs } = this.props
    let owedToIds = owedByTabs.map(tab => tab.owed_to_user)
    fetch('http://localhost:3000/users', {
      method: 'GET',
      headers: {'Content-Type': "application.json"}
    }).then(resp => resp.json()).then(
      users => console.log(users)
    )
  }

  getOwedByUserIds = () => {
    const { owedByTabs, owedToTabs } = this.props
    let owedByIds = owedToTabs.map(tab => tab.owed_by_user)
    fetch('http://localhost:3000/users', {
      method: 'GET',
      headers: {'Content-Type': "application.json"}
    }).then(resp => resp.json()).then(
      users => console.log(users)
    )
  }


   render() {
     const { currentUser, owedByTabs, owedToTabs } = this.props

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
          <h3 className="owing-divide">YOU OWE</h3>
          <h3 className="owed-divide">YOU ARE OWED</h3>
          <area className="divide-rectangle"></area>


        </div>
      </div>
    )
  }

}

export default MidSection
