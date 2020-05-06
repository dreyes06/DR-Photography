const bcrypt = require('bcryptjs')

module.exports = {
    register: async(req, res) => {
            const {email, password, firstName, lastName} = req.body,
                  db = req.app.get('db')
    
            const existingUser = await db.users.verify_user(email)
                if(existingUser[0]){
                    return  res.status(400).json('Email already in use.')
                }
            
            let salt = bcrypt.genSaltSync(10)
            let hash = bcrypt.hashSync(password, salt)
            const newUser = await db.users.add_user(email, hash, firstName, lastName)

            let userCart = await db.cart.create_cart(newUser[0].user_id)
            let sessionUser = {...newUser[0], ... userCart[0]}

            delete newUser[0].password
            req.session.user = sessionUser
            console.log(req.session.user)
            res.status(201).json(req.session.user)
    },
    login: async(req, res) => {
            const {email, password} = req. body,
                db = req.app.get('db')

            let existingUser = await db.users.verify_user(email)
            if(!existingUser[0]){
                return res.status(400).json('Email does not exist')
            }

            const verified = bcrypt.compareSync(password, existingUser[0].password)
            if(!verified){
                res.status(401).json('Passowrd incorrect')
            }

            let userCart = await db.cart.get_cart_id(existingUser[0].user_id)
            let sessionUser = {...existingUser[0], ... userCart[0]}

            delete existingUser[0].password
            req.session.user = sessionUser
            console.log(req.session.user)
            res.status(202).json(req.session.user)
    },
    logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    },
    updateUser: (req, res) => {
        const {id} = req.params,
              {email} = req.body
              db = req.app.get('db');
        
        db.users.update_first_name(email, id)
        .then(user => res.status(200).json(user))
        .catch(err => console.log(err));
    }
}