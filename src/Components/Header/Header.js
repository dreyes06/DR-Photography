import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getUser } from '../../redux/reducer';
import './header.css'

class Header extends Component {
  constructor(props){
      super(props)
      this.state = {
            email: '',
            password: '',
            verPassword: '',
            firstName: '',
            lastName: '',
            registerView: false
      }
  }

  componentDidMount = () => {
      if(this.props.user.email){
          this.props.history.push('/')
      }
  }

  handleInput = (event) => {
      this.setState({[event.target.name]: event.target.value})
  }
  
  handleToggle = () => {
      this.setState({registerView: !this.state.registerView})
  }

  handleRegister = () => {
      const {email, password, verPassword, firstName, lastName} = this.state
      if(password !== '' && password === verPassword){
            axios
                .post('/user/register', {email, password, firstName, lastName})
                .then(res => {
                    this.props.getUser(res.data)
                    this.props.history.push('/')
                }).catch(err => console.log(err))
      } else {
          alert('Passwords are not identical')
      }
  }

  handleLogin = () => {
      const {email, password} = this.state
      axios
        .post('/user/login', {email, password})
        .then(res => {
            this.props.getUser(res.data)
            this.props.history.push('/')
        }).catch(err => console.log(err))
  }
  render() {
    return (
      <div className='header' >
        <section>
            {/* <h1>Register</h1> */}
            {this.state.registerView
            ?(<>
                <h3>Register</h3>
            </>)
            :<h3>Login</h3>}
            <input 
                value={this.state.email}
                name='email'
                placeholder='Email'
                onChange={(e) => this.handleInput(e)}
            />
            <input
                type='password'
                value={this.state.password}
                name='password'
                placeholder='Password'
                onChange={(e) => this.handleInput(e)}
            />
            {this.state.registerView
            ? (<>
                <input
                    type='password'
                    value={this.state.verPassword}
                    name='verPassword'
                    placeholder='Verify Password'
                    onChange={(e) => this.handleInput(e)}
                />
                <input
                    value={this.state.firstName}
                    name='firstName'
                    placeholder='First Name'
                    onChange={(e) => this.handleInput(e)}
                />
                <input
                    value={this.state.lastName}
                    name='lastName'
                    placeholder='Last Name'
                    onChange={(e) => this.handleInput(e)}
                />
                <button onClick={this.handleRegister} >Register</button>
                <p>Have an account? <span onClick={this.handleToggle}>Register Here</span></p>
               </>)
               :
               (<>
                <button onClick={this.handleLogin}>Login</button>
                <p>Not registered?<span onClick={this.handleToggle}>Register Here</span></p>
               </>)
            }
        </section>
        {/* <h3>Header</h3> */}
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
    const {user} = reduxState
    return{
        user
    }
}

export default connect(mapStateToProps, {getUser})(Header);
