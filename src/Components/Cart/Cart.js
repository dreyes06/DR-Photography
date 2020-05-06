import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import stripe from "../../stripe";
import axios from "axios";
import './Cart.css'

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
    };
  }

  componentDidMount = () => {
    if (this.props.user.cart_id !== undefined) {
      this.getCart();
    }
  };

  onToken = async (token) => {
    token.card = void 0;

    await axios
      .post("/api/payment", { token, amount: 100 })
      .then(() => {
        alert("Payment Submitted");
      })
      .catch((err) => console.log(err));
  };

  getCart = () => {
    axios
      .get(`/api/cart/${this.props.user.cart_id}`)
      .then((res) => this.setState({ cart: res.data }))
      .catch((err) => console.log(err));
  };

  deleteCartItem = (id) => {
    axios
      .delete(`/api/cart-item/${id}`)
      .then(() => this.getCart())
      .catch((err) => console.log(err));
  };

  render() {
    console.log(this.props);
    const mappedCart = this.state.cart.map((item, i) => {
      return (
        <div key={i} className="cart-container">
          <h3 className='cart-title' >Cart</h3>
          <img src={item.image} alt={item.name} className="product-image" />
          <p className='cart-text'>{item.name}</p>
          <p className='cart-text'>{item.description}</p>
          <p className='cart-text'>${item.price}</p>
          <StripeCheckout
            label="Purchase"
            token={this.onToken}
            stripeKey={stripe.publicKey}
            amount={Math.round(item.price * 100)}
          />
          <button className='remove-button' onClick={() => this.deleteCartItem(item.cart_item_id)}>
            Remove Item
          </button>
        </div>
      );
    });
    return (
      <div className='cart-container'>
        
        {mappedCart}
      </div>
    );
  }
}

const mappedStateToProps = (reduxState) => {
  const { user } = reduxState;
  return {
    user,
  };
};

export default connect(mappedStateToProps)(Cart);
