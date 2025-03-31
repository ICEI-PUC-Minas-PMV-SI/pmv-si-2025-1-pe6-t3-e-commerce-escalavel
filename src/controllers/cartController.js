import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Adicionar produto ao carrinho
export const addToCart = async (req, res) => {
  try {
    const { usuarioId, produtoId, quantidade } = req.body;

    // Verifica se o usuário e o produto existem
    const usuario = await prisma.User.findUnique({ where: { id: usuarioId } });
    const produto = await prisma.Product.findUnique({ where: { id: produtoId } });

    if (!usuario || !produto) {
      return res.status(404).json({ error: 'Usuário ou produto não encontrado' });
    }

    // Adiciona o produto ao carrinho
    const itemCarrinho = await prisma.Carrinho.create({
      data: {
        usuarioId,
        produtoId,
        quantidade,
      },
    });

    res.status(201).json(itemCarrinho);
  } catch (error) {
    console.error('Erro ao adicionar produto ao carrinho:', error);
    res.status(500).json({ error: 'Erro ao adicionar produto ao carrinho', details: error.message });
  }
};

// Listar itens do carrinho de um usuário
export const getCart = async (req, res) => {
  try {
    const { usuarioId } = req.params;

    // Busca todos os itens do carrinho do usuário
    const carrinho = await prisma.Carrinho.findMany({
      where: { usuarioId },
      include: { produto: true }, // Inclui os detalhes do produto
    });

    res.status(200).json(carrinho);
  } catch (error) {
    console.error('Erro ao buscar carrinho:', error);
    res.status(500).json({ error: 'Erro ao buscar carrinho', details: error.message });
  }
};

// Atualizar quantidade de um item no carrinho
export const updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantidade } = req.body;

    // Atualiza a quantidade do item no carrinho
    const itemAtualizado = await prisma.Carrinho.update({
      where: { id },
      data: { quantidade },
    });

    res.status(200).json(itemAtualizado);
  } catch (error) {
    console.error('Erro ao atualizar item do carrinho:', error);
    res.status(500).json({ error: 'Erro ao atualizar item do carrinho', details: error.message });
  }
};

// Remover item do carrinho
export const removeCartItem = async (req, res) => {
  try {
    const { id } = req.params;

    // Remove o item do carrinho
    await prisma.Carrinho.delete({
      where: { id },
    });

    res.status(204).send(); // Retorna status 204 (No Content)
  } catch (error) {
    console.error('Erro ao remover item do carrinho:', error);
    res.status(500).json({ error: 'Erro ao remover item do carrinho', details: error.message });
  }
};


// Função para listar todos os carrinhos
export const getAllCarts = async (req, res) => {
  try {
    // Busca todos os carrinhos
    const carrinhos = await prisma.Carrinho.findMany({
      include: { produto: true, usuario: true }, // Inclui detalhes do produto e do usuário
    });

    res.status(200).json(carrinhos);
  } catch (error) {
    console.error('Erro ao buscar todos os carrinhos:', error);
    res.status(500).json({ error: 'Erro ao buscar todos os carrinhos', details: error.message });
  }
};
