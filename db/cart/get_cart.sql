SELECT * FROM cart_items
JOIN merch ON cart_items.merch_id = merch.merch_id
WHERE cart_items.cart_id = $1; 