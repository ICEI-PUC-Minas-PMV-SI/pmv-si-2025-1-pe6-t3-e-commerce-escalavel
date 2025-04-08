// cartRoutes.js

import express from 'express';
import {
  addToCart,
  getCart,
  getAllCarts,  // Listar todos os carrinhos
  updateCartItem,
  removeCartItem,
} from '../controllers/cartController.js';

const router = express.Router();

router.post('/carrinho', addToCart);
router.get('/carrinho/:usuarioId', getCart);
router.get('/carrinho', getAllCarts); 
router.put('/carrinho/:id', updateCartItem);
router.delete('/carrinho/:id', removeCartItem);

export default router;
