import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './src/config/db.js'; // Import PostgreSQL pool
import userRouter from './src/routes/user.routes.js';
import roomRouter from './src/routes/room.routes.js';
import reviewRouter from './src/routes/review.routes.js';
import locationRoutes from './src/routes/location.routes.js';
import gharbetiRouter from './src/routes/gharbeti.routes.js';
import flatRoutes from './src/routes/flat.routes.js';
import bookingRouter from './src/routes/booking.routes.js';
import mailRoutes from './src/routes/mail.routes.js'; // Import mail routes

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Server is ready.');
});

app.use('/api/v1/users', userRouter);
app.use('/api/v1/rooms', roomRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/locations', locationRoutes);
app.use('/api/v1/gharbetis', gharbetiRouter);
app.use('/api/v1/flats', flatRoutes);
app.use('/api/v1/bookings', bookingRouter);
app.use('/api/v1/mail', mailRoutes); // Register mail routes

// Test the database connection when the server starts
async function testConnection() {
    try {
        const client = await pool.connect();
        console.log('Connected to the PostgreSQL database.');
        client.release();
    } catch (error) {
        console.error('Error while connecting to database:', error);
        process.exit(1); // Exit process if connection fails
    }
}

// Uncomment this line to test database connection on server start
// testConnection();

app.listen(port, () => {
    console.log(`Server started at port : ${port}`);
});
