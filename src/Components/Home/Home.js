import React from 'react'
import {withRouter} from 'react-router-dom'
import './Home.css'

const Home = () => {
    return(
        <div >
            <div className='home-container'>
            <h2 className='home-title'>Welcome</h2>
            </div>
        </div>
    )

    
}

export default withRouter(Home)