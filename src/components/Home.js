import React from 'react';
import { Route } from 'react-router-dom';
import '../App.css';
import TabShareLogo from '../images/TabShareLogo.png'
import HomePageIntro from '../images/HomePageIntro.png'
import CoinBackground from '../images/CoinBackground.png'
import DemoPage from '../images/DemoPage.png'
// import Link from 'react-router'

const Button = () => (
  <Route render={({ history}) => (
    <button className='login-btn' type="button" onClick={() => { history.push('/log-in') }}>Log in</button>
  )} />
)


const Home = props => {
  const { classes } = props


    return (
      <main className='web-page-box'>
        <div className='nav-bar-box'>
            <img className="tab-share-logo" alt="main-logo" src={TabShareLogo} />
            <Button />
        </div>
        <img className="homepage-intro" alt="main-intro" src={HomePageIntro} />
        <img className="coin-bg" alt="coin-bg" src={CoinBackground} />
        <img className="demo-page" alt="demo-page" src={DemoPage} />
        <div className="signup-field">
        </div>
        <form >
            <input type="text" placeholder="pick a username" className="username" required></input>
            <input type="text" placeholder="your email address" className="email" required></input>
            <input type="text" placeholder="create a password" className="password" required></input>
            <button className="signup-btn" type="button">Sign Up for TabShare</button>
        </form>
      </main>
    );
 }

export default Home
