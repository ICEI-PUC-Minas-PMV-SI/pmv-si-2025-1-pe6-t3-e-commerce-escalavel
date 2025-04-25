// controllers/authController.js
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config.js';
import nodemailer from 'nodemailer';


const prisma = new PrismaClient();

// Login do usuário
export const loginUser = async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Busca o usuário pelo email
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    // Compara a senha fornecida com a senha criptografada
    const senhaValida = await bcrypt.compare(senha, user.senha);

    if (!senhaValida) {
      return res.status(401).json({ error: 'Senha incorreta.' });
    }

    // Gera o token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, perfil: user.perfil }, // Payload do token (inclui o perfil)
      config.jwtSecret, // Chave secreta
      { expiresIn: config.jwtExpiration } // Tempo de expiração
    );

    // Remove a senha da resposta
    const userSemSenha = { ...user, senha: undefined };

    res.status(200).json({ user: userSemSenha, token });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ error: 'Erro ao fazer login', details: error.message });
  }
};


// Esqueci a senha - gera token
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    const token = jwt.sign(
      { id: user.id },
      config.jwtSecret,
      { expiresIn: '1h' } // Token expira em 1 hora
    );

    const resetLink = `http://localhost:5173/forgot-password.html?token=${token}`;

    // Configura o transporte de e-mail (Exemplo usando Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,   // seu email de envio
    pass: process.env.EMAIL_PASS    // senha do app (não a senha normal do gmail)
  }
});

// Configura a mensagem
const mailOptions = {
  from: process.env.EMAIL_USER,
  to: user.email,
  subject: 'Redefinição de senha - TechParts',
  html: `
    <p>Olá, ${user.nome || 'usuário'}!</p>
    <p>Você pediu para redefinir sua senha. Clique no link abaixo para continuar:</p>
    <a href="${resetLink}">Redefinir senha</a>
    <p>Se você não solicitou isso, ignore este e-mail.</p>
  `
};

// Envia o e-mail
await transporter.sendMail(mailOptions);

res.status(200).json({ message: 'Link de redefinição enviado para o e-mail.' });



    console.log(`Link de redefinição de senha: ${resetLink}`);

    res.status(200).json({ message: 'Link de redefinição enviado para o e-mail.' });
  } catch (error) {
    console.error('Erro ao solicitar redefinição de senha:', error);
    res.status(500).json({ error: 'Erro interno', details: error.message });
  }
};

// Redefinir a senha usando o token
export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const decoded = jwt.verify(token, config.jwtSecret);
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: { senha: hashedPassword },
    });

    res.status(200).json({ message: 'Senha redefinida com sucesso.' });
  } catch (error) {
    console.error('Erro ao redefinir senha:', error);
    res.status(400).json({ error: 'Token inválido ou expirado.', details: error.message });
  }
};
