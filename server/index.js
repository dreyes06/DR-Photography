require('dotenv').config()
const express = require('express'),
      massive = require('massive'),
      session = require('express-session'),
      userCtrl = require('./Controllers/userCtrl'),
      cartCtrl = require('./Controllers/cartController'),
      {SERVER_PORT, SESSION_SECRET, DB_STRING} = process.env,
      app = express(),
      path = require('path')

app.use(express.json())

app.use(express.static(__dirname + '/../build'))

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {maxAge: 1000 * 60 * 60 * 24}
}))

massive({
    connectionString: DB_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db => {
    app.set('db', db)
    console.log('db connected')
})

// user endpoints
app.post('/user/register', userCtrl.register)
app.post('/user/login', userCtrl.login)
app.get('/user/logout', userCtrl.logout)
app.put('/api/user/:id', userCtrl.updateUser  )

//cart endpoints
app.get('/api/merch', cartCtrl.getMerch)
app.post('/api/payment', cartCtrl.completePayment)
app.post('/api/cart-item', cartCtrl.addToCart)
app.post('/api/create-cart', cartCtrl.createCart)
app.get('/api/cart/:id', cartCtrl.getCart)
app.delete('/api/cart-item/:id', cartCtrl.deleteCartItem)

//appointment endpoints
// app.post('/api/sched', apptCtrl.createAppt)
// app.get('/api/scheduled/:id', apptCtrl.getAppt)
// app.put('/api/scheduled/:id', apptCtrl.updateAppt)
// app.delete('/api/sched/:id', apptCtrl.deleteAppt)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'))
})


app.listen(SERVER_PORT, console.log(`Server running on ${SERVER_PORT}, roger`))