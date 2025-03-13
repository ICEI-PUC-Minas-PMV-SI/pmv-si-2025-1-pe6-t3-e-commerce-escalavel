require ('dotenv').config();
const express = require('express');
const app = express();

// Middleware para tratar JSON
app.use(express.json());

app.listen(process.env.PORT, ()=> {console.log("Servidor rodando...")})