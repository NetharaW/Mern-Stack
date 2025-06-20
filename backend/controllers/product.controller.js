import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getProducts = async(req,res) => {
    try{
        const products = await Product.find({})

        res.status(200).json({
            success: true,
            message:"Product fetched successfully",
            data: products
        })
    }catch (error){
        console.error("Error in fetching products : ",error.message);
        res.status(500).json({
            success:false,
            message: "Server Error"
        })
    }
}

export const getProductsById = async(req,res) => {
    const {id} = req.params

    try{
        const product = await Product.findById(id)

        res.status(200).json({
            success:true,
            message:"Product fetched successfully",
            data:product
        })
    
    }catch(error){
        console.error("Error in fetching prodcuts: ",error.message);
        res.status(500).json({
            success:false,
            message: "Server Error"
        })
    }
}

export const createProducts = async (req,res) => {
    const product = req.body; //user will send data

    if(!product.title || !product.image || !product.description || !product.price){
        return res.status(400).json({
            success:false,
            message:"Please provide all fields"
        })
    }
    const newProduct = new Product(product)
    
    try{
        await newProduct.save()
        res.status(201).json({
            success:true,
            message: "Product created successfully",
            data:newProduct
        })
    }catch(error){
        console.error("Error in create Product: ",error.message);
        res.status(500).json({
            success:false,
            message:"server error"
        })
    }
}

export const updateProducts = async (req,res) => {
    const { id } = req.params
    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({
            success:false,
            message: "Invalid product id"
        })
    }
    try{
        await Product.findByIdAndUpdate(id,product,{new:true});

        const allProducts = await Product.find();

        res.status(200).json({
            success:true,
            message:"Product Updated successfully",
            data:allProducts
        })

    }catch(error){
        console.error("error in Create product",error.message);
        res.status(500).json({
            success:false,
            message:"Server error"
        })
    }
}


export const deleteProducts = async (req,res) => {
    const {id }=req.params

    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({
            succes:true,
            message:"Product deleted"
        })
    }catch(error){
        console.error("Error in deleting product: ",error.message);
        res.status(404).json({
            succes:false,
            message:"Product not found"
        })
    }
}