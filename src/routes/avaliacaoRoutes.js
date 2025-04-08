import express from 'express';
import {
  criarAvaliacao,
  listarAvaliacoes,
  listarTodasAvaliacoes
} from '../controllers/avaliacaoController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/avaliacoes', listarTodasAvaliacoes); // <- nova rota
router.post('/avaliacoes', authMiddleware, criarAvaliacao);
router.get('/avaliacoes/:produtoId', listarAvaliacoes);


export default router;
