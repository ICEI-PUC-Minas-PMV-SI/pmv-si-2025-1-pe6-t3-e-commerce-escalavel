// middleware/adminMiddleware.js
export const adminMiddleware = (req, res, next) => {
    // Verifica se o usuário é um administrador
    if (req.user.perfil !== 'admin') {
      return res.status(403).json({ error: 'Acesso negado. Você não é um administrador.' });
    }
  
    next(); // Passa para o próximo middleware ou rota
  };