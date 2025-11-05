import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const searchTerm = searchParams.get("q")?.trim() || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "6", 10);

    const statusParam = searchParams.get("status");
    const status = statusParam === "Fake" || statusParam === "Real" ? statusParam : undefined;

    const whereCondition: any = {};

    if (status) {
      whereCondition.status = status;
    }

    if (searchTerm) {
      whereCondition.OR = [
        { title: { contains: searchTerm, mode: "insensitive" as const } },
        { description: { contains: searchTerm, mode: "insensitive" as const } },
        { source: { contains: searchTerm, mode: "insensitive" as const } },
      ];
    }

    const totalItems = await prisma.news.count({
      where: whereCondition,
    });

    const news = await prisma.news.findMany({
      where: whereCondition,
      orderBy: [
        { confidence: "desc" },
        { created_at: "desc" },
      ],
      skip: (page - 1) * limit,
      take: limit,
    });

    const totalPages = Math.ceil(totalItems / limit);

    return NextResponse.json({
      news,
      totalItems,
      totalPages,
      currentPage: page,
    }, { status: 200 });

  } catch (err) {
    console.error("Erro ao buscar notícias via Prisma:", err);
    return NextResponse.json(
      { error: "Não foi possível carregar notícias" },
      { status: 500 }
    );
  }
}
