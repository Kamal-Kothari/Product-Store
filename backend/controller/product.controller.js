import Product from "../models/product.model.js";
import mongoose from 'mongoose';

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.log("Error in fetching products: ", error.message);
        res.status(500).json({ success: false, message: 'Internal server error' });

    }
}

export const createProduct = async (req, res) => {
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

}

export const updateProduct = async (req, res) => {
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
}

export const deleteProduct = async (req, res) => {
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
}