import React from 'react';
import Home from './Home'
import LoginBackground from '../images/LoginBackground.png'


class LoginForm extends React.Component {

  state = {
    username: "",
    password: ""
  }

  handleClick = (e) => {
    console.log(e)
  }


  render() {
    return (
      <main>
        <img className="login-bg" alt="login-bg-page" src={LoginBackground}></img>
        <div className="login-field">
        </div>
        <form >
            <input type="text" placeholder="username" className="username-field" required></input>
            <input type="text" placeholder="password" className="password-field" required></input>
            <button className="login-field-btn" type="button">Log in</button>
        </form>
      </main>
    )
  }
}

 export default LoginForm
