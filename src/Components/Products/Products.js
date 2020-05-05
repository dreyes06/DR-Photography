import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {updateRegisterView} from '../../redux/reducer'
import './Products.css'
// import Header from '../Header/Header'


const Products = (props) => {
   const [merch, setMerch] = useState([])

   useEffect(()=> {
       axios.get('/api/merch')
        .then((res) => setMerch([...merch, ...res.data]))
        .catch(err => console.log(err))
   },[])

   const addToCart = (id, price) => {
        console.log(id)
    if(props.user.email){
            axios.post('/api/cart-item', {cart_id: props.user.cart_id, merch_id: id, price})
                .then(() => {
                    window.alert('Added to cart!')
                }).catch(err => console.log(err))
        }else {
            props.updateRegisterView()
        }
   }
    
    return (
        <div className='products' >
            <h3 className='productsTitle' >Products</h3>
            {merch.map((product, i) => (
                <div key={i} className='product-container'>
                <img src={product.image} alt={product.name} className='product-image'/>
                <p className='product-text'>{product.name}</p>
                <p className='product-text'>{product.description}</p>
                <p className='product-text'>${product.price}</p>
                <button className='product-button' onClick={() => addToCart(product.merch_id, product.price)}>Add to Cart</button>
            </div>
            ))}
        </div>
    )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, {updateRegisterView})(Products)