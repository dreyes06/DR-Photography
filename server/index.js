require('dotenv').config()
const express = require('express'),
      massive = require('massive'),
      session = require('express-session'),
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
// app.post('/user/register', userCtrl.register)
// app.post('/user/login', userCtrl.login)
// app.get('/user/logout', userCtrl.logout)

//appointment endpoints
// app.post('/api/sched', apptCtrl.createAppt)
// app.get('/api/scheduled/:id', apptCtrl.getAppt)
// app.put('/api/scheduled/:id', apptCtrl.updateAppt)
// app.delete('/api/sched/:id', apptCtrl.deleteAppt)


app.listen(SERVER_PORT, console.log(`Server running on ${SERVER_PORT}, roger`))