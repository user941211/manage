// lib/prisma.ts

import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

// 에러 핸들링을 추가합니다.
prisma.$connect()
  .then(() => {
    console.log('Connected to the database successfully.');
  })
  .catch((error: any) => {
    console.error('Error connecting to the database:', error);
  });
