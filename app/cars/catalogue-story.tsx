import type { CSSProperties } from "react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import type { Car } from "@/lib/sample";
import type { CatalogueEdition } from "@/lib/catalogue";
import { Gallery, Newsletter, Share, CarCard } from "@/app/components";
import { TechnicalPlate } from "@/app/workshop/technical-plate";
export function CatalogueStory({
  car: c,
  design: d,
  cars,
}: {
  car: Car;
  design: CatalogueEdition;
  cars: Car[];
}) {
  const next =
    cars[(cars.findIndex((k) => k.slug === c.slug) + 1) % cars.length];
  const sections = c.sections;
  const sources = c.sourceList || d.sources;
  const labels =
    c.slug === "honda-nsx-na1"
      ? [
          "THE BEGINNING",
          "THE DESIGN",
          "DRIVER DEVELOPMENT",
          "THE V6",
          "AT LE MANS",
        ]
      : c.slug === "lancia-stratos-hf"
        ? [
            "THE BEGINNING",
            "THE ENGINEERING",
            "WORLD CHAMPIONS",
            "IN THE DUST",
            "TWO LIVES",
          ]
        : c.slug === "porsche-911-original"
          ? [
              "THE BEGINNING",
              "THE DESIGN",
              "THE ENGINEERING",
              "IN MOTION",
              "THE AFTERLIFE",
            ]
          : [
              "THE BEGINNING",
              "THE DESIGN",
              "THE ENGINEERING",
              "IN COMPETITION",
              "THE AFTERLIFE",
            ];
  const photos = d.photoIds.map((id) => "/images/" + id + ".jpg");
  const sectionCopy = (s: Car["sections"][number]) => (
    <>
      {s.body.split("\n\n").map((p, i) => (
        <p key={i}>{p}</p>
      ))}
      {s.sourceId && (
        <a
          className="source-ref"
          href={sources.find((k) => k.id === s.sourceId)?.url}
          target="_blank"
          rel="noreferrer"
        >
          READ THE SOURCE <ArrowUpRight size={12} />
        </a>
      )}
    </>
  );
  return (
    <main
      id="main"
      className="vehicle-edition"
      style={{ "--car-accent": d.accent } as CSSProperties}
    >
      <div className="wrap">
        <div className="vehicle-breadcrumb">
          <a href="/archive">← THE CAR FILES</a>
          <span>{d.kicker}</span>
          <span>EDITION {String(c.number).padStart(3, "0")}</span>
        </div>
        <header className="vehicle-nameplate">
          <h1>
            <span>{c.manufacturer}</span>
            {c.model}
            <i>.</i>
          </h1>
          <div className="vehicle-poster-copy">
            <span className="eyebrow">
              {c.generation} / AN EDITORIAL PREVIEW
            </span>
            <h2>
              {d.posterLines.map((l, i) => (
                <span key={l}>
                  {l}
                  {i < d.posterLines.length - 1 && <br />}
                </span>
              ))}
            </h2>
          </div>
        </header>
        <div className="vehicle-era">
          <span>
            {c.startYear}-{c.endYear}
          </span>
          <span>{c.country}</span>
          <span>{c.category}</span>
          <span>{d.imageLabel}</span>
        </div>
      </div>
      <figure className="vehicle-period-cover">
        <img
          src={c.image}
          alt={d.imageCaption}
          style={{ objectPosition: d.imagePosition }}
          fetchPriority="high"
        />
        <span className="vehicle-frame-id">
          M/A {String(c.number).padStart(3, "0")} / ORIGINAL FRAME
        </span>
        <figcaption>
          <span>{d.imageCaption}</span>
          <a href="/image-credits">SOURCE & LICENSE ↗</a>
        </figcaption>
      </figure>
      <div className="wrap">
        <section className="vehicle-standfirst">
          <span className="eyebrow">
            THE STORY BEHIND
            <br />
            THE MACHINE.
          </span>
          <p>{c.excerpt}</p>
        </section>
        <nav className="vehicle-chapter-nav" aria-label="Story chapters">
          {sections.map((s, i) => (
            <a href={"#chapter-" + i} key={s.heading}>
              0{i + 1} / {labels[i] || "THE STORY"}
            </a>
          ))}
          <a href="#photographs">PHOTOGRAPHS ↗</a>
        </nav>
        {sections[0] && (
          <section className="vehicle-origin" id="chapter-0">
            <div>
              <span className="eyebrow">01 / {labels[0]}</span>
              <h2>{sections[0].heading}</h2>
            </div>
            <div className="vehicle-body-copy">{sectionCopy(sections[0])}</div>
          </section>
        )}
        {sections[1] && (
          <section className="vehicle-design-chapter" id="chapter-1">
            <figure>
              <img
                src={d.secondaryImage}
                alt={d.secondaryCaption}
                loading="lazy"
              />
              <figcaption>{d.secondaryCaption}</figcaption>
            </figure>
            <div>
              <span className="eyebrow">02 / {labels[1]}</span>
              <h2>{sections[1].heading}</h2>
              <div className="vehicle-body-copy">
                {sectionCopy(sections[1])}
              </div>
            </div>
          </section>
        )}
      </div>
      <aside className="vehicle-pullquote">
        <span className="eyebrow">
          MOTOR / ARCHIVE - {c.manufacturer} {c.model}
        </span>
        <p>{d.quote}</p>
        <span className="quote-footer">FORM / FUNCTION / FEELING</span>
      </aside>
      <div className="wrap">
        {sections[2] && (
          <section className="vehicle-engineering" id="chapter-2">
            <div className="vehicle-engineering-heading">
              <span className="eyebrow">03 / {labels[2]}</span>
              <h2>{sections[2].heading}</h2>
            </div>
            <div className="vehicle-body-copy">{sectionCopy(sections[2])}</div>
            <dl className="vehicle-facts">
              <div>
                <dt>PRODUCTION ERA</dt>
                <dd>
                  {c.startYear}-{c.endYear}
                </dd>
              </div>
              <div>
                <dt>ENGINE FAMILY</dt>
                <dd>{c.engine}</dd>
              </div>
              <div>
                <dt>DRIVETRAIN</dt>
                <dd>{c.drivetrain}</dd>
              </div>
              <div>
                <dt>GENERATION</dt>
                <dd>{c.generation}</dd>
              </div>
            </dl>
            <p className="vehicle-technical-note">
              Generation-level context. Road and competition specifications are
              kept distinct; these fields do not establish repair-document
              applicability.
            </p>
          </section>
        )}
        {sections[3] && (
          <section className="vehicle-racing-chapter" id="chapter-3">
            <div>
              <span className="eyebrow">04 / {labels[3]}</span>
              <h2>{sections[3].heading}</h2>
              <div className="vehicle-body-copy">
                {sectionCopy(sections[3])}
              </div>
            </div>
            <figure>
              <img
                src={c.image}
                alt={d.imageCaption}
                style={{ objectPosition: d.imagePosition }}
                loading="lazy"
              />
              <figcaption>{d.imageCaption}</figcaption>
            </figure>
          </section>
        )}
        <section className="vehicle-timeline">
          <div className="section-label">
            <span>↳ THREE MOMENTS IN THE RECORD</span>
          </div>
          <div>
            {d.timeline.map((t) => (
              <article key={t.year}>
                <span className="timeline-year">{t.year}</span>
                <h3>{t.title}</h3>
                <p>{t.detail}</p>
                <a
                  className="source-ref"
                  href={sources.find((s) => s.id === t.sourceId)?.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  SOURCE ↗
                </a>
              </article>
            ))}
          </div>
        </section>
        {sections[4] && (
          <section className="vehicle-origin vehicle-legacy" id="chapter-4">
            <div>
              <span className="eyebrow">05 / {labels[4]}</span>
              <h2>{sections[4].heading}</h2>
            </div>
            <div className="vehicle-body-copy">{sectionCopy(sections[4])}</div>
          </section>
        )}
        <section className="vehicle-gallery" id="photographs">
          <div className="section-label">
            <span>↳ THE PHOTOGRAPHS</span>
            <a href="/image-credits">FULL CREDITS ↗</a>
          </div>
          <h2>LOOK AGAIN.</h2>
          <p>
            One design family. Different moments. The dated period frame is
            presented alongside clearly credited modern reference photography.
          </p>
          <Gallery images={photos} name={c.manufacturer + " " + c.model} />
        </section>
        <section className="vehicle-workshop" id="workshop-preview">
          <div>
            <span className="eyebrow">
              {c.manufacturer} {c.model} / DIGITAL WORKSHOP
            </span>
            <h2>
              KNOW THE STORY.
              <br />
              UNDERSTAND
              <br />
              <span>THE MACHINE.</span>
            </h2>
            <p>
              Model applicability, legitimate documentation and the sources
              behind the technical record.
            </p>
            <a
              className="signal-button dark-button"
              href={"/cars/" + c.slug + "/workshop"}
            >
              OPEN THIS CAR’S WORKSHOP <ArrowUpRight size={19} />
            </a>
          </div>
          <TechnicalPlate compact vehicleSlug={c.slug} />
        </section>
        <section className="vehicle-source-register" id="sources">
          <details>
            <summary>
              THE SOURCE RECORD <span>{sources.length} REFERENCES +</span>
            </summary>
            <ol>
              {sources.map((s) => (
                <li key={s.id}>
                  <a href={s.url} target="_blank" rel="noreferrer">
                    {s.title} <ArrowUpRight size={15} />
                  </a>
                  <p>
                    {s.publisher} · {s.kind}
                  </p>
                </li>
              ))}
            </ol>
          </details>
          <p className="sample-note">
            EDITORIAL PREVIEW / This manually curated sample edition includes
            source-linked historical facts and dated photography. It has not
            completed the production claim-review workflow. Modern reference
            photographs and competition variants are identified in their
            captions. No unverified repair instructions are provided.
          </p>
          <div className="vehicle-story-actions">
            <Share />
            <a
              href={
                "/corrections?page=" + encodeURIComponent("/cars/" + c.slug)
              }
              className="text-link"
            >
              SUGGEST A CORRECTION <ArrowUpRight size={15} />
            </a>
          </div>
        </section>
        {next && (
          <a className="next-machine" href={"/cars/" + next.slug}>
            <span className="eyebrow">NEXT MACHINE / {next.country}</span>
            <strong>
              {next.manufacturer} {next.model}
            </strong>
            <ArrowRight size={45} />
          </a>
        )}
        <div className="section-label">
          <span>↳ THE REST OF THE CATALOGUE</span>
          <a href="/archive">ALL CARS ↗</a>
        </div>
        <div className="journal-grid">
          {cars
            .filter((k) => k.slug !== c.slug)
            .map((k) => (
              <CarCard key={k.slug} car={k} />
            ))}
        </div>
        <div style={{ paddingTop: 60 }}>
          <Newsletter />
        </div>
      </div>
    </main>
  );
}
