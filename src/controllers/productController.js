import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Criar produto
export const createProduct = async (req, res) => {
  try {
    const product = await prisma.Product.create({
      data: {
        nome: req.body.nome,
        descricao: req.body.descricao,
        preco: req.body.preco,
        categoria: req.body.categoria,
        estoque: req.body.estoque,
        imagem: req.body.imagem,
        
      },
    });
    res.status(201).json(product);
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    res.status(500).json({ error: 'Erro ao criar produto', details: error.message });
  }
};

// Listar produtos

export const getProducts = async (req, res) => {
  try {
    let where = {}; // Objeto para armazenar os filtros

    // Adiciona filtros ao objeto "where" se os query parameters existirem
    if (req.query.nome) {
      where.nome = { contains: req.query.nome }; // Busca parcial pelo nome
    }
    if (req.query.categoria) {
      where.categoria = { contains: req.query.categoria }; // Busca parcial pelo email
    }

    // Busca os usuários com os filtros aplicados (ou sem filtros, se nenhum for fornecido)
    const users = await prisma.Product.findMany({
      where, // Passa o objeto "where" para o Prisma
    });

    res.status(200).json(users); // Retorna os usuários encontrados
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({ error: 'Erro ao buscar usuários', details: error.message });
  }
};

// Atualizar produto
export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await prisma.Product.update({
      where: { id: req.params.id },
      data: {
        nome: req.body.nome,
        descricao: req.body.descricao,
        preco: req.body.preco,
        categoria: req.body.categoria,
        estoque: req.body.estoque,
        imagem: req.body.imagem,
      },
    });

    // Verifica o estoque do produto após atualização
    if (updatedProduct.estoque <= 3) {
      res.status(200).json({
        message: `Atenção: o estoque do produto "${updatedProduct.nome}" está igual ou abaixo de 3 unidades.`,
        product: updatedProduct,
      });
    } else {
      res.status(200).json(updatedProduct);
    }
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    res.status(500).json({ error: 'Erro ao atualizar produto', details: error.message });
  }
};


// Deletar produto
export const deleteProduct = async (req, res) => {
  try {
    await prisma.Product.delete({
      where: { id: req.params.id },
    });
    res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar produto:', error);
    res.status(500).json({ error: 'Erro ao deletar produto', details: error.message });
  }
};