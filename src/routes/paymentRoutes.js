// routes/paymentRoutes.js
import express from 'express';
import { processPayment, checkPaymentStatus } from '../controllers/paymentController.js';

const router = express.Router();

// Rotas de pagamento
router.post('/pagamento/processar', processPayment); // Processa o pagamento
router.get('/pagamento/status/:pedidoId', checkPaymentStatus); // Verifica o status do pagamento

export default router;