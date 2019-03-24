import React from 'react';
import { withRouter, Route } from 'react-router-dom';
import API from "../API"

class FriendsList extends React.Component {

  state = ({
    friends: []
  })


  render() {
    const { currentUser } = this.props

    return(
     <h1 className="friendName"> hello </h1>  
    )

  }

}

export default FriendsList
