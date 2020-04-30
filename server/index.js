require('dotenv').config()
const express = require('express'),
      massive = require('massive'),
      session = require('express-session'),
      userCtrl = require('./Controllers/userCtrl'),
      apptCtrl = require('./Controllers/apptCtrl'),
      cartCtrl = require('./Controllers/cartController'),
      {SERVER_PORT, SESSION_SECRET, DB_STRING} = process.env
      app = express();

app.use(express.json())

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

//cart endpoints
app.get('/api/merch', cartCtrl.getMerch)
app.post('/api/payment', cartCtrl.completePayment)
app.post('/api/cart-item', cartCtrl.addToCart)
app.get('/api/cart/:id', cartCtrl.getCart)
app.delete('/api/cart-item/:id', cartCtrl.deleteCartItem)

//appointment endpoints
// app.post('/api/sched', apptCtrl.createAppt)
// app.get('/api/scheduled/:id', apptCtrl.getAppt)
// app.put('/api/scheduled/:id', apptCtrl.updateAppt)
// app.delete('/api/sched/:id', apptCtrl.deleteAppt)


app.listen(SERVER_PORT, console.log(`Server running on ${SERVER_PORT}, roger`))