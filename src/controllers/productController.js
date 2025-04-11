import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Criar produto
// productController.js

// Criar produto
export const createProduct = async (req, res) => {
  try {
    // Mapeamento das categorias para o Enum do Prisma
    const categoriaMap = {
      'Processadores': 'PROCESSADORES',
      'Placas de Vídeo': 'PLACAS_VIDEO',
      'Memórias RAM': 'MEMORIAS_RAM',
      'Armazenamento (SSD/HDD)': 'ARMAZENAMENTO',
      'Placas-mãe': 'PLACAS_MAE'
    };

    if (!categoriaMap[req.body.categoria]) {
      return res.status(400).json({ error: 'Categoria inválida' });
    }

    const product = await prisma.Product.create({
      data: {
        nome: req.body.nome,
        descricao: req.body.descricao,
        preco: req.body.preco,
        categoria: categoriaMap[req.body.categoria],
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
    let where = {};
    
    // Mapeamento reverso para busca
    const categoriaReverseMap = {
      'PROCESSADORES': 'Processadores',
      'PLACAS_VIDEO': 'Placas de Vídeo',
      'MEMORIAS_RAM': 'Memórias RAM',
      'ARMAZENAMENTO': 'Armazenamento (SSD/HDD)',
      'PLACAS_MAE': 'Placas-mãe'
    };

    if (req.query.nome) {
      where.nome = { contains: req.query.nome };
    }
    if (req.query.categoria) {
      // Converte a categoria da query para o formato do Enum
      const categoriaEnum = Object.entries(categoriaReverseMap)
        .find(([_, value]) => value === req.query.categoria)?.[0];
      
      if (categoriaEnum) {
        where.categoria = categoriaEnum;
      }
    }

    const products = await prisma.Product.findMany({ where });
    
    // Converter os enums para nomes amigáveis na resposta
    const productsWithFriendlyCategories = products.map(product => ({
      ...product,
      categoria: categoriaReverseMap[product.categoria] || product.categoria
    }));

    res.status(200).json(productsWithFriendlyCategories);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.status(500).json({ error: 'Erro ao buscar produtos', details: error.message });
  }
};

// Atualizar produto
export const updateProduct = async (req, res) => {
  try {
    const categoriaMap = {
      'Processadores': 'PROCESSADORES',
      'Placas de Vídeo': 'PLACAS_VIDEO',
      'Memórias RAM': 'MEMORIAS_RAM',
      'Armazenamento (SSD/HDD)': 'ARMAZENAMENTO',
      'Placas-mãe': 'PLACAS_MAE'
    };

    const updateData = {
      nome: req.body.nome,
      descricao: req.body.descricao,
      preco: req.body.preco,
      estoque: req.body.estoque,
      imagem: req.body.imagem,
    };

    if (req.body.categoria) {
      if (!categoriaMap[req.body.categoria]) {
        return res.status(400).json({ error: 'Categoria inválida' });
      }
      updateData.categoria = categoriaMap[req.body.categoria];
    }

    const updatedProduct = await prisma.Product.update({
      where: { id: req.params.id },
      data: updateData,
    });

    // Converter o enum para nome amigável na resposta
    const categoriaReverseMap = {
      'PROCESSADORES': 'Processadores',
      'PLACAS_VIDEO': 'Placas de Vídeo',
      'MEMORIAS_RAM': 'Memórias RAM',
      'ARMAZENAMENTO': 'Armazenamento (SSD/HDD)',
      'PLACAS_MAE': 'Placas-mãe'
    };

    const responseProduct = {
      ...updatedProduct,
      categoria: categoriaReverseMap[updatedProduct.categoria] || updatedProduct.categoria
    };

    if (updatedProduct.estoque <= 3) {
      res.status(200).json({
        message: `Atenção: o estoque do produto "${updatedProduct.nome}" está igual ou abaixo de 3 unidades.`,
        product: responseProduct,
      });
    } else {
      res.status(200).json(responseProduct);
    }
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    res.status(500).json({ error: 'Erro ao atualizar produto', details: error.message });
  }
};

// Buscar produto por ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await prisma.Product.findUnique({
      where: { id: id },
    });

    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    // Converter o enum para nome amigável na resposta
    const categoriaReverseMap = {
      'PROCESSADORES': 'Processadores',
      'PLACAS_VIDEO': 'Placas de Vídeo',
      'MEMORIAS_RAM': 'Memórias RAM',
      'ARMAZENAMENTO': 'Armazenamento (SSD/HDD)',
      'PLACAS_MAE': 'Placas-mãe'
    };

    const responseProduct = {
      ...product,
      categoria: categoriaReverseMap[product.categoria] || product.categoria
    };

    res.status(200).json(responseProduct);
  } catch (error) {
    console.error('Erro ao buscar produto por ID:', error);
    res.status(500).json({ error: 'Erro ao buscar produto', details: error.message });
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