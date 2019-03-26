import React from 'react';
import {  Route } from 'react-router-dom';
import '../App.css';
import TabShareLogo from '../images/TabShareLogo.png'
import HomePageIntro from '../images/HomePageIntro.png'
import CoinBackground from '../images/CoinBackground.png'
import DemoPage from '../images/DemoPage.png'
import SignupForm from './SignupForm'
// import Link from 'react-router'

const LoginBtnClick = () => (
  <Route render={({ history}) => (
    <button className='login-btn' type="button" onClick={() => { history.push('/log-in') }}>Log in</button>
  )} />
)

const Home = props => {


    return (
      <div>
        <main className='web-page-box'>
          <div className='nav-bar-box'>
              <img className="tab-share-logo" alt="main-logo" src={TabShareLogo} />
              <LoginBtnClick />
          </div>
          <img className="homepage-intro" alt="main-intro" src={HomePageIntro} />
          <img className="coin-bg" alt="coin-bg" src={CoinBackground} />
          <img className="demo-page" alt="demo-page" src={DemoPage} />
        </main>
        <SignupForm {...props}/>
      </div>
    );
 }

export default Home
