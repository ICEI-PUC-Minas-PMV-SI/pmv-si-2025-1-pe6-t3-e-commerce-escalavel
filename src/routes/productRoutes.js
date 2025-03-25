import express from 'express';
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';

const router = express.Router();

// Rotas para produtos
router.post('/produtos', createProduct);
router.get('/produtos', getProducts);
router.put('/produtos/:id', updateProduct);
router.delete('/produtos/:id', deleteProduct);

export default router;