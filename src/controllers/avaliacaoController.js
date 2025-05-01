// controllers/avaliacaoController.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Criar avaliação
export const criarAvaliacao = async (req, res) => {
  try {
    const { produtoId, nota, comentario } = req.body;
    const usuarioId = req.user.id;

    const avaliacao = await prisma.avaliacao.create({
      data: {
        usuarioId,
        produtoId,
        nota,
        comentario,
      },
    });

    res.status(201).json(avaliacao);
  } catch (error) {
    console.error('Erro ao criar avaliação:', error);
    res.status(500).json({ error: 'Erro ao criar avaliação', details: error.message });
  }
};

// Listar avaliações de um produto
export const listarAvaliacoes = async (req, res) => {
  try {
    const { produtoId } = req.params;

    const avaliacoes = await prisma.avaliacao.findMany({
      where: { produtoId },
      include: { usuario: true },
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json(avaliacoes);
  } catch (error) {
    console.error('Erro ao listar avaliações:', error);
    res.status(500).json({ error: 'Erro ao listar avaliações', details: error.message });
  }
};

// Listar todas as avaliações (sem filtro de produto)
export const listarTodasAvaliacoes = async (req, res) => {
  try {
    const avaliacoes = await prisma.avaliacao.findMany({
      include: { usuario: true, produto: true },
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json(avaliacoes);
  } catch (error) {
    console.error('Erro ao listar todas as avaliações:', error);
    res.status(500).json({ error: 'Erro ao listar todas as avaliações', details: error.message });
  }
};

// Obter avaliações por produto (para o modal)
export const getAvaliacoesByProduto = async (req, res) => {
  try {
    const { produtoId } = req.params;
    
    const avaliacoes = await prisma.avaliacao.findMany({
      where: { produtoId },
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    res.status(200).json(avaliacoes);
  } catch (error) {
    console.error('Erro ao buscar avaliações:', error);
    res.status(500).json({
      error: 'Erro ao buscar avaliações',
      details: error.message
    });
  }
};

// Obter avaliações para múltiplos produtos (para a lista de produtos)
export const getAvaliacoesByProdutos = async (req, res) => {
  try {
    const { ids } = req.query;
    const produtoIds = ids.split(',');
    
    const avaliacoes = await prisma.avaliacao.findMany({
      where: { 
        produtoId: { in: produtoIds }
      },
      include: {
        usuario: {
          select: {
            id: true,
            nome: true
          }
        }
      }
    });
    
    res.status(200).json(avaliacoes);
  } catch (error) {
    console.error('Erro ao buscar avaliações:', error);
    res.status(500).json({
      error: 'Erro ao buscar avaliações',
      details: error.message
    });
  }
};