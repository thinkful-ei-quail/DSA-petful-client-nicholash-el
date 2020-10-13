import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default class Home extends React.Component {
  render() {
    return (
      <div className='home'>
        <img alt='puppy' src='https://animalhaven.org/wp-content/uploads/2015/06/Sad-puppy-in-crate.jpg' />
        <p>This is Petful: a web application where users can adopt a new pet, super easily.
        The user can see the pets currently up for adoption on our adoption page.
        If they'd like to adopt, all they have to do is add there name to the queue of users waiting to adopt.
        When the user is finally at the front of the line, the option to adopt one of the pets will appear.
        If the user would like to do so, they may click the adopt button, and that's all it takes!
There will appear a confirmation banner at the top of the page so the user knows the request was sent and approved.</p>
        <Link to='/adoption'>
          START ADOPTION
        </Link>
      </div>
    );
  }
}