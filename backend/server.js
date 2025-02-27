import express from 'express';
import dotenv from 'dotenv';
dotenv.config();  // Load environment variables from .env file once before importing anything else
//All subsequent modules will have access to process.env.

import connectDB from './config/db.js';

connectDB();// Connect to MongoDB before starting the server

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
