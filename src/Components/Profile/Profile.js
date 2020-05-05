import React, { useEffect } from 'react'
import Cart from '../Cart/Cart'
import {connect} from 'react-redux'
import { clearUser} from '../../redux/reducer'
import './Profile.css'
import axios from 'axios'

const Profile = (props) => {
    useEffect(() => {
        if(!props.user.email){
            props.history.push('/')
        }
    },[])

   const handleLogout = () => {
        console.log(props)
        axios.get('/user/logout')
            .then(() => {
                props.clearUser()
                props.history.push('/')
            })
    }
    
    return (
        <div className='cart-container' >
            <h2 className='profile-title'>Profile</h2>
            <h3>Welcome {props.user.first_name} {props.user.last_name || null}</h3>
            <button onClick={handleLogout} >Logout</button>
            <Cart/>
        </div>
    )
}

const mappedStateToProps = reduxState => {
    const {user} = reduxState
    return{
        user
    }
}

export default connect(mappedStateToProps, {clearUser})(Profile)