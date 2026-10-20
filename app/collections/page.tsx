import { collections } from "@/lib/sample";
import { ArrowUpRight } from "lucide-react";
export const metadata = { title: "Collections" };
export default function Collections() {
  return (
    <main className="wrap" id="main">
      <div className="page-heading">
        <div>
          <span className="eyebrow">CONNECTED BY SOMETHING SPECIAL</span>
          <h1>Common threads.</h1>
        </div>
        <p>
          Explore the ideas, places and pursuits that connect the world’s most
          remarkable cars.
        </p>
      </div>
      <div className="collection-page-grid">
        {collections.map((c, i) => (
          <a
            key={c.slug}
            className="collection-card"
            href={"/collections/" + c.slug}
          >
            <img src={c.image} alt={c.title} />
            <div>
              <span className="eyebrow">
                COLLECTION 0{i + 1} / {c.cars.length} STORIES
              </span>
              <h3>{c.title}</h3>
              <span className="eyebrow">{c.subtitle}</span>
              <ArrowUpRight className="arrow" />
            </div>
          </a>
        ))}
      </div>
    </main>
  );
}
