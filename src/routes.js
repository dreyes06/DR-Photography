import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Home from './Components/Home/Home'
import About from './Components/About/About'
import Schedule from './Components/Schedule/Schedule'
import Services from './Components/Services/Services'
import Profile from './Components/Profile/Profile'
import Products from './Components/Products/Products'

export default (
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/about' component={About} />
        <Route path='/sched' component={Schedule}/>
        <Route path='/serv' component={Services}/>
        <Route path='/prof' component={Profile}/>
        <Route path='/prod' component={Products}/>
    </Switch>
)