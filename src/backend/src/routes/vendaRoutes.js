import express from 'express';
import { criarVenda } from '../controllers/vendaController.js';

const router = express.Router();

// Criar uma nova venda
router.post('/vendas', criarVenda);

export default router;

