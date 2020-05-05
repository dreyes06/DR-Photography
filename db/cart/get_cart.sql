SELECT * FROM cart_items
JOIN merch ON cart_items.merch_id = merch.merch_id
JOIN user_cart ON cart_items.cart_id = user_cart.cart_id
WHERE cart_items.cart_id = $1 AND user_cart.paid = false; 