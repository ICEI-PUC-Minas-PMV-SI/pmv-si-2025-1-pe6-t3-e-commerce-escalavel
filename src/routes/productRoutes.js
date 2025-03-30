import express from 'express';
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';

import { authMiddleware } from '../middleware/authMiddleware.js'; 
import { adminMiddleware } from '../middleware/adminMiddleware.js';


const router = express.Router();

// Rotas públicas
router.get('/produtos', getProducts);

// Rotas protegidas (apenas admin)
router.post('/produtos', authMiddleware, adminMiddleware, createProduct);
router.put('/produtos/:id', authMiddleware, adminMiddleware, updateProduct);
router.delete('/produtos/:id', authMiddleware, adminMiddleware, deleteProduct);


export default router;