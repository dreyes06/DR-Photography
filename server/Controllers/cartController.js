const { SECRET_KEY } = process.env,
  stripe = require("stripe")(SECRET_KEY);

module.exports = {
  completePayment: async (req, res) => {
    const { id } = req.params,
      db = req.app.get("db");

    const { token, amount } = req.body;

    const charge = stripe.charges.create(
      {
        amount,
        currency: "usd",
        source: token.id,
        description: "Charge",
      },
      function (err, charge) {
        if (err) {
          return res.sendStatus(500);
        }
        // res.sendStatus(200);
      }
    );

    db.cart.complete_purchase(id);

    let userCart = await db.cart.create_cart(id);
    let sessionUser = { ...req.session.user, cart_id: userCart[0].cart_id };
    req.session.user = sessionUser;
    res.status(200).json(req.session.user);
  },
  getMerch: (req, res) => {
    const db = req.app.get("db");

    db.merch
      .get_merch()
      .then((merch) => res.status(200).json(merch))
      .catch((err) => res.status(500).json(err));
  },
  addToCart: (req, res) => {
    const { cart_id, merch_id, price } = req.body,
      db = req.app.get("db");
      console.log(req.body)

    db.cart
      .add_to_cart([cart_id, merch_id, price])
      .then(() => res.sendStatus(200))
      .catch((err) => res.status(500).json(err));
  },
  createCart: (req, res) => {
    const { user_id } = req.body,
      db = req.app.get("db");
    db.cart
      .create_cart([user_id])
      .then((cart) => res.status(200).json(cart))
      .catch((err) => console.log(err));
  },
  getCart: (req, res) => {
    const { id } = req.params,
      db = req.app.get("db");

    db.cart
      .get_cart(id)
      .then((items) => res.status(200).json(items))
      .catch((err) => res.status(500).json(err));
  },
  deleteCartItem: (req, res) => {
    const { id } = req.params,
      db = req.app.get("db");

    db.cart
      .delete_cart(id)
      .then(() => res.sendStatus(200))
      .catch((err) => res.status(500).json(err));
  },
};
