CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(200) NOT NULL,
    password VARCHAR(200) NOT NULL,
    isAdmin BOOLEAN,
    first_name VARCHAR(100),
    last_name VARCHAR(100)

);

CREATE TABLE service(
    service_id SERIAL PRIMARY KEY,
    user_id INT REFRENCES users(user_id),
);
