// routes/avaliacaoRoutes.js
import express from 'express';
import { criarAvaliacao, listarAvaliacoes } from '../controllers/avaliacaoController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/avaliacoes', authMiddleware, criarAvaliacao);
router.get('/avaliacoes/:produtoId', listarAvaliacoes);

export default router;
