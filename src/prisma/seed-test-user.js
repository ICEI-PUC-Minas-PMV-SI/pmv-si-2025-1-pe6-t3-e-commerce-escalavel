import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function seedAdmin() {
  const senha = await bcrypt.hash('admin123', 10);
  await prisma.user.create({
    data: {
      nome: 'Admin',
      cel: '11999999999',
      email: 'admin@teste.com',
      senha,
      perfil: 'admin'
    }
  });
  console.log('Usuário admin criado!');
  await prisma.$disconnect();
}

seedAdmin();
