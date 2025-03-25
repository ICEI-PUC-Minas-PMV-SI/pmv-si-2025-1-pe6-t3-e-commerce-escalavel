import express from 'express';
import {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
} from '../controllers/cartController.js';

const router = express.Router();


router.post('/carrinho', addToCart); 
router.get('/carrinho/:usuarioId', getCart); 
router.put('/carrinho/:id', updateCartItem); 
router.delete('/carrinho/:id', removeCartItem); 
/*router.post('/vendas', processSale); // Nova rota para vendas*/

export default router;