// controllers/authController.js
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config.js';

const prisma = new PrismaClient();

// Login do usuário
export const loginUser = async (req, res) => {
  // ⬇️ ADICIONE AQUI
  console.log('🔥 loginUser: rota /login foi chamada');

  try {
    const { email, senha } = req.body;

    // Busca o usuário pelo email
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    const senhaValida = await bcrypt.compare(senha, user.senha);
    if (!senhaValida) {
      return res.status(401).json({ error: 'Senha incorreta.' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, perfil: user.perfil },
      config.jwtSecret,
      { expiresIn: config.jwtExpiration }
    );

    const userSemSenha = { ...user, senha: undefined };

    res.status(200).json({ user: userSemSenha, token });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ error: 'Erro ao fazer login', details: error.message });
  }
};
