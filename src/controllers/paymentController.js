// controllers/paymentController.js
import { PrismaClient } from '@prisma/client';
import Stripe from 'stripe';

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// POST /api/checkout
export const checkout = async (req, res) => {
  try {
    const { userId } = req.user;

    const carrinho = await prisma.carrinho.findMany({
      where: { usuarioId: userId },
      include: { produto: true },
    });

    if (carrinho.length === 0) {
      return res.status(400).json({ error: 'Carrinho vazio.' });
    }

    let total = 0;
    carrinho.forEach(item => {
      total += item.quantidade * item.produto.preco;
    });

    // Aqui você pode simular ou criar uma sessão real com o Stripe se necessário
    // const session = await stripe.checkout.sessions.create({ ... })

    // Criar vendas e atualizar estoque
    const vendasCriadas = [];
    for (const item of carrinho) {
      const venda = await prisma.venda.create({
        data: {
          usuarioId: userId,
          produtoId: item.produtoId,
          quantidade: item.quantidade,
        },
      });

      await prisma.product.update({
        where: { id: item.produtoId },
        data: {
          estoque: {
            decrement: item.quantidade,
          },
        },
      });

      vendasCriadas.push(venda);
    }

    // Limpa carrinho
    await prisma.carrinho.deleteMany({ where: { usuarioId: userId } });

    res.status(201).json({ message: 'Pedido realizado com sucesso.', total, vendas: vendasCriadas });
  } catch (error) {
    console.error('Erro no checkout:', error);
    res.status(500).json({ error: 'Erro no checkout', details: error.message });
  }
};

// GET /api/me/pedidos
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const pedidos = await prisma.venda.findMany({
      where: { usuarioId: userId },
      include: { produto: true },
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json(pedidos);
  } catch (error) {
    console.error('Erro ao buscar pedidos:', error);
    res.status(500).json({ error: 'Erro ao buscar pedidos', details: error.message });
  }
};
