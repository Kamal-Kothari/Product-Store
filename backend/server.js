import express from 'express';
import dotenv from 'dotenv';
dotenv.config();  // Load environment variables from .env file once before importing anything else
//All subsequent modules will have access to process.env.

import Product from './models/product.model.js';

import connectDB from './config/db.js';
import mongoose from 'mongoose';
import productRoutes from './routes/product.route.js';

connectDB();// Connect to MongoDB before starting the server

const app = express();

app.use(express.json());  // to parse raw JSON data from the request body

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/api/products', productRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
