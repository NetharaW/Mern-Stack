import express from 'express';
import dotenv from 'dotenv';
import cors from  'cors';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js'
dotenv.config()

const app =express();
const PORT= 5173;


//enable CORS
app.use(cors());

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Welcome, server is live")
})

/*
//in-memorty products array
let products= [];
let currentId = 1;

//Create
app.post("api/products",(req,res) => {
    console.log('req',req)
    const product={id:currentId++,...req.body};
    products.push(product);
    res.status(201).json(product);
});

//Read all
app.get("/",(req,res)=>{
    res.send("welcome ,Server is live")
})

//Read one
app.get("api/products/:id",(req,res)=>{
    const product=products.find(p => p.id == req.params.id);
    if(product) res.json(product);
    else res.status(404).json({mssage:"Product not found"});
});

//update
app.put("api/product/:id",(req,res)=>{
    const index = products.findIndex(p=> p.id == req.params.id);
    if(index!== -1){
        products[index]= {...products[index],...req.body};
        res.json(prodcuts[index]);
    }else{
        res.status(404).json({message:"Product not found"})
    }
});

//delete
app.delete("/api/products/:id", (req, res) =>{
    const index = products.findindex(p => p.id = req.params.id) ;
    if (index !== -1){
        const deleted = products.splice(index, 1) [0];
        res.json(deleted) }
        else{
        res.status(404).json({ message: "Product not found" });
        }
    });
*/

//route files
app.use("/api/products",productRoutes)
app.listen(PORT, ()=>
{
    connectDB();
    console.log("Server statred at http://localhost:5173")

});