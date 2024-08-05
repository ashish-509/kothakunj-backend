INSERT INTO bookings (user_id, room_id, booking_date, start_date, end_date, status)
VALUES
(1, 101, '2024-08-01', '2024-08-05', '2024-08-10', 'Confirmed'),
(2, 102, '2024-08-02', '2024-08-12', '2024-08-15', 'Pending'),
(3, 103, '2024-08-03', '2024-08-20', '2024-08-25', 'Cancelled'),
(4, 104, '2024-08-04', '2024-08-25', '2024-08-30', 'Confirmed'),
(5, 105, '2024-08-05', '2024-09-01', '2024-09-05', 'Confirmed');

INSERT INTO flats (location_id, gharbeti_id, title, description, price_per_month, available_from, available_to, room_size)
VALUES
(1, 1, 'Cozy Apartment in Thamel', 'A nice and cozy apartment in the heart of Kathmandu.', 15000, '2024-07-01', '2024-12-31', 1200),
(2, 2, 'Lakeside Studio', 'A beautiful studio with a view of the lake.', 10000, '2024-08-01', '2024-12-31', 800),
(3, 3, 'Modern Flat in Patan', 'A modern flat with all amenities.', 20000, '2024-07-15', '2024-11-30', 1500),
(4, 4, 'Spacious Flat in Bhaktapur', 'A spacious flat close to the historical sites.', 18000, '2024-09-01', '2024-12-31', 1400),
(5, 5, 'Peaceful Flat in Budhanilkantha', 'A peaceful flat near the jungle.', 12000, '2024-10-01', '2025-01-31', 1000);

INSERT INTO gharbeti (first_name, last_name, phone_number, address, email)
VALUES
('Ram', 'Sharma', '1231231234', 'Kathmandu', 'ram@example.com'),
('Sita', 'Thapa', '2342342345', 'Pokhara', 'sita@example.com'),
('Hari', 'Lama', '3453453456', 'Lalitpur', 'hari@example.com'),
('Gita', 'Rai', '4564564567', 'Bhaktapur', 'gita@example.com'),
('Kiran', 'Gurung', '5675675678', 'Chitwan', 'kiran@example.com');

INSERT INTO reviews (room_id, user_id, rating, comment)
VALUES
(1, 1, 5, 'Great place, highly recommend!'),
(2, 2, 4, 'Nice location, but a bit noisy.'),
(3, 3, 3, 'Average experience.'),
(4, 4, 4, 'Good value for money.'),
(5, 5, 5, 'Perfect for a peaceful stay.');

INSERT INTO users (first_name, last_name, phone_number, address, email, password)
VALUES
('John', 'Doe', '1234567890', 'Kathmandu', 'john@example.com', 'password123'),
('Jane', 'Smith', '0987654321', 'Pokhara', 'jane@example.com', 'password456'),
('Alice', 'Brown', '1112223334', 'Lalitpur', 'alice@example.com', 'password789'),
('Bob', 'Johnson', '4445556667', 'Bhaktapur', 'bob@example.com', 'passwordabc'),
('Charlie', 'Davis', '7778889990', 'Kathmandu', 'charlie@example.com', 'passworddef');

INSERT INTO locations (city, area)
VALUES
('Kathmandu', 'Thamel'),
('Pokhara', 'Lakeside'),
('Lalitpur', 'Patan'),
('Bhaktapur', 'Durbar Square'),
('Kathmandu', 'Budhanilkantha');

INSERT INTO room (city, area, bedrooms, bathrooms, room_size, kitchen_rooms, extra_room, rent, price_range, amenities, furnished, preferred_gender, description, house_front_picture, gallery, location_id, user_id)
VALUES
('Kathmandu', 'Thamel', 2, 2, 1200, 1, FALSE, 15000, '15000-20000', 'WiFi, Parking', TRUE, 'Any', 'Cozy apartment in the city center', 'thamel1.jpg', '{thamel1_1.jpg, thamel1_2.jpg}', 1, 1),
('Pokhara', 'Lakeside', 1, 1, 800, 1, FALSE, 10000, '10000-15000', 'WiFi, AC', TRUE, 'Female', 'Beautiful studio with a lake view', 'lakeside1.jpg', '{lakeside1_1.jpg, lakeside1_2.jpg}', 2, 2),
('Lalitpur', 'Patan', 3, 2, 1500, 1, TRUE, 20000, '20000-25000', 'Parking, Garden', TRUE, 'Any', 'Modern flat with all amenities', 'patan1.jpg', '{patan1_1.jpg, patan1_2.jpg}', 3, 3),
('Bhaktapur', 'Durbar Square', 2, 2, 1400, 1, TRUE, 18000, '15000-20000', 'WiFi, Balcony', FALSE, 'Any', 'Spacious flat near historical sites', 'bhaktapur1.jpg', '{bhaktapur1_1.jpg, bhaktapur1_2.jpg}', 4, 4),
('Kathmandu', 'Budhanilkantha', 1, 1, 1000, 1, FALSE, 12000, '10000-15000', 'Garden, Parking', TRUE, 'Any', 'Peaceful flat near the jungle', 'Budhanilkantha1.jpg', '{Budhanilkantha1_1.jpg, Budhanilkantha1_2.jpg}', 5, 5);
