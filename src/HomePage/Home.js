import React from 'react';
import './Home.css';

export default class Home extends React.Component{
  state = {

  }


  render(){
    return (
        <div className='home'>
          <img alt = 'puppy' src='https://animalhaven.org/wp-content/uploads/2015/06/Sad-puppy-in-crate.jpg'/>
          <p>If you would like to adopt a pet sign up and join the queue</p>
          <a href='/'>START ADOPTION</a>
        </div>
    )
  }
}