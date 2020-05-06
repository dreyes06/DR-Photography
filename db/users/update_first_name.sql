UPDATE users
SET email = $1
WHERE user_id = $2;

SELECT user_id, first_name, last_name FROM users
WHERE user_id = $2;