CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(200) NOT NULL,
    password VARCHAR(200) NOT NULL,
    isAdmin BOOLEAN,
    first_name VARCHAR(100),
    last_name VARCHAR(100)

);

CREATE TABLE merch(
    merch_id SERIAL PRIMARY KEY,
    name VARCHAR(75) NOT NULL,
    image VARCHAR(250) NOT NULL,
    description TEXT,
    price DECIMAL NOT NULL
);

CREATE TABLE user_cart(
    cart_id SERIAL PRIMARY KEY,
    user_id INT REFRENCES users(user_id),
    paid BOOLEAN
);

CREATE TABLE cart_items (
    cart_item_id SERIAL PRIMARY KEY,
    cart_id INT REFRENCES user_cart(cart_id),
    merch_id INT REFRENCES merch(merch_id),
    qty INT,
    price DECIMAL
);

-- CREATE TABLE event(
--     event_id SERIAL PRIMARY KEY,
--     user_id INT REFRENCES users(user_id),
--     title VARCHAR(100) NOT NULL,
--     all_day BOOLEAN,
--     start_date DATE NOT NULL DEFAULT CURRENT_DATE,
--     end_date DATE NOT NULL DEFAULT CURRENT_DATE,
--     start_at TIME NOT NULL,
--     end_at TIME NOT NULL 
-- );

-- CREATE TABLE admin(
--     admin_id SERIAL PRIMARY KEY,

-- )