import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { connectDB } from './config/db.js';
import swaggerUiExpress from 'swagger-ui-express';
import swaggerSpec from './swagger.js';

import productRoutes from './routes/product.route.js';
import authRoutes from './routes/auth.route.js';

dotenv.config();

const app = express();

// Allowlisted origins for CORS
const allowedOrigins = [
  'http://localhost:5173',
  'https://mernstackactivity.netlify.app',
];

// CORS Middleware
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps, curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// JSON parser
app.use(express.json());

// Swagger UI
app.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerSpec));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Server is Live');
});

// Start server
const PORT = process.env.PORT || 5173;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server started at http://localhost:${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
