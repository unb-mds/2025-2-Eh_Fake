import Image from "next/image";

export interface NewsCardData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
  imageAlt?: string;
}

export const NewsCard: React.FC<{ data: NewsCardData }> = ({ data }) => (
  <article className="flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
    <div className="relative h-48 w-full">
      <Image
        src={data.imageSrc}
        alt={data.imageAlt ?? data.title}
        fill
        className="object-cover"
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 40vw, 90vw"
        priority={false}
      />
    </div>
    <div className="flex flex-1 flex-col gap-3 p-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">{data.title}</h2>
        <h3 className="text-sm font-medium uppercase tracking-wide text-gray-500">
          {data.subtitle}
        </h3>
      </div>
      <p className="text-sm leading-relaxed text-gray-700">{data.description}</p>
    </div>
  </article>
);

const NewsCardGrid: React.FC<{ items: NewsCardData[] }> = ({ items }) => (
  <section className="mx-auto grid w-full gap-6 px-4 sm:grid-cols-2 lg:grid-cols-3">
    {items.map((item) => (
      <NewsCard key={item.id} data={item} />
    ))}
  </section>
);

export default NewsCardGrid;