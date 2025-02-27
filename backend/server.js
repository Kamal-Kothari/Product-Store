import express from 'express';
import dotenv from 'dotenv';
dotenv.config();  // Load environment variables from .env file once before importing anything else
//All subsequent modules will have access to process.env.

import Product from './models/product.model.js';

import connectDB from './config/db.js';
import mongoose from 'mongoose';

connectDB();// Connect to MongoDB before starting the server

const app = express();

app.use(express.json());  // to parse raw JSON data from the request body

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.log("Error in fetching products: ", error.message);
        res.status(500).json({ success: false, message: 'Internal server error' });

    }
});

app.post('/api/products', async (req, res) => {
    const product = req.body;
    console.log(product);

    if (!product.name || !product.image || !product.price) {
        return res.status(400).json({ success: false, message: 'Please fill all fields' });
    }

    const newProduct = new Product(product);

    try {
        const savedProduct = await newProduct.save();
        res.status(201).json({ success: true, data: savedProduct });
    } catch (error) {
        console.log("Error in saving product: ", error.message);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }

});

app.patch('/api/products/:id', async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id) ){
        return res.status(404).json({ success: false, message: 'Invalid product id' });
    }
    const product = req.body;
    
    try {
        const updatedProduct=await Product.findByIdAndUpdate(id, product, { new: true, runValidators: true });
        res.status(200).json({ success: true, data: updatedProduct });    
    }
    catch (error) {
        console.log("Error in updating product: ", error.message);
        res.status(500).json({ success: false, message: 'Internal server error' });

    }
});

app.delete('/api/products/:id', async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id) ){
        return res.status(404).json({ success: false, message: 'Invalid product id' });
    }
    
    try {
        const deletedProduct=await Product.findByIdAndDelete(id)    ;
        res.status(200).json({ success: true, data: deletedProduct });    
    }
    catch (error) {
        console.log("Error in deleting product: ", error.message);
        res.status(500).json({ success: false, message: 'Internal server error' });

    }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
