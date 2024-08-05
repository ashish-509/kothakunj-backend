CREATE TABLE bookings (
    booking_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    room_id INT NOT NULL,
    booking_date DATE NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status VARCHAR(50) NOT NULL
);

CREATE TABLE flats (
    flat_id SERIAL PRIMARY KEY,
    location_id INT NOT NULL,
    gharbeti_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price_per_month DECIMAL(10, 2) NOT NULL,
    available_from DATE,
    available_to DATE,
    room_size DECIMAL(7, 2)
);

CREATE TABLE gharbeti (
    gharbeti_id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(15),
    address TEXT,
    email VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE locations (
    location_id SERIAL PRIMARY KEY,
    city VARCHAR(255) NOT NULL,
    area VARCHAR(255) NOT NULL
);

CREATE TABLE reviews (
    review_id SERIAL PRIMARY KEY,
    room_id INT NOT NULL,
    user_id INT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    FOREIGN KEY (room_id) REFERENCES room(room_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(15),
    address TEXT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE room (
    room_id SERIAL PRIMARY KEY,
    city VARCHAR(100) NOT NULL,
    area VARCHAR(100) NOT NULL,
    bedrooms INT NOT NULL,
    bathrooms INT NOT NULL,
    room_size INT NOT NULL,
    kitchen_rooms INT NOT NULL,
    extra_room BOOLEAN NOT NULL,
    rent NUMERIC(10, 2) NOT NULL,
    price_range VARCHAR(100),
    amenities TEXT,
    furnished BOOLEAN NOT NULL,
    preferred_gender VARCHAR(10),
    description TEXT,
    house_front_picture VARCHAR(255),
    gallery TEXT[],
    location_id INT REFERENCES locations(location_id),
    user_id INT REFERENCES users(user_id)
);
