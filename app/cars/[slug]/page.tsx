import { getCar, getCars } from "@/lib/repository";
import { porscheSources } from "@/lib/sample";
import { notFound } from "next/navigation";
import {
  Gallery,
  SectionLabel,
  Newsletter,
  Share,
  CarCard,
} from "../../components";
import { ArrowUpRight } from "lucide-react";
import { catalogueEditions } from "@/lib/catalogue";
import { CatalogueStory } from "../catalogue-story";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = await getCar(slug);
  return {
    title: c
      ? c.manufacturer + " " + c.model + " - " + c.headline
      : "Story not found",
    description: c?.excerpt,
    alternates: { canonical: "/cars/" + slug },
  };
}
export default async function Story({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = await getCar(slug);
  if (!c) notFound();
  const cars = await getCars();
  const design = catalogueEditions[slug];
  if (c.sample && design && c.image === design.image)
    return <CatalogueStory car={c} design={design} cars={cars} />;
  const periodStratos = c.sample && c.slug === "lancia-stratos-hf";
  const storyImage = periodStratos ? "/images/stratos-1975-rally.jpg" : c.image;
  const images = c.galleryImages?.length
    ? c.galleryImages
    : !c.sample
      ? []
      : c.manufacturer === "Porsche"
        ? [
            "/images/porsche-0.jpg",
            "/images/porsche-1.jpg",
            "/images/porsche-3.jpg",
          ]
        : c.manufacturer === "Lancia"
          ? ["/images/stratos-0.jpg", "/images/stratos-1.jpg"]
          : c.manufacturer === "Honda"
            ? ["/images/nsx-1.jpg", "/images/nsx-0.jpg"]
            : ["/images/jaguar-1.jpg", "/images/jaguar-0.jpg"];
  return (
    <main id="main" className="wrap">
      <div className="story-head">
        <div className="breadcrumb">
          <a href="/archive">The archive</a> / {c.manufacturer} / {c.model}
        </div>
        <div className="story-heading">
          <div>
            <span className="eyebrow">
              EDITION {String(c.number).padStart(3, "0")} / {c.country} /{" "}
              {c.startYear}-{c.endYear}
            </span>
            <h1>
              {c.manufacturer}
              <br />
              <em>{c.model}.</em>
            </h1>
            <span className="eyebrow">
              {c.generation} · {c.category}
            </span>
          </div>
          <p className="dek">
            {c.headline}
            <br />
            {c.excerpt}
          </p>
        </div>
      </div>
      <div className="story-cover">
        <img
          src={storyImage}
          alt={c.manufacturer + " " + c.model}
          fetchPriority="high"
        />
      </div>
      <div className="caption">
        <span>
          {c.manufacturer} {c.model} · {c.generation}
        </span>
        <a href="/image-credits">Photography & license credits ↗</a>
      </div>
      {periodStratos && (
        <a className="period-related" href="/motorsport/rally-without-barriers">
          <span className="eyebrow">
            IN ITS ELEMENT / ORIGINAL PHOTOGRAPH BY JOHN LLOYD · AUSTRALIA, 1975
          </span>
          <strong>INTO THE DUST.</strong>
          <span>READ THE RALLY PHOTO ESSAY ↗</span>
        </a>
      )}
      {c.sample && (
        <p className="sample-note">
          DESIGN PREVIEW / This sample edition demonstrates the reading
          experience. Research and technical references remain subject to
          editorial review; it is not a verified production edition.
        </p>
      )}
      <div className="story-body">
        <aside className="story-toc">
          <span className="eyebrow">IN THIS STORY</span>
          {c.sections.map((s, i) => (
            <a key={i} href={"#section-" + i}>
              {String(i + 1).padStart(2, "0")} / {s.heading}
            </a>
          ))}
          <a href="#photographs">The photographs</a>
          <a href="#sources">Sources & further reading</a>
          <a href={"/cars/" + slug + "/workshop"}>The workshop ↗</a>
        </aside>
        <article className="prose">
          {c.sections.map((s, i) => (
            <section id={"section-" + i} key={i}>
              <span className="eyebrow">
                {String(i + 1).padStart(2, "0")} /{" "}
                {i === 0
                  ? "THE ORIGIN"
                  : i === 1
                    ? "THE DESIGN"
                    : i === 2
                      ? "THE ENGINEERING"
                      : "THE LEGACY"}
              </span>
              <h2>{s.heading}</h2>
              {s.body.split("\n\n").map((p, j) => (
                <p key={j}>{p}</p>
              ))}
              {s.sourceId && (
                <a
                  className="source-ref"
                  href={c.sourceList?.find((p) => p.id === s.sourceId)?.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Source / Historical archive ↗
                </a>
              )}
              {i === 0 && <div className="pullquote">{c.headline}</div>}
              {i === 1 && (
                <figure className="inline-photo">
                  <img
                    src={images[1] || c.image}
                    alt={c.manufacturer + " " + c.model + " - a closer view"}
                    loading="lazy"
                  />
                  <figcaption>
                    Another perspective.{" "}
                    <a href="/image-credits">Photograph & license credits ↗</a>
                  </figcaption>
                </figure>
              )}
            </section>
          ))}
        </article>
      </div>
      <SectionLabel number="↳">THE VEHICLE RECORD</SectionLabel>
      <dl className="spec-grid">
        <div>
          <dt>PRODUCTION ERA</dt>
          <dd>
            {c.startYear}-{c.endYear}
          </dd>
        </div>
        <div>
          <dt>ENGINE LAYOUT</dt>
          <dd>{c.engine}</dd>
        </div>
        <div>
          <dt>DRIVETRAIN</dt>
          <dd>{c.drivetrain}</dd>
        </div>
        <div>
          <dt>ORIGIN</dt>
          <dd>{c.country}</dd>
        </div>
      </dl>
      <p className="sample-note">
        Sample vehicle metadata. Exact outputs, capacities and repair values are
        omitted until variant-specific evidence is approved.
      </p>
      <section className="section" id="photographs">
        <SectionLabel
          number="↳"
          link="Photograph credits"
          href="/image-credits"
        >
          A CLOSER LOOK
        </SectionLabel>
        <h2 className="section-title">The details stay with you.</h2>
        <Gallery images={images} name={c.manufacturer + " " + c.model} />
      </section>
      <SectionLabel number="↳">BENEATH THE BODYWORK</SectionLabel>
      <div className="workshop-teaser">
        <div className="workshop-copy">
          <span className="eyebrow">
            {c.manufacturer} {c.model} / THE DIGITAL WORKSHOP
          </span>
          <h2>
            Keep the story
            <br />
            <em>on the road.</em>
          </h2>
          <p>
            Explore documentation, model applicability and technical references.
            Every detail deserves a source.
          </p>
          <a className="text-link" href={"/cars/" + slug + "/workshop"}>
            Open the workshop <ArrowUpRight size={16} />
          </a>
        </div>
        <img
          src={images[images.length - 1] || c.image}
          alt={c.manufacturer + " " + c.model + " details"}
          loading="lazy"
        />
      </div>
      <section id="sources">
        <SectionLabel number="↳">SOURCES & EDITORIAL NOTES</SectionLabel>
        <div className="source-list">
          {(c.sourceList?.length || 0) > 0 ? (
            <ol>
              {c.sourceList?.map((s) => (
                <li key={s.id}>
                  <a href={s.url} target="_blank" rel="noreferrer">
                    {s.title} ↗
                  </a>
                  <span>
                    {s.publisher} · {s.kind} · consulted 18 October 2026
                  </span>
                </li>
              ))}
            </ol>
          ) : (
            <p className="info-panel">
              This sample feature has not yet completed historical research.
              Manufacturer sources, contemporary documents and claim-level
              evidence will appear here after verification.
            </p>
          )}
        </div>
      </section>
      <div className="story-end">
        <Share />
        <a
          className="text-link"
          href={"/corrections?page=" + encodeURIComponent("/cars/" + slug)}
        >
          Suggest a correction <ArrowUpRight size={15} />
        </a>
      </div>
      <SectionLabel number="↳" link="All stories" href="/archive">
        KEEP EXPLORING
      </SectionLabel>
      <div className="journal-grid">
        {cars
          .filter((k) => k.slug !== slug)
          .slice(0, 3)
          .map((k) => (
            <CarCard key={k.slug} car={k} />
          ))}
      </div>
      <div style={{ paddingTop: 60 }}>
        <Newsletter />
      </div>
    </main>
  );
}
