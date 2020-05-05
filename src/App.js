import React, { Component } from 'react';
import { Link} from 'react-router-dom'
import Header from './Components/Header/Header'
import './App.css';
import routes from './routes';

class App extends Component{
  render() {
    return(
      <div className='header' >
        <Link to='/' className='drp' style={{color: 'rgb(100, 156, 240)'}}><h1>DR Photography</h1></Link>
        <Header/>
            <nav className='navbar'>
                <Link to='/' style={{ textDecoration: 'none' }} >Home</Link>
                <Link to='/about' style={{ textDecoration: 'none' }}>About</Link>
                <Link to='/serv' style={{ textDecoration: 'none' }}>Services</Link>
                <Link to='/sched' style={{ textDecoration: 'none' }}>Schedule</Link>
                <Link to='/prof' style={{ textDecoration: 'none' }}>Profile</Link>
                <Link to='/prod' style={{ textDecoration: 'none' }}>Products</Link>
                
            </nav>
        {routes}
      </div>
    )
  }
}

export default App;
