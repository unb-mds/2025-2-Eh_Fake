import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const searchTerm = searchParams.get("q")?.trim() || "";

    const whereCondition = searchTerm
      ? {
          OR: [
            { title: { contains: searchTerm, mode: "insensitive" } },
            { description: { contains: searchTerm, mode: "insensitive" } },
            { source: { contains: searchTerm, mode: "insensitive" } },
          ],
        }
      : {};

    const news = await prisma.news.findMany({
      where: whereCondition,
      orderBy: [
        { confidence: "desc" },
        { created_at: "desc" },
      ],
    });
    return NextResponse.json(news, { status: 200 });

  } catch (err) {
    console.error("Erro ao buscar notícias via Prisma:", err);
    return NextResponse.json(
      { error: "Não foi possível carregar notícias" },
      { status: 500 }
    );
  }
}
