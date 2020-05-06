import React, { useEffect, useState } from 'react'
import Cart from '../Cart/Cart'
import {connect} from 'react-redux'
import { getUser, clearUser} from '../../redux/reducer'
import './Profile.css'
import axios from 'axios'

const Profile = (props) => {
    const [editView, setEditView] = useState(false)
    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')

    
    
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

   const handleFirstInput = (val) => {
       setFirstName(val)
    }

    const handleLastInput = (val) => {
        setLastName(val)
     }

    const handleEditView = () => {
        setEditView(!editView)
    }

    const updateUsername = () => {
        const {email} = props.user
        axios.put(`/api/user/${props.user.user_id}`, {email})
            .then(res => {
                props.getUser(res.data[0])
                handleEditView()
                
            })
    }
    
    return (
        <div className='cart-container' >
            <h2 className='profile-title'>Profile</h2>
            <h3  className='welcome'>Welcome {props.user.first_name} {props.user.last_name || null}</h3>
            {!editView
                ? <h2>{props.user.firstName} <button id='edit-button' onClick={handleEditView}>Edit</button></h2>
                : (<div>
                    <input 
                        value={props.firstName}
                        placeholder='New First Name'
                        onChange={(e) => handleFirstInput(e.target.value)}/>
                        <input 
                        value={props.lastName}
                        placeholder='New Last Name'
                        onChange={(e) => handleLastInput(e.target.value)}/>
                    <button id='edit-button' onClick={updateUsername}>Submit</button>
                   </div>)}
            <button className='logout-button' onClick={handleLogout} >Logout</button>
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

export default connect(mappedStateToProps, {getUser, clearUser})(Profile)