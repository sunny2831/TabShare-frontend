import React from 'react';
import API from "../API"


class SignupForm extends React.Component {

  state = {
    username: "",
    email: "",
    password: "",
  }

  handleChange = event => {
      this.setState({[event.target.name]: event.target.value})
  }

  // componentDidMount = () => {
  //   this.handleSignUpSubmit()
  // }


  handleSignUpSubmit = event => {
     event.preventDefault()
     const { login, history } = this.props
     const user = this.state
     API.create(user).then(data => {
       if (data.error) {
         alert('Email or Username already in use')
       } else {
         // debugger
         login(data)
         // logout(data)
         history.push("/dashboard")
       }
     })
     // createCurrentUser()
   }

   // createCurrentUser = (user) => {
   //   this.state.username = this.props.currentUser
   // }


   render() {
     // const { classes } = this.props;
     const { username, email, password } = this.state
     const {handleSignUpSubmit, handleChange} = this

     return (
       <div>
         <div className="signup-field">
         </div>
         <form >
             <input type="text" placeholder="pick a username" className="username" value={username} onChange={handleChange} name="username" required></input>
             <input type="text" placeholder="your email address" className="email" value={email} onChange={handleChange} name="email" required></input>
             <input type="password" placeholder="create a password" className="password" value={password} onChange={handleChange} name="password" required></input>
             <button className="signup-btn" type="button" onClick={handleSignUpSubmit}>Sign Up for TabShare</button>
         </form>
        </div>
     )
   }

}

export default SignupForm
