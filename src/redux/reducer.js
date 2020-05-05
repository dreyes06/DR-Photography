const initialState = {
    user: {},
    registerView: false
}

const GET_USER = 'GET-USER',
      CLEAR_USER = 'CLEAR_USER',
      UPDATE_REGISTER_VIEW = 'UPDATE_REGISTER_VIEW',
      INITIALIZE_CART = 'INITIALIZE_CART'


export function getUser(userObj){
    return{
        type: GET_USER,
        payload: userObj
    }
}     

export function clearUser(){
    return{
        type: CLEAR_USER,
        payload: {}
    }
}

export function updateRegisterView(){
    return{
        type: UPDATE_REGISTER_VIEW
    }
}

export function initializeCart(cart_id){
    return{
        type: INITIALIZE_CART,
        payload: cart_id
    }
}

export default function reducer(state = initialState, action){
    const {type, payload} = action
    switch(type){
        case GET_USER:
            return {...state, user: payload}
        case CLEAR_USER:
            return {...state, user: payload}
        case UPDATE_REGISTER_VIEW:
            return {...state, registerView: !state.registerView}
        case INITIALIZE_CART:
            return {...state, user: {...state.user, cart_id: payload}}
        default: 
            return state
    }
}
