import { getCars } from "@/lib/repository";
import { CarCard, SectionLabel } from "../components";
import { TechnicalPlate } from "./technical-plate";
export const metadata = { title: "The digital workshop" };
export default async function Workshop() {
  const cars = await getCars();
  return (
    <main className="wrap" id="main">
      <div className="page-heading">
        <div>
          <span className="eyebrow">THE DETAILS THAT KEEP THE STORY ALIVE</span>
          <h1>The workshop.</h1>
        </div>
        <p>
          A home for documentation, technical knowledge and the considered care
          of remarkable machines.
        </p>
      </div>
      <div className="workshop-teaser">
        <div className="workshop-plate-cover">
          <TechnicalPlate />
        </div>
        <div className="workshop-copy">
          <span className="eyebrow">
            BUILT ON SOURCES. MADE FOR ENTHUSIASTS.
          </span>
          <h2>
            A deeper kind
            <br />
            <em>of understanding.</em>
          </h2>
          <p>
            Each vehicle has its own workshop. Factory documents and independent
            references are kept distinct, with model years, markets and variants
            checked before use.
          </p>
          <p>
            Find specific workshop editions, engine-specific maintenance charts
            and original owner-handbook PDFs. Each car includes a task index and
            a downloadable service worksheet; source-backed owner checks are
            available where the original instructions have been inspected.
          </p>
        </div>
      </div>
      <SectionLabel number="01">CHOOSE YOUR MACHINE</SectionLabel>
      <div className="archive-grid">
        {cars.map((c) => (
          <div key={c.slug}>
            <CarCard car={c} href={"/cars/" + c.slug + "/workshop"} />
            <a
              className="text-link"
              style={{ marginTop: 17 }}
              href={"/cars/" + c.slug + "/workshop"}
            >
              Open vehicle workshop ↗
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}
