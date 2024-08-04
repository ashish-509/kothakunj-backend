INSERT INTO locations (city, area, postal_code) VALUES
('Kathmandu', 'Thamel', '44600'),
('Kathmandu', 'Patan', '44700'),
('Kathmandu', 'Bhaktapur', '44800'),
('Kathmandu', 'Kalimati', '44900');


INSERT INTO gharbeti (name, email, phone, address) VALUES
('Ramesh Kumar', 'ramesh.kumar@example.com', '9801000001', 'Thamel, Kathmandu'),
('Sita Sharma', 'sita.sharma@example.com', '9801000002', 'Patan, Kathmandu'),
('Hari Prasad', 'hari.prasad@example.com', '9801000003', 'Bhaktapur, Kathmandu'),
('Gita Rani', 'gita.rani@example.com', '9801000004', 'Kalimati, Kathmandu');


INSERT INTO users (username, email, password, phone_number) VALUES
('ashish', 'ashish@example.com', 'hashedpassword1', '9802000001'),
('ram', 'ram@example.com', 'hashedpassword2', '9802000002'),
('shyam', 'shyam@example.com', 'hashedpassword3', '9802000003'),
('sita', 'sita@example.com', 'hashedpassword4', '9802000004');


INSERT INTO room (location_id, user_id, title, description, price_per_month, available_from, available_to, room_size) VALUES
(1, 1, 'Cozy Room in Thamel', 'A small, cozy room in the heart of Thamel. Ideal for solo travelers.', 15000.00, '2024-08-01', '2024-12-31', 200),
(2, 2, 'Spacious Room in Patan', 'A spacious room with modern amenities in Patan.', 20000.00, '2024-07-01', '2024-12-31', 300),
(3, 3, 'Comfortable Room in Bhaktapur', 'A comfortable and quiet room in Bhaktapur.', 18000.00, '2024-09-01', '2024-12-31', 250),
(4, 4, 'Affordable Room in Kalimati', 'An affordable room with basic facilities in Kalimati.', 12000.00, '2024-08-15', '2024-12-31', 180);


INSERT INTO reviews (room_id, user_id, rating, comment) VALUES
(1, 1, 5, 'Great place to stay! Very convenient location.'),
(2, 2, 4, 'Nice room but a bit pricey.'),
(3, 3, 3, 'Average experience, room was okay.'),
(4, 4, 5, 'Excellent value for money. Highly recommended!');


INSERT INTO flats (location_id, gharbeti_id, title, description, price_per_month, available_from, available_to, room_size) VALUES
(1, 1, 'Luxury Flat in Thamel', 'A luxury flat with all modern amenities. Perfect for families.', 50000.00, '2024-07-01', '2025-06-30', '3 BHK'),
(2, 2, 'Modern Flat in Patan', 'A modern flat with 2 bedrooms and 1 bathroom.', 35000.00, '2024-08-01', '2025-06-30', '2 BHK'),
(3, 3, 'Spacious Flat in Bhaktapur', 'A spacious flat with a large living area.', 45000.00, '2024-09-01', '2025-06-30', '3 BHK'),
(4, 4, 'Comfortable Flat in Kalimati', 'A comfortable flat with easy access to public transport.', 30000.00, '2024-10-01', '2025-06-30', '2 BHK');


INSERT INTO bookings (room_id, user_id, booking_date, start_date, end_date, status) VALUES
(1, 1, '2024-07-01 10:00:00', '2024-08-01', '2024-08-15', 'Confirmed'),
(2, 2, '2024-07-15 15:30:00', '2024-08-01', '2024-08-31', 'Pending'),
(3, 3, '2024-08-01 09:00:00', '2024-09-01', '2024-09-15', 'Cancelled'),
(4, 4, '2024-08-10 11:00:00', '2024-09-01', '2024-09-30', 'Confirmed');
