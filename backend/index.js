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
import paymentRoute from './routes/payment.js';


dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
const corsOptions = {
    origin: "https://voyage-vista-y8xm.vercel.app/", // Allow requests from this origin
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  };


// database connection
mongoose.set('strictQuery', false);
const connect =() => {
    try{
         mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });

        console.log('MongoDB database connected');
    }catch (err){
        console.log("MongoDB database connection failed");
    }
}

app.use(express.json());
// app.use(cors({
//     origin: 'http://localhost:3000', // The frontend's URL (if your frontend is running on this port)
//     methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
//     allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
//   }));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/tours", tourRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/booking", bookingRoute);
app.use("/api/v1/payment", paymentRoute);

app.get('/', (req, res) => {
    res.send('Welcome to the Tour and Travel API!');
  });
  

app.listen(port, () => {
    connect();
    console.log('Server listening on port', port);
})
