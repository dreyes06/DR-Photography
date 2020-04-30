INSERT INTO user_cart(user_id, paid)
VALUES ($1, false)
RETURNING cart_id, paid;