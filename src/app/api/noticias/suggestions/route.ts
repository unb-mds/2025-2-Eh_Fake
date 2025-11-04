import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const searchTerm = searchParams.get("q")?.trim() || "";

    if (!searchTerm) {
      return NextResponse.json([], { status: 200 });
    }

    const suggestions = await prisma.news.findMany({
      where: {
        title: { contains: searchTerm, mode: "insensitive" },
      },
      select: { title: true },
      distinct: ['title'],
      take: 10,
    });

    const titles = suggestions.map(s => s.title);

    return NextResponse.json(titles, { status: 200 });
  } catch (err) {
    console.error("Erro ao buscar sugestões:", err);
    return NextResponse.json(
      { error: "Não foi possível carregar sugestões" },
      { status: 500 }
    );
  }
}
