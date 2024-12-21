import express, { urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoute from './routes/user.route.js';
import expenseRoute from './routes/expense.route.js';

dotenv.config({})

const app = express();
const PORT = process.env.PORT || 8000;

const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true
}

// Middlewares
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));

// APIs
app.use("/api/v1/user", userRoute);
app.use("/api/v1/expense", expenseRoute);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server listening at port - ${PORT}`)
})