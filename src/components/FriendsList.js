import React from 'react';
import FriendIcon from '../images/FriendIcon.png'

class FriendsList extends React.Component {

  state = ({
    friends: []
  })

  componentDidMount = () => {
    this.get_friends()
    // console.log(this.state.friends)
  }

  get_friends = () => {
    fetch('http://localhost:3000/users', {
        method: 'GET',
        headers: {'Content-Type': "application.json",
				  'Authorization': localStorage.token
        }
      }).then(resp => resp.json()).then(
          data => this.setState({ friends: data})
         )
  }




  render() {
    // const { currentUser } = this.props
    // console.log(this.state.friends);
    return(
      <div className="friends-list">
        {this.state.friends.length > 0 ?
          (this.state.friends.map(friend =>
          <div key={friend.id}>
            <img className="friend-icon" src={FriendIcon} alt="friend pictures"></img>
            <div className="friend-name">
              <div>{friend.username}</div>
            </div>
          </div>))
          :
          <div></div>
        }
      </div>


    )

  }

}

export default FriendsList
