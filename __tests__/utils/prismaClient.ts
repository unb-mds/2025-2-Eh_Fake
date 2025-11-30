import type { PrismaClient } from '@prisma/client';
import type { DeepMockProxy } from 'jest-mock-extended';

import prisma from '@/lib/prisma';

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;
