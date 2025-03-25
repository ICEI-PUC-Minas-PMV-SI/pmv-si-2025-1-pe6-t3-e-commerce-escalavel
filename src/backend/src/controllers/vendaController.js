import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Criar uma nova venda e atualizar estoque
export const criarVenda = async (req, res) => {
  try {
    const { usuarioId, produtoId, quantidadeVendida } = req.body;

    // Verificar se o produto existe
    const produto = await prisma.Product.findUnique({ 
      where: { id: produtoId } 
    });

    if (!produto) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    // Verificar se há estoque suficiente
    if (produto.estoque < quantidadeVendida) {
      return res.status(400).json({ error: 'Estoque insuficiente' });
    }

    // Criar a venda
    const venda = await prisma.Venda.create({
      data: {
        usuarioId,
        produtoId,
        quantidade: quantidadeVendida,
      },
    });

    // Atualizar o estoque do produto
    const novoEstoque = produto.estoque - quantidadeVendida;
    await prisma.Product.update({
      where: { id: produtoId },
      data: { estoque: novoEstoque },
    });

    // Verificar se o estoque está baixo (3 unidades ou menos)
    let mensagemEstoqueBaixo = null;
    if (novoEstoque <= 3) {
      mensagemEstoqueBaixo = `⚠️ Atenção: O produto ${produto.nome} está com estoque baixo (${novoEstoque} unidades restantes).`;
      console.warn(mensagemEstoqueBaixo); // Exibir no terminal do servidor
    }

    res.status(201).json({
      venda,
      aviso: mensagemEstoqueBaixo, // Enviar aviso na resposta (se aplicável)
    });

  } catch (error) {
    console.error('Erro ao registrar venda:', error);
    res.status(500).json({ error: 'Erro ao registrar venda', details: error.message });
  }
};
