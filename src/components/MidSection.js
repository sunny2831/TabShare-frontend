// import React, { Component } from 'react';
import React from 'react';
import UserIcon from '../images/UserIcon.png'
import OwedUserIcon from '../images/OwedUserIcon.png'
import AddTabModal from './Modals/AddTabModal'
import SettleUpModal from './Modals/SettleUpModal'

class MidSection extends React.Component {

  state = ({
    allUsers: [],
    youAreOwedUsers: [],
    usersYouOwe: [],
    showAddTabModal: false,
    showSettleUpModal: false,
    youAreOwedTotal: 0,
    youOweTotal: 0,
    totalBalance: 0
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

  // handleAddTabSubmit = (event) => {
  //  console.log(event)
  // }

  removeTabSettle = (event) => {
    event.preventDefault()
    let owed_to_user = event.target.owed_to_user.value
    let owed_by_user = event.target.owed_by_user.value
    let amount_owed = parseInt(event.target.amount_owed.value)

    const matchToUser = this.state.allUsers.filter(user => user.username === owed_to_user)
    const toUserId = matchToUser.map(user => user.id)[0]

    const matchByUser = this.state.allUsers.filter(user => user.username === owed_by_user)
    const byUserId = matchByUser.map(user => user.id)[0]

    let foundTab

    fetch(`http://localhost:3000/tabs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.token
      }
    })
    .then(resp => resp.json())
	  .then(data => {
                 foundTab = data.find(tab => {
                    return tab.owed_by_user_id === toUserId  &&

                    tab.owed_to_user_id === byUserId &&
                    tab.initial_amount_owed === amount_owed
                    })
                    if (foundTab)
                      {this.props.updateDeleteTab(foundTab.id)
                      return fetch(`http://localhost:3000/tabs/${foundTab.id}`,{
                        method: 'DELETE',
                        headers: {'Content-Type': "application/json",
                                  'Authorization': localStorage.token }
                      })}
                    else {alert("Tab does not exist")}

              }
            )
 }

 // findTab = (data) => {
 //
 //
 //
 // }








  addTabOnSave = (event) => {

    event.preventDefault()
    // console.log(event.target.username.value)
    let owed_to_user = event.target.owed_to_user.value
    let owed_by_user = event.target.owed_by_user.value
    let description = event.target.description.value
    let tab_total = parseFloat(event.target.tab_total.value)
    let amount_owed = parseFloat(event.target.amount_owed.value)

    const toMatchUser = this.state.allUsers.filter(user => user.username === owed_to_user)
    const toUserId = toMatchUser.map(user => user.id)[0]
    // console.log(toUserId)

    const byMatchUser = this.state.allUsers.filter(user => user.username === owed_by_user)
    const byUserId = byMatchUser.map(user => user.id)[0]
    // console.log(byUserId)


    fetch("http://localhost:3000/tabs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.token
      },
      body: JSON.stringify({
        tab_total: tab_total,
        initial_amount_owed: amount_owed,
        owed_by_user_id: byUserId,
        owed_to_user_id: toUserId,
        description: description
      })
    }).then(response => response.json())
      .then(data => {
        if (data.owed_by_user_id === this.props.currentUser.id) {
             this.props.addOweByTab(data)
              // console.log("I would have done something with it")
        } else if (data.owed_to_user_id === this.props.currentUser.id) {
            this.props.addOweToTab(data)
        }
      })
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

  // componentDidMount= () => {
  //   this.getAllUsers()
  // }

  componentDidMount = () => {
    // console.log('i mounted')
      fetch('http://localhost:3000/users', {
        method: 'GET',
        headers: {'Content-Type': "application.json",
                  'Authorization': localStorage.token}
      })
      .then(resp => resp.json())
      .then(data => {
        // debugger
        // console.log(data)
        this.setState({ allUsers: data }, () => {
          this.getOwedToUser()
          this.getOwedByUser()
        })
      })
     let youOwe = 0
     let youAreOwed = 0
     if (this.props.owedToTabs.length) {
       youOwe = this.youOweTotal()
     }
     if (this.props.owedByTabs.length) {
       youAreOwed = this.youAreOwedTotal()
     }
     return this.totalBalance(youOwe, youAreOwed)

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

  youAreOwedTotal = () => {
    let totalArray = this.props.owedByTabs.map(tab => tab.initial_amount_owed)
    // debugger
    let total = totalArray.reduce((a,b) => {return a+b})
    let youAreOwed = total
    // Math.round((total * 100)/100)
    this.setState({youAreOwedTotal: youAreOwed})
    return youAreOwed
  }

  youOweTotal = () => {
    let totalArray = this.props.owedToTabs.map(tab => tab.initial_amount_owed)
    // debugger
    let total = totalArray.reduce((a,b) => {return a+b})
    let youOwe = total
    // Math.round((total * 100)/100)
    this.setState({youOweTotal: youOwe})
    return youOwe
  }

  totalBalance = (youOwe, youAreOwed) => {
    this.setState({ totalBalance: youAreOwed - youOwe})
  }


   render() {
     // const { currentUser, youOweUsers, usersOweYou, owedByTabs, owedToTabs} = this.props

      return(
      <div className="dash-panel">
        <div className="dark-panel">
          <area className="hoz-line" alt="lines for midsection"></area>
          <area className="vert-line1" alt="lines for midsection"></area>
          <area className="vert-line2" alt="lines for midsection"></area>
            <h1 className="title">Dashboard</h1>
          <button className="add-tab-btn" onClick={this.showAddTabForm}>Add A Tab</button>
          <AddTabModal
            className="modal"
            addTabOnSave={this.addTabOnSave}
            allUsers={this.state.allUsers}
            show={this.state.showAddTabModal}
            close={this.hideAddTabForm}>
          </AddTabModal>
          <button className="settle-up-btn" onClick={this.showSettleUpForm}>Settle Up</button>
          <SettleUpModal
            className="modal"
            removeTabSettle={this.removeTabSettle}
            showing={this.state.showSettleUpModal}
            closing={this.hideSettleUpForm}>
          </SettleUpModal>
          <h2 className="total-balance">total balance</h2>
          <h2 className="total-balance-fig">£{this.state.totalBalance}</h2>
          <h2 className="you-owe">you owe</h2>
          <h2 className="you-owe-fig">£{this.state.youOweTotal}</h2>
          <h2 className="you-are-owed">you are owed</h2>
          <h2 className="you-are-owed-fig">£{this.state.youAreOwedTotal}</h2>
            <h3 className="owing-divide">YOU OWE</h3>
          <div className="you-owe-list">
            {this.state.usersYouOwe.map(user => (
                 <div className='you-owe-list-div' key={user.id}>
                   <img className="user-icon" src={UserIcon} alt="user icon"></img>
                   <div className="you-owe-info">
                     <div className="you-owe-list-name">{user.username}</div>
                   </div>
                 </div>
             ))}
             <div className="move-figures-up">
               {this.props.owedToTabs.map(tab => (
                 <div className="right-amount-div" key={tab.id}>
                   <div className="yo-amount" onClick={this.showSettleUpForm}>you owe £{tab.initial_amount_owed}</div>
                 </div>
               ))}
             </div>
          </div>
          <area className="divide-rectangle" alt="you are owed area"></area>
          <h3 className="owed-divide">YOU ARE OWED</h3>
          <div className="owed-list">
            {this.state.youAreOwedUsers.map(user => (
              <div className='owed-list-div'>
                <img className="owed-user-icon" src={OwedUserIcon} alt="owed user area"></img>
                <div className="owed-info">
                  <div className="owed-list-name">{user.username}</div>
                </div>
              </div>
            ))}
            <div className="move-figures-up">
              {this.props.owedByTabs.map(tab => (
                <div className="right-amount-div">
                  <div className="yao-amount" onClick={this.showSettleUpForm}>owes you £{tab.initial_amount_owed}</div>
                </div>))
            }
            </div>
          </div>


        </div>
      </div>
    )
  }

}

export default MidSection
