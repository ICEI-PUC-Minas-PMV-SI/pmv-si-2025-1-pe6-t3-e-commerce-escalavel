import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import avaliacaoRoutes from './routes/avaliacaoRoutes.js';
import authRoutes from './routes/authRoutes.js';

import swaggerUi from 'swagger-ui-express';
import specs from './swagger.js';
import config from './config.js'; // Configurações globais (como JWT secret)

const app = express();
const port = 3000;

// Caminho absoluto do diretório atual (necessário com ES Modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares globais
app.use(cors());
app.use(express.json());

// Servir arquivos estáticos da pasta "frontend"
app.use(express.static(path.join(__dirname, 'frontend')));


// Rotas da API
app.use('/api', userRoutes);
app.use('/api', productRoutes); 
app.use('/api', cartRoutes);
app.use('/api', paymentRoutes);
app.use('/api/avaliacoes', avaliacaoRoutes);
app.use('/auth', authRoutes);

// Documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Inicializar servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
