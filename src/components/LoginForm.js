import React from 'react';
import LoginBackground from '../images/LoginBackground.png'
import { Route } from 'react-router-dom';
import API from "../API"


const BgImgClick = () => (
  <Route render={({ history}) => (
    <img className='login-bg' alt="login-bg-page" src={LoginBackground} onClick={() => { history.push('/') }}></img>
    // <Home onClick={() => { history.push('/') }}/>
  )} />
)

class LoginForm extends React.Component {

  state = {
    username: "",
    password: ""
  }

  handleChangeUsername = event => {
    this.setState({ username: event.target.value })
  }

  handleChangePassword = event => {
    this.setState({ password: event.target.value })
  }

  handleSubmit = () => {
    const { login, history } = this.props;
    const user = this.state;
    API.login(user).then(data => {
      if (data.error) {
        alert("Incorrect password/username");
      } else {
        login(data);
        history.push("/dashboard");
      }
    });
  };


  render() {
    const { username, password } = this.state;
    const { handleChangeUsername, handleChangePassword, handleSubmit } = this;

    return (
      <main>
        <BgImgClick/>
        <div className="login-field">
        </div>
        <form >
            <input type="text" placeholder="username" className="username-field" value={username} onChange={handleChangeUsername} required></input>
            <input type="password" placeholder="password" className="password-field" value={password} onChange={handleChangePassword} required></input>
            <button className="login-field-btn" type="button" onClick={handleSubmit} required>Log in</button>
        </form>
      </main>
    )
  }
}

 export default LoginForm
