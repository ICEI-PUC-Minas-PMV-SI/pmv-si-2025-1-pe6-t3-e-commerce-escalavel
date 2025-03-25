import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function testConnection() {
  try {
    const result = await prisma.$runCommandRaw({ ping: 1 })
    console.log('🚀 Conectado ao MongoDB!', result)
  } catch (error) {
    console.error('❌ Erro ao conectar:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testConnection()
