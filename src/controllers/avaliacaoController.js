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
