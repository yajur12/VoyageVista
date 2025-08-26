import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import tourRoute from './routes/tours.js';
import userRoute from './routes/users.js';
import authRoute from './routes/auth.js';
import reviewRoute from './routes/reviews.js';
import bookingRoute from './routes/bookings.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
    origin: true, // This will reflect the request origin
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Access-Control-Allow-Credentials'],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
    maxAge: 86400 // Increase preflight cache time to 24 hours
};

app.options('*', cors(corsOptions));

// database connection
mongoose.set('strictQuery', false);
const connect = async() => {
    try{
        
        await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });

        console.log('MongoDB database connected');
    }catch (err){
        console.log("MongoDB database connection failed");
    }
}

// middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Enable pre-flight requests for all routes


// routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/tours", tourRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/booking", bookingRoute);

app.listen(port, () => {
    connect();
    console.log('Server listening on port', port);
})
