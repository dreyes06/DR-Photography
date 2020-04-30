import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import Header from '../Header/Header'

const Products = (props) => {
   const [products, setProducts] = useState([])

   useEffect(()=> {
       axios.get('/api/products')
        .then((res) => setProducts({products: res.data}))
        .catch(err => console.log(err))
   },[])

   const addToCart = (id, price) => {
        if(props.user.email){
            axios.post('/api/cart-item', {cart_id: props.user.cart_id, product_id: id, price})
                .then(() => {
                    window.alert('Added to cart!')
                }).catch(err => console.log(err))
        }else {
            props.handleToggle()
        }
   }
    
    return (
        <div className='products' >
            {products.map((product, i) => (
                <div key={i} className='product-container'>
                <img src={product.image} alt={product.name} className='product-image'/>
                <p>{product.name}</p>
                <p>{product.description}</p>
                <p>${product.price}</p>
                <button onClick={() => addToCart(product.product_id, product.price)}>Add to Cart</button>
                {props.registerView
                ? <Header toggleFn={props.handleToggle()}/>
                :null}
            </div>
            ))}
        </div>
    )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps)(Products)