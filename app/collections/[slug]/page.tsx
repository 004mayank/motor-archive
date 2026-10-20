import { collections } from "@/lib/sample";
import { getCars } from "@/lib/repository";
import { notFound } from "next/navigation";
import { CarCard, SectionLabel } from "../../components";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = collections.find((c) => c.slug === slug);
  return { title: c?.title || "Collection", description: c?.subtitle };
}
export default async function Collection({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = collections.find((c) => c.slug === slug);
  if (!collection) notFound();
  const cars = (await getCars()).filter((c) =>
    collection.cars.includes(c.slug),
  );
  return (
    <main className="wrap" id="main">
      <div className="page-heading">
        <div>
          <span className="eyebrow">THE MOTOR / ARCHIVE COLLECTIONS</span>
          <h1>{collection.title}</h1>
        </div>
        <p>
          {collection.subtitle}
          <br />A curated selection of {cars.length} sample editions.
        </p>
      </div>
      <div className="subhero">
        <img src={collection.image} alt={collection.title} />
      </div>
      <section className="section">
        <SectionLabel number="↳">THE STORIES IN THIS COLLECTION</SectionLabel>
        <div className="archive-grid">
          {cars.map((c) => (
            <CarCard car={c} key={c.slug} />
          ))}
        </div>
      </section>
    </main>
  );
}
