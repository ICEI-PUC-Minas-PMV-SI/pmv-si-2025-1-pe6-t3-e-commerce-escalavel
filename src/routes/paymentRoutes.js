// routes/paymentRoutes.js
import express from 'express';
import { checkout, getUserOrders } from '../controllers/paymentController.js';

const router = express.Router();

// Inicia o checkout (gera pagamento simulado e registra pedido)
router.post('/checkout', checkout);

// Histórico de pedidos do usuário autenticado
router.get('/me/pedidos', getUserOrders);

export default router;
