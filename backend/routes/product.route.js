import express from 'express';

import { createProducts,deleteProducts,getProducts,getProductsById,updateProducts } from '../controllers/product.controller.js';
const router = express.Router();

router.get('/',getProducts);

router.get('/',getProductsById);

router.get('/',createProducts);

router.get('/',updateProducts);

router.get('/',deleteProducts);

export default router;