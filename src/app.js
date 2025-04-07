import cors from 'cors';
import express from 'express';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import avaliacaoRoutes from './routes/avaliacaoRoutes.js';
import 'dotenv/config';

import swaggerUi from 'swagger-ui-express';
import specs from './swagger.js';

const app = express();
app.use(express.json());
app.use(cors());


// Rotas
app.use('/api', userRoutes); // Rotas de usuários
app.use('/api', productRoutes); // Rotas de produtos
app.use('/api', cartRoutes); // Rotas do carrinho
app.use('/api', paymentRoutes); //Rotas de pagamento
app.use('/api', avaliacaoRoutes); // Rota avalicao
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Iniciar servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});