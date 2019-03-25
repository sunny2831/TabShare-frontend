import React from 'react';
import { withRouter, Route } from 'react-router-dom';
import API from "../API"
import FriendIcon from '../images/FriendIcon.png'

class FriendsList extends React.Component {

  state = ({
    friends: []
  })

  componentDidMount = () => {
    this.get_friends()
  }

  get_friends = () => {
    fetch('http://localhost:3000/users/5/friends', {
        method: 'GET',
        headers: {'Content-Type': "application.json",
				  'Authorization': localStorage.token
        }
      }).then(resp => resp.json()).then(
          data => this.setState({ friends: data})
         )
  }




  render() {
    const { currentUser } = this.props

    return(
      <div className="friends-list">
        {this.state.friends.map(friend =>
          <div>
            <img className="friend-icon" src={FriendIcon}></img>
            <div className="friend-name">
              <div>{friend.username}</div>
            </div>
          </div>
        )}
      </div>


    )

  }

}

export default FriendsList
