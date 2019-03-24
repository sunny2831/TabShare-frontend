import React from 'react'
import ProjectIcon from '../images/ProjectIcon.png'
import ExpenseIcon from '../images/ExpenseIcon.png'

class SideBar extends React.Component {

  render() {
    const { dashIcon } = this.props;
    return(
      <div>
        <img className="project-icon" src={ProjectIcon}/>
        <img className="expense-icon" src={ExpenseIcon}/>
        <h1 className="dash-selector">Dashboard</h1>
        <h1 className="exp-selector">All Expenses</h1>
        <area className="side-slider"></area>
        <area className="add-friend-bar"></area>
        <h3 className="friends">FRIENDS</h3>
        <h3 className="add">+add</h3>
      </div>

    )
  }

}

export default SideBar
