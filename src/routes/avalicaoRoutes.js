// routes/avaliacaoRoutes.js
import express from 'express';
import { criarAvaliacao, listarAvaliacoes } from '../controllers/avaliacaoController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Criar nova avaliação (usuário logado)
router.post('/avaliacoes', authMiddleware, criarAvaliacao);

// Listar avaliações de um produto
router.get('/avaliacoes/:produtoId', listarAvaliacoes);

export default router;
