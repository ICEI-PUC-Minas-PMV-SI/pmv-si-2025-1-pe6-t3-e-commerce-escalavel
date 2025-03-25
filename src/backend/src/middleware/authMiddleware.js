
import jwt from 'jsonwebtoken';
import config from '../config.js';

export const authMiddleware = (req, res, next) => {
  // Obtém o token do cabeçalho da requisição
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Acesso negado. Nenhum token fornecido.' });
  }

  try {
    // Verifica o token
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded; // Adiciona o payload do token à requisição
    next(); // Passa para o próximo middleware ou rota
  } catch (error) {
    res.status(400).json({ error: 'Token inválido.' });
  }
};