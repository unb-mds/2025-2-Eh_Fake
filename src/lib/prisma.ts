// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

// Adiciona o prisma ao escopo global do Node.js para evitar múltiplas instâncias
// durante o hot-reload em desenvolvimento.
declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;