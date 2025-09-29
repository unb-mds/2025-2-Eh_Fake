import { NextResponse } from "next/server";
import { dbAdmin } from "@/lib/firebaseAdmin";

export async function GET() {
  try {
    const ref = dbAdmin.ref("news");
    const snapshot = await ref.once("value");
    const raw = snapshot.val();

    const newsArray = raw == null ? [] : Array.isArray(raw) ? raw : Object.values(raw);

    return NextResponse.json(newsArray, { status: 200 });
  } catch (err) {
    console.error("Erro ao buscar notícias via admin:", err);
    return NextResponse.json({ error: "Não foi possível carregar notícias" }, { status: 500 });
  }
}
