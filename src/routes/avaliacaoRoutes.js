import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js'; 
import { criarAvaliacao } from '../controllers/paymentController.js'; // <- Pega do paymentController

const router = express.Router();

// Criar nova avaliação
router.post('/', authMiddleware, criarAvaliacao);

export default router;
