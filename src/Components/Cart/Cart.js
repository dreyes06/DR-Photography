import React, {Component} from 'react'
import StripeCheckout from 'react-stripe-checkout'
import stripe from '../../stripe'
import axios from 'axios'

class Cart extends Component{
 onToken = async(token) => {
    token.card = void 0

    await axios.post('/api/payment', {token, amount: 100})
                .then(() => {
                    alert('Payment Submitted')
                }).catch(err => console.log(err))
}  
    
    render() {
    return (
        <div>
            <h3>Cart</h3>
            <StripeCheckout
                label='Purchase'
                token={this.onToken}
                stripeKey={stripe.publicKey}
                amount={100}
                //shippingAddress={true}
                //billingAddress={true}
            />
        </div>
    )
    }
}

export default Cart