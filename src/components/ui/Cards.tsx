import Image from "next/image";
import { FiExternalLink } from "react-icons/fi";

export interface NewsCardData {
  id: string;
  title: string;
  description: string;
  imageSrc?: string | null;
  imageAlt?: string;
  status?: "Fake" | "Real" | "Error";
  confidence?: number;
  source?: string;
  link?: string;
}

export type StatusToken = NonNullable<NewsCardData["status"]>;

const STATUS_STYLES: Record<
  StatusToken,
  { badge: string; background: string; label: string }
> = {
  Fake: {
    badge: "bg-red-300 text-red-700 dark:bg-red-900/50 dark:text-red-300",
    background: "bg-red-100 dark:bg-red-950/30",
    label: "É FAKE",
  },
  Real: {
    badge: "bg-emerald-300 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300",
    background: "bg-emerald-100 dark:bg-emerald-950/30",
    label: "É REAL",
  },
  Error: {
    badge: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300",
    background: "bg-yellow-50 dark:bg-yellow-950/30",
    label: "Deveria estar classificado",
  },
};

const resolveStatus = (status?: NewsCardData["status"]) =>
  STATUS_STYLES[status ?? "Error"];

export const NewsCard: React.FC<{ data: NewsCardData }> = ({ data }) => {
  const style = resolveStatus(data.status);

  // Fallbacks por status
  const fallbackImages: Record<string, string> = {
    Real: "https://picsum.photos/id/870/200",
    Fake: "https://picsum.photos/id/870/200?grayscale",
    Error: "https://picsum.photos/id/870/200?blur=4"
  };
  const fallbackSrc = fallbackImages[data.status ?? "Error"];

  return (
    <article
      className={`flex flex-col rounded-3xl ${style.background} p-6 shadow-[0_16px_32px_rgba(15,23,42,0.08)] transition-transform hover:-translate-y-1 hover:shadow-[0_0_10px_rgba(0,0,0,0.5)]`}
    >
      <header className="flex items-center gap-3">
        <span
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${style.badge}`}
        >
          {style.label}
        </span>
        {typeof data.confidence === "number" && (
          <span className="ml-auto text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            {data.confidence}% confiança
          </span>
        )}
      </header>

      <div className="mt-4 flex flex-1 gap-4">
        <div className="flex-1">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 break-words">{data.title}</h2>
          <p
            className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300 break-words overflow-hidden text-ellipsis"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              wordBreak: "break-word",
            }}
          >
            {data.description}
          </p>
        </div>

        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl shadow-md">
          <Image
            src={data.imageSrc ?? fallbackSrc}
            alt={data.imageAlt ?? data.title}
            fill
            className="object-cover"
            sizes="80px"
            priority={false}
          />
        </div>
      </div>

      <footer className="mt-6 flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
        <span>{data.source ?? "Fonte desconhecida"}</span>
        {data.link && (
          <a
            href={data.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline"
          >
            <FiExternalLink className="h-4 w-4" />
            Acessar
          </a>
        )}
      </footer>
    </article>
  );
};

const NewsCardGrid: React.FC<{ items: NewsCardData[] }> = ({ items }) => (
  <section className="mx-auto grid w-full gap-6 px-4 sm:grid-cols-2 lg:grid-cols-3">
    {items.map((item, index) => (
      <NewsCard
        key={index}
        data={{
          ...item,
          id: String(index),
          imageSrc: item.imageSrc ?? null,
        }}
      />
    ))}
  </section>
);

export default NewsCardGrid;