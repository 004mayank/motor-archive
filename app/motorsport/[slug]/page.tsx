import { features } from "@/lib/features";
import credits from "@/public/images/history-credits.json";
import { notFound } from "next/navigation";
import { Gallery, Newsletter } from "@/app/components";
import { ArrowUpRight } from "lucide-react";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const f = features.find((f) => f.slug === slug);
  return { title: f?.title || "Motorsport", description: f?.deck };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const f = features.find((f) => f.slug === slug);
  if (!f) notFound();
  const cc = credits.filter((c) => f.images.includes(c.src));
  return (
    <main id="main">
      <div className="wrap">
        <div className="essay-heading">
          <a className="eyebrow" href="/motorsport">
            ← MOTORSPORT / {f.category}
          </a>
          <h1>{f.title}</h1>
          <div>
            <p>{f.deck}</p>
            <span className="eyebrow">
              {f.place}
              <br />
              {f.date} / A PHOTOGRAPHIC ESSAY
            </span>
          </div>
        </div>
      </div>
      <figure className="essay-cover">
        <img src={f.cover} alt={f.deck} fetchPriority="high" />
        <figcaption>
          {f.date} · {cc.find((c) => c.src === f.cover)?.creator} ·{" "}
          <a href="/image-credits">PHOTOGRAPH CREDITS ↗</a>
        </figcaption>
      </figure>
      <div className="wrap">
        <div className="essay-intro">
          <span className="eyebrow">
            LOOK BACK.
            <br />
            FEEL SOMETHING.
          </span>
          <p>{f.intro}</p>
        </div>
        {f.sections.map((s, i) => (
          <section className="essay-section" key={s.heading}>
            <div className="essay-section-copy">
              <span className="eyebrow">
                0{i + 1} / {f.category}
              </span>
              <h2>{s.heading}</h2>
              {s.body.split("\n\n").map((p, n) => (
                <p key={n}>{p}</p>
              ))}
              {s.sourceUrl && (
                <a
                  className="source-ref"
                  href={s.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  SOURCE / AUTOMOBILE CLUB DE L’OUEST ↗
                </a>
              )}
            </div>
            {f.images[i + 1] && (
              <figure className="essay-inline-image">
                <img
                  src={f.images[i + 1]}
                  alt={
                    f.date +
                    " period photograph from the " +
                    f.category.toLowerCase() +
                    " archive"
                  }
                  loading="lazy"
                />
                <figcaption>
                  FRAME 0{i + 2} / {f.date} /{" "}
                  <a href="/image-credits">CREDITS ↗</a>
                </figcaption>
              </figure>
            )}
          </section>
        ))}
        <section className="section">
          <div className="section-label">
            <span>↳ THE ORIGINAL FRAMES</span>
          </div>
          <Gallery images={f.images} name={f.place + " · " + f.date} />
        </section>
        <section className="essay-sources">
          <span className="eyebrow">PROVENANCE / PHOTOGRAPHIC SOURCES</span>
          {cc.map((c) => (
            <div key={c.id}>
              <a href={c.source} target="_blank" rel="noreferrer">
                {c.title.replace("File:", "")} <ArrowUpRight size={15} />
              </a>
              <p>
                Photograph © {c.creator} ·{" "}
                <a href={c.licenseUrl} target="_blank" rel="noreferrer">
                  {c.license}
                </a>{" "}
                · Original source and caption. Resized and cropped for
                presentation.
              </p>
            </div>
          ))}
          {f.slug === "rally-without-barriers" && (
            <a
              className="signal-button dark-button"
              href="/cars/lancia-stratos-hf"
            >
              EXPLORE THE LANCIA STRATOS <ArrowUpRight />
            </a>
          )}
          <p className="sample-note">
            This photo essay preserves and interprets source photographs. It is
            not a complete race-results report. Event dates follow the original
            source captions; digital scan metadata can be later.
          </p>
        </section>
        <Newsletter />
      </div>
    </main>
  );
}
