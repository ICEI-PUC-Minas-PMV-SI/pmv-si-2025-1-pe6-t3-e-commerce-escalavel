import express from 'express';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import vendaRoutes from './routes/vendaRoutes.js';
import 'dotenv/config';

const app = express();
app.use(express.json());

// Rotas
app.use('/api', userRoutes); // Rotas de usuários
app.use('/api', productRoutes); // Rotas de produtos
app.use('/api', cartRoutes); // Rotas do carrinho
app.use('/api', vendaRoutes);

// Iniciar servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});