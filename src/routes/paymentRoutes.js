import express from 'express';
import {
  createCheckoutSession,
  confirmarPagamento,
  getPedidosUsuario
} from '../controllers/paymentController.js';

import {
  criarAvaliacao,
  getAvaliacoesByProduto,
  getAvaliacoesByProdutos
} from '../controllers/avaliacaoController.js'; // Importe os novos controllers

import { authMiddleware } from '../middleware/authMiddleware.js'; // ✅ certo


const router = express.Router();

// Rota para criar sessão de checkout (protegida por autenticação)
router.post('/pagamento/create-checkout-session', authMiddleware, createCheckoutSession);

router.post('/confirmar/:pedidoId', confirmarPagamento); // Nova rota

router.get('/pedidos/:usuarioId', getPedidosUsuario); // Nova rota


router.post('/avaliacoes', authMiddleware, criarAvaliacao);
router.get('/avaliacoes/produto/:produtoId', getAvaliacoesByProduto);
router.get('/avaliacoes/produtos', getAvaliacoesByProdutos); // Para múltiplos produtos


export default router;
