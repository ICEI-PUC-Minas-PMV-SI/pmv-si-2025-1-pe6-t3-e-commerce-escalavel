  // config.js
import dotenv from 'dotenv';
dotenv.config(); // Carrega as variáveis do .env

export default {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'chave_jwt_padrao_se_não_definida',
  jwtExpiration: '10h',
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5500' // <- Aqui será usado no resetLink
};
