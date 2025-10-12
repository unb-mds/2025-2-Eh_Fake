// app/api/noticias/route.ts

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

const DEFAULT_PAGE_SIZE = 6;
const MAX_PAGE_SIZE = 50; // Define um limite máximo para evitar abuso da API

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // --- Validação dos Parâmetros ---
    let page = parseInt(searchParams.get('page') || '1', 10);
    let limit = parseInt(searchParams.get('limit') || `${DEFAULT_PAGE_SIZE}`, 10);
    const searchTerm = searchParams.get('q')?.trim() || '';

    // Garante que 'page' e 'limit' sejam números positivos e válidos
    if (isNaN(page) || page < 1) page = 1;
    if (isNaN(limit) || limit < 1) limit = DEFAULT_PAGE_SIZE;
    if (limit > MAX_PAGE_SIZE) limit = MAX_PAGE_SIZE;

    const skip = (page - 1) * limit;

    // --- Lógica de Busca Aprimorada ---
    // A busca agora também inclui o campo 'source' (fonte da notícia).
    const whereCondition = searchTerm
      ? {
          OR: [
            { title: { contains: searchTerm, mode: 'insensitive' } },
            { description: { contains: searchTerm, mode: 'insensitive' } },
            { source: { contains: searchTerm, mode: 'insensitive' } },
          ],
        }
      : {};


    const orderByCondition = searchTerm
      ? { created_at: 'desc' } 
      : [
          { confidence: 'desc' }, // Ao navegar, prioriza a maior confiança (relevância)
          { created_at: 'desc' },   // Usa a data como critério de desempate
        ];

    const [news, total] = await prisma.$transaction([
      prisma.news.findMany({
        where: whereCondition,
        take: limit,
        skip: skip,
        orderBy: orderByCondition, // Usa a nossa nova condição de ordenação dinâmica
      }),
      prisma.news.count({ where: whereCondition }),
    ]);

    return NextResponse.json({
      data: news,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    }, { status: 200 });

  } catch (err) {
    console.error("Erro ao buscar notícias via Prisma:", err);
    return NextResponse.json({ error: "Não foi possível carregar notícias" }, { status: 500 });
  }
}