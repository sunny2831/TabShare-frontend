import React from 'react'
import ProjectIcon from '../images/ProjectIcon.png'
import ExpenseIcon from '../images/ExpenseIcon.png'

class SideBar extends React.Component {

  render() {
    // const { dashIcon } = this.props;
    return(
      <div>
        <img className="project-icon" src={ProjectIcon} alt="an icon for the proj and expense!"/>
        <img className="expense-icon" src={ExpenseIcon} alt="an icon for the proj and expense!"/>
        <h1 className="dash-selector">Dashboard</h1>
        <h1 className="exp-selector">All Expenses</h1>
        <area className="side-slider" alt="sliders in midsection area"></area>
        <area className="add-friend-bar" alt="sliders in midsection area"></area>
        <h3 className="friends">FRIENDS</h3>
        <h3 className="add">+add</h3>
      </div>

    )
  }

}

export default SideBar
