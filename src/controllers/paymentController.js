import { PrismaClient } from '@prisma/client';
import Stripe from 'stripe';
import config from '../config.js';

const prisma = new PrismaClient();
const stripe = new Stripe(config.stripeSecretKey);

// Serviço auxiliar para atualizar estoque
const atualizarEstoque = async (itensPedido) => {
  for (const item of itensPedido) {
    await prisma.product.update({
      where: { id: item.produtoId },
      data: { estoque: { decrement: item.quantidade } }
    });
  }
};

// Criar sessão de checkout no Stripe
export const createCheckoutSession = async (req, res) => {
  try {
    const { usuarioId } = req.body;

    // 1. Validar usuário e carrinho
    const usuario = await prisma.user.findUnique({
      where: { id: usuarioId },
      include: {
        carrinho: {
          include: { produto: true }
        }
      }
    });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    if (usuario.carrinho.length === 0) {
      return res.status(400).json({ error: 'Carrinho vazio' });
    }

    // 2. Verificar estoque e calcular total
    const itensSemEstoque = usuario.carrinho.filter(
      item => item.quantidade > item.produto.estoque
    );

    if (itensSemEstoque.length > 0) {
      return res.status(400).json({
        error: 'Estoque insuficiente',
        itens: itensSemEstoque.map(item => ({
          produto: item.produto.nome,
          estoque: item.produto.estoque,
          quantidade: item.quantidade
        }))
      });
    }

    const total = usuario.carrinho.reduce(
      (sum, item) => sum + (item.produto.preco * item.quantidade),
      0
    );

    // 3. Criar pedido no banco de dados
   
const pedido = await prisma.pedido.create({
  data: {
    usuarioId,
    total,
    status: 'aprovado', // Direto como aprovado
    dataPagamento: new Date(), // Já registra a data
    itens: {
      create: usuario.carrinho.map(item => ({
        produtoId: item.produtoId,
        quantidade: item.quantidade,
        precoUnitario: item.produto.preco
      }))
    }
  }
});



    // 4. Criar sessão de checkout no Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: usuario.carrinho.map(item => ({
        price_data: {
          currency: 'brl',
          product_data: {
            name: item.produto.nome,
            images: [item.produto.imagem || '']
          },
          unit_amount: Math.round(item.produto.preco * 100)
        },
        quantity: item.quantidade
      })),
      mode: 'payment',
      success_url: `${config.frontendUrl}/frontend/success.html?pedido=${pedido.id}`,
      cancel_url: `${config.frontendUrl}/carrinho.html`,
      customer_email: usuario.email
    });

    // 5. Atualizar pedido com sessionId
    await prisma.pedido.update({
      where: { id: pedido.id },
      data: { 
        paymentIntentId: session.id
      }
    });

    res.json({ url: session.url });

  } catch (error) {
    console.error('Erro ao criar sessão de checkout:', error);
    res.status(500).json({ 
      error: 'Erro ao processar pagamento',
      details: error.message 
    });
  }
};

// Atualizar pedido como pago
export const confirmarPagamento = async (req, res) => {
  try {
    const { pedidoId } = req.params;

    // Atualizar pedido como pago
    const pedido = await prisma.pedido.update({
      where: { id: pedidoId },
      data: { 
        status: 'pago',
        dataPagamento: new Date()
      },
      include: { itens: true }
    });

    // Atualizar estoque
    await atualizarEstoque(pedido.itens);

    // Limpar carrinho do usuário
    await prisma.carrinho.deleteMany({
      where: { usuarioId: pedido.usuarioId }
    });

    res.status(200).json({ message: 'Pedido confirmado como pago' });

  } catch (error) {
    console.error('Erro ao confirmar pagamento:', error);
    res.status(500).json({ 
      error: 'Erro ao confirmar pagamento',
      details: error.message 
    });
  }
};

// Obter pedidos do usuário
export const getPedidosUsuario = async (req, res) => {
  try {
    const { usuarioId } = req.params;

    const pedidos = await prisma.pedido.findMany({
      where: { usuarioId },
      include: {
        itens: {
          include: {
            produto: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.status(200).json(pedidos);
  } catch (error) {
    console.error('Erro ao buscar pedidos:', error);
    res.status(500).json({ 
      error: 'Erro ao buscar pedidos', 
      details: error.message 
    });
  }
};