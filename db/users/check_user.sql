SELECT * FROM users u 
JOIN user_cart uc ON u.user_id = uc.user_id
WHERE u.email = $1
AND uc.paid = false;