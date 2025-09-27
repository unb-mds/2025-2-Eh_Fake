import { NextResponse } from "next/server";
import type { NewsCardData } from "@/components/ui/Cards";

const news: NewsCardData[] = [
  {
    id: "1",
    title: "Investigação revela novos dados sobre escândalo",
    subtitle: "Política",
    description:
      "Documentos vazados mostram detalhes inéditos da operação que abalou o congresso na última semana.",
    imageSrc:
      "https://images.unsplash.com/photo-1529068755536-a5ade0dcb4e8?auto=format&fit=crop&w=960&q=80",
  },
  {
    id: "2",
    title: "Tecnologia brasileira é destaque em feira internacional",
    subtitle: "Inovação",
    description:
      "Startup nacional apresenta solução de IA para verificação de fatos e conquista investidores estrangeiros.",
    imageSrc:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=960&q=80",
  },
  {
    id: "3",
    title: "Especialistas alertam para aumento de desinformação",
    subtitle: "Sociedade",
    description:
      "Relatório aponta crescimento de 35% no compartilhamento de notícias falsas em redes sociais no último ano.",
    imageSrc:
      "https://images.unsplash.com/photo-1504712598893-24159a89200e?auto=format&fit=crop&w=960&q=80",
  },
  {
    id: "4",
    title: "Universidades unem forças contra fake news",
    subtitle: "Educação",
    description:
      "Parceria entre instituições públicas cria curso gratuito para ensinar como identificar conteúdos manipulados.",
    imageSrc:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=960&q=80",
  },
  {
    id: "5",
    title: "Governo lança campanha de checagem comunitária",
    subtitle: "Nacional",
    description:
      "Programa piloto oferecerá treinamento a líderes locais para combater boatos e orientar moradores.",
    imageSrc:
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=960&q=80",
  },
  {
    id: "6",
    title: "Aplicativo monitora discurso de ódio em tempo real",
    subtitle: "Segurança Digital",
    description:
      "Ferramenta analisa milhares de publicações por minuto e aciona moderadores quando identifica conteúdo perigoso.",
    imageSrc:
      "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=960&q=80",
  },
  {
    id: "7",
    title: "Nova pesquisa revela impacto das fake news na saúde pública",
    subtitle: "Saúde",
    description:
      "Estudo aponta que desinformação sobre vacinas contribuiu para aumento de doenças evitáveis. testetestetestetestetestetestetestetestetestetestetestetestetestetestetesteteste",
    imageSrc:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=960&q=80",
  },
  {
    id: "8",
    title: "Empresas de tecnologia se unem contra fake news",
    subtitle: "Tecnologia",
    description:
      "Gigantes da tecnologia anunciam parceria para desenvolver ferramentas de combate à desinformação.",
    imageSrc:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=960&q=80",
  },
  {
    id: "9",
    title: "Campanha global incentiva checagem de fatos",
    subtitle: "Internacional",
    description:
      "Organizações internacionais lançam campanha para conscientizar sobre os perigos das fake news.",
    imageSrc:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=960&q=80",
  },
  {
    id: "10",
    title: "Estudo revela como fake news afetam eleições",
    subtitle: "Política",
    description:
      "Pesquisadores analisam impacto da desinformação em processos eleitorais ao redor do mundo.",
    imageSrc:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=960&q=80",
  },
];

export async function GET() {
  return NextResponse.json(news);
}