import express from 'express';
// You'll need to import authMiddleware and authorizeRoles if they are not in product.controller.js
import { authMiddleware, authorizeRoles } from '../middleware/authMiddleware.js'; // Adjust path if needed
import { createProducts, deleteProducts, getProducts, getProductsById, updateProducts } from '../controllers/product.controller.js';

const router = express.Router();

// Route for getting all products
// Uses authMiddleware and authorizes 'customer' or 'admin' roles, as shown in the screenshot
/**
 * @swagger
 * /api/products:
 * get:
 * summary: Get all products
 * tags: [Products]
 * responses:
 * 200:
 * description: A list of all products
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * type: object
 * properties:
 * _id:
 * type: string
 * name:
 * type: string
 * price:
 * type: number
 * image:
 * type: string
 * 500:
 * description: Server error
 */
router.get('/', authMiddleware, authorizeRoles('customer', 'admin'), getProducts);

// Route for getting a single product by ID
/**
 * @swagger
 * /api/products/{id}:
 * get:
 * summary: Get a single product by ID
 * tags: [Products]
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * description: The product ID
 */
router.get('/:id', getProductsById); // Often doesn't require roles for public viewing

// Route for creating a new product (typically only for admins)
// Assumes only 'admin' role can create products
router.post('/', authMiddleware, authorizeRoles('admin'), createProducts);

// Route for updating a product by ID (typically only for admins)
router.put('/:id', authMiddleware, authorizeRoles('admin'), updateProducts);
// Or for partial updates
// router.patch('/:id', authMiddleware, authorizeRoles('admin'), updateProducts);

// Route for deleting a product by ID (typically only for admins)
router.delete('/:id', authMiddleware, authorizeRoles('admin'), deleteProducts);

export default router;