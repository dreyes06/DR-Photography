UPDATE user_cart
SET paid = true
WHERE user_id = $1 AND paid = false;