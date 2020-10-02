import React from 'react'
import AdoptionPage from '../AdoptionPage/AdoptionPage'
import Home from '../HomePage/Home'
import {Switch, Route} from 'react-router-dom';
function Root() {
  return <div>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/adoption' component={AdoptionPage}></Route>
    </Switch>
  </div>
}

export default Root
