// resetDB.js
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function reset() {
  // Lista de TODOS os models do seu schema.prisma
  await prisma.product.deleteMany()
  await prisma.user.deleteMany()
  // Adicione outros models conforme necessário
  
  console.log('🔥 Banco de dados resetado com sucesso!')
}

reset()
  .catch(e => console.error('Erro:', e))
  .finally(() => prisma.$disconnect())