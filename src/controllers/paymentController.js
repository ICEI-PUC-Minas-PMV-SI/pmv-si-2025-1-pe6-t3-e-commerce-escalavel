import { PrismaClient } from '@prisma/client';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import config from '../config.js';

const prisma = new PrismaClient();
const client = new MercadoPagoConfig({ accessToken: config.mercadopagoAccessToken });
const preference = new Preference(client);

// Função para atualizar estoque
const atualizarEstoque = async (carrinho) => {
  for (const item of carrinho) {
    await prisma.Product.update({
      where: { id: item.produtoId },
      data: { estoque: { decrement: item.quantidade } } // Usando decrement para evitar race conditions
    });
  }
};

export const processPayment = async (req, res) => {
  try {
    const { usuarioId } = req.body;

    // Busca o carrinho do usuário
    const carrinho = await prisma.Carrinho.findMany({
      where: { usuarioId },
      include: { produto: true },
    });

    if (carrinho.length === 0) {
      return res.status(400).json({ error: 'Carrinho vazio' });
    }

    // Verifica estoque antes de processar
    for (const item of carrinho) {
      if (item.produto.estoque < item.quantidade) {
        return res.status(400).json({ 
          error: 'Estoque insuficiente',
          produto: item.produto.nome,
          estoqueDisponivel: item.produto.estoque
        });
      }
    }

    const total = carrinho.reduce((acc, item) => acc + item.produto.preco * item.quantidade, 0);

    const preferenceData = {
      items: carrinho.map(item => ({
        title: item.produto.nome,
        unit_price: item.produto.preco,
        quantity: item.quantidade,
      })),
      external_reference: usuarioId,
      back_urls: {
        success: 'http://seusite.com/success',
        failure: 'http://seusite.com/failure', 
        pending: 'http://seusite.com/pending',
      },
      auto_return: 'approved',
    };

    const response = await preference.create({ body: preferenceData });

    // Cria pedido com status 'processando'
    const pedido = await prisma.Pedido.create({
      data: {
        usuarioId,
        carrinhoId: carrinho[0].id,
        total,
        status: 'processando', // Novo status intermediário
      },
    });

    // Atualiza estoque imediatamente (para pagamentos com auto_return)
    // Em produção, considere usar webhooks para confirmação
    await atualizarEstoque(carrinho);
    
    // Atualiza status do pedido
    await prisma.Pedido.update({
      where: { id: pedido.id },
      data: { status: 'pendente' }
    });

    res.status(200).json({ 
      init_point: response.init_point, 
      pedidoId: pedido.id 
    });

  } catch (error) {
    console.error('Erro ao processar pagamento:', error);
    res.status(500).json({ 
      error: 'Erro ao processar pagamento', 
      details: error.message 
    });
  }
};

export const checkPaymentStatus = async (req, res) => {
  try {
    const { pedidoId } = req.params;

    const pedido = await prisma.Pedido.findUnique({
      where: { id: pedidoId },
      include: { 
        carrinho: { 
          include: { produto: true } 
        } 
      },
    });

    if (!pedido) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }

    // Verifica estoque nos itens (opcional)
    const itensSemEstoque = pedido.carrinho.filter(
      item => item.produto.estoque < item.quantidade
    );

    res.status(200).json({ 
      status: pedido.status,
      carrinho: pedido.carrinho,
      alertaEstoque: itensSemEstoque.length > 0 ? 'Alguns itens estão com estoque baixo' : null
    });

  } catch (error) {
    console.error('Erro ao verificar status:', error);
    res.status(500).json({ 
      error: 'Erro ao verificar status',
      details: error.message 
    });
  }
};

export const atualizarPedido = async (req, res) => {
  const { data } = req.body;
  const pedido = await prisma.Pedido.update({
    where: { id: data.external_reference },
    data: { status: data.status === 'approved' ? 'pago' : 'cancelado' }
  });
  res.status(200).send('OK');
};