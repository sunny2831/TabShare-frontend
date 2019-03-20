import React from 'react';
import Home from './Home'
import LoginBackground from '../images/LoginBackground.png'
import { Route } from 'react-router-dom';


const BgImgClick = () => (
  <Route render={({ history}) => (
    <img className='login-bg' alt="login-bg-page" src={LoginBackground} onClick={() => { history.push('/') }}></img>
  )} />
)

class LoginForm extends React.Component {

  state = {
    username: "",
    password: ""
  }

  render() {
    return (
      <main>
        <BgImgClick/>
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
