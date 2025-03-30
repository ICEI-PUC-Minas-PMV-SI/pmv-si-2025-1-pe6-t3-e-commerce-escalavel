import swaggerJsdoc from 'swagger-jsdoc';


const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API E-commerce',
      version: '1.0.0',
      description: 'Documentação da API de usuários'
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Servidor local'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: ['../src/routes/*.js'], // Caminho para seus arquivos de rotas
};

const specs = swaggerJsdoc(options);

export default specs;