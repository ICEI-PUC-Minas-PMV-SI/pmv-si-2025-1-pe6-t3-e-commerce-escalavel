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

/*// Processar Venda
export const processSale = async (req, res) => {
  try {
    const { usuarioId, produtoId, quantidadeVendida } = req.body;

    // Verificar se o produto existe
    const produto = await prisma.product.findUnique({ where: { id: produtoId } });

    if (!produto) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    // Verificar se há estoque suficiente
    if (produto.estoque < quantidadeVendida) {
      return res.status(400).json({ error: "Estoque insuficiente" });
    }

    // Atualizar o estoque
    const novoEstoque = produto.estoque - quantidadeVendida;
    const produtoAtualizado = await prisma.product.update({
      where: { id: produtoId },
      data: { estoque: novoEstoque },
    });

    // Registrar a venda no banco de dados
    await prisma.venda.create({
      data: {
        usuarioId,
        produtoId,
        quantidade: quantidadeVendida,
      },
    });

    // Verificar se o estoque está baixo (ajuste conforme necessidade)
    if (novoEstoque <= 3) {
      console.log(`⚠️ Estoque baixo do produto "${produto.nome}" (${novoEstoque} unidades restantes).`);
    }

    res.status(200).json({ message: "Venda realizada com sucesso!", produtoAtualizado });
  } catch (error) {
    console.error("Erro ao processar venda:", error);
    res.status(500).json({ error: "Erro ao processar venda", details: error.message });
  }
};


*/