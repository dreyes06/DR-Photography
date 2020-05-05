import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getUser, updateRegisterView, initializeCart } from "../../redux/reducer";
import "./header.css";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      verPassword: "",
      firstName: "",
      lastName: "",
      newUser: false
    };
  }

  componentDidMount = () => {
    if (this.props.user.email) {
      this.props.history.push("/");
    }
  };

  handleInput = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleToggle = () => {
    this.setState({ newUser: !this.state.newUser });
  };

  createCart = () => {
    const {user_id} = this.props.user
    axios.post('/api/create-cart', {user_id})
        .then((res) => this.props.initializeCart(res.data[0].cart_id))
        .catch(err => console.log(err))
  }

  handleRegister = () => {
    const { email, password, verPassword, firstName, lastName } = this.state;
    if (password !== "" && password === verPassword) {
      axios
        .post("/user/register", { email, password, firstName, lastName })
        .then((res) => {
            this.props.getUser(res.data);
            this.props.updateRegisterView();
            this.createCart()
          this.props.history.push("/");
        })
        .catch((err) => console.log(err));
    } else {
      alert("Passwords are not identical");
    }
  };

  handleLogin = () => {
    const { email, password } = this.state;
    axios
      .post("/user/login", { email, password })
      .then((res) => {
        this.props.getUser(res.data);
        this.props.updateRegisterView();
        this.props.history.push("/");
      })
      .catch((err) => console.log(err));
  };
  render() {
    // console.log(this.props);
    return (
      <div className="header">
        <section  className='login-register'>
          {this.props.registerView ? (
            this.state.newUser ? (
              <>
                <h3 className='login' >Register</h3>
                <input
                className='header-input'
                  value={this.state.email}
                  name="email"
                  placeholder="Email"
                  onChange={(e) => this.handleInput(e)}
                />
                <input
                className='header-input'
                  type="password"
                  value={this.state.password}
                  name="password"
                  placeholder="Password"
                  onChange={(e) => this.handleInput(e)}
                />
                <input
                className='header-input'
                  type="password"
                  value={this.state.verPassword}
                  name="verPassword"
                  placeholder="Verify Password"
                  onChange={(e) => this.handleInput(e)}
                />
                <input
                className='header-input'
                  value={this.state.firstName}
                  name="firstName"
                  placeholder="First Name"
                  onChange={(e) => this.handleInput(e)}
                />
                <input
                className='header-input'
                  value={this.state.lastName}
                  name="lastName"
                  placeholder="Last Name"
                  onChange={(e) => this.handleInput(e)}
                />
                <button className='header-button' onClick={this.handleRegister}>Register</button>
                <p>
                  Existing User?{" "}
                  <span onClick={this.handleToggle}>Login Here</span>
                </p>
              </>
            ) : (
              <>
                <h3 className='login' >Login</h3>
                <input
                className='header-input'
                  value={this.state.email}
                  name="email"
                  placeholder="Email"
                  onChange={(e) => this.handleInput(e)}
                />
                <input
                className='header-input'
                  type="password"
                  value={this.state.password}
                  name="password"
                  placeholder="Password"
                  onChange={(e) => this.handleInput(e)}
                />
                <button className='header-button' onClick={this.handleLogin}>Login</button>
                <p>
                  New User?{" "}
                  <span onClick={this.handleToggle}>Register Here</span>
                </p>
              </>
            )
          ) : null}         
        </section>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => {
  const { user, registerView } = reduxState;
  return {
    user,
    registerView
  };
};

export default connect(mapStateToProps, { getUser, updateRegisterView, initializeCart })(
  Header
);
