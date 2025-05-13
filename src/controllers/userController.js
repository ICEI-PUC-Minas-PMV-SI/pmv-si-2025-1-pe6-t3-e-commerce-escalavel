import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// Criar usuário
export const createUser = async (req, res) => {
  try {
    const { email, nome, cel, senha, perfil } = req.body;

    if (perfil && perfil !== 'admin' && perfil !== 'user') {
      return res.status(400).json({ error: 'Perfil inválido. Use "admin" ou "user".' });
    }

    // Verifica se o email já está cadastrado
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Este email já está cadastrado.' });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const user = await prisma.user.create({
      data: {
        email,
        nome,
        cel,
        senha: senhaCriptografada,
        perfil: perfil || 'user',
      },
    });

    const userSemSenha = { ...user, senha: undefined };

    res.status(201).json(userSemSenha);
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ error: 'Erro ao criar usuário', details: error.message });
  }
};


// Listar usuários
export const getUsers = async (req, res) => {
  try {
    let where = {}; // Objeto para armazenar os filtros

    // Adiciona filtros ao objeto "where" se os query parameters existirem
    if (req.query.nome) {
      where.nome = { contains: req.query.nome }; // Busca parcial pelo nome
    }
    if (req.query.email) {
      where.email = { contains: req.query.email }; // Busca parcial pelo email
    }

    // Busca os usuários com os filtros aplicados (ou sem filtros, se nenhum for fornecido)
    const users = await prisma.user.findMany({
      where, // Passa o objeto "where" para o Prisma
    });

    // Remove a senha de cada usuário
    const usersSemSenha = users.map(user => {
      return { ...user, senha: undefined };
    });

    res.status(200).json(usersSemSenha); // Retorna os usuários sem a senha
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({ error: 'Erro ao buscar usuários', details: error.message });
  }
};


// Atualizar usuário
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, nome, cel, senha } = req.body;

    // Verifica se a senha foi fornecida para atualização
    let senhaCriptografada;
    if (senha) {
      senhaCriptografada = await bcrypt.hash(senha, 10); // Criptografa a nova senha
    }

    // Atualiza o usuário no banco de dados
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        email,
        nome,
        cel,
        senha: senhaCriptografada, // Atualiza a senha criptografada (se fornecida)
      },
    });

    // Remove a senha da resposta
    const userSemSenha = { ...updatedUser, senha: undefined };

    res.status(200).json(userSemSenha); // Retorna o usuário atualizado sem a senha
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ error: 'Erro ao atualizar usuário', details: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Verifica se o usuário existe
    const userExists = await prisma.user.findUnique({
      where: { id }
    });

    if (!userExists) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Executa todas as operações em uma transação
    await prisma.$transaction([
      // Deleta avaliações do usuário
      prisma.avaliacao.deleteMany({ where: { usuarioId: id } }),
      
      // Deleta itens de pedido associados aos pedidos do usuário
      prisma.itemPedido.deleteMany({ where: { pedido: { usuarioId: id } } }),
      
      // Deleta carrinhos do usuário
      prisma.carrinho.deleteMany({ where: { usuarioId: id } }),
      
      // Deleta pedidos do usuário
      prisma.pedido.deleteMany({ where: { usuarioId: id } }),
      
      // Finalmente deleta o usuário
      prisma.user.delete({ where: { id } })
    ]);

    res.status(200).send({ message: "Usuário e todos os dados relacionados deletados com sucesso" });
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    res.status(500).json({ 
      error: 'Erro ao deletar usuário', 
      details: error.message 
    });
  }
}
