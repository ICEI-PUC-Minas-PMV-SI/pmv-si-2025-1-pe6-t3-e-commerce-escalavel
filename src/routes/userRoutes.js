import express from 'express';
import {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';
import { loginUser } from '../controllers/authController.js'; 
import { authMiddleware } from '../middleware/authMiddleware.js'; 
import { adminMiddleware } from '../middleware/adminMiddleware.js';

const router = express.Router();

// Rota pública: Criar usuário (não requer autenticação)
router.post('/usuarios', createUser);

// Rota pública: Login do usuário (não requer autenticação)
router.post('/login', loginUser);

// Rotas protegidas (requerem autenticação)
router.get('/usuarios', authMiddleware, adminMiddleware, getUsers); // Listar usuários (apenas admin)
router.put('/usuarios/:id', authMiddleware, updateUser); // Atualizar usuário (protegido)
router.delete('/usuarios/:id', authMiddleware, deleteUser); // Deletar usuário (protegido)

// Rota apenas para administradores
router.get('/admin/usuarios', authMiddleware, adminMiddleware, getUsers); // Listar usuários (apenas admin)
router.put('/admin/usuarios/:id', authMiddleware, adminMiddleware, updateUser); // Atualizar usuário (apenas admin)
router.delete('/admin/usuarios/:id', authMiddleware, adminMiddleware, deleteUser); // Deletar usuário (apenas admin)

export default router;