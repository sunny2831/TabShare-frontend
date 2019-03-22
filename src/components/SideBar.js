import React from 'react'
import ProjectIcon from '../images/ProjectIcon.png'

class SideBar extends React.Component {

  render() {
    const { dashIcon } = this.props;
    return(
      <div>
        <img className="project-icon" src={ProjectIcon}/>
        <h1 className="dash-selector">Dashboard</h1>
        <area className="side-slider"></area>
      </div>

    )
  }

}

export default SideBar
