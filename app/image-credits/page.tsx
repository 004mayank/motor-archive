import credits from "@/public/images/credits.json";
import technical from "@/public/images/technical-reference.json";
import plates from "@/public/images/technical-plates.json";
export const metadata = { title: "Photography & image credits" };
export default function Page() {
  return (
    <main className="wrap" id="main">
      <div className="page-heading">
        <div>
          <span className="eyebrow">PHOTOGRAPHY IS PART OF THE STORY</span>
          <h1>Behind the lens.</h1>
        </div>
        <p>
          Real photographs. Named creators.
          <br />
          Traceable permissions.
          <br />
          Photography from Wikimedia Commons. Technical reference supplied
          separately.
        </p>
      </div>
      <p className="sample-note">
        Images have been resized and may be cropped for editorial layouts.
        Original colors are retained. Reuse and adaptations of each photograph
        follow its linked license, including ShareAlike where applicable.
        Technical plates are visual references and are not verified service
        diagrams.
      </p>
      <section className="sample-note" style={{ marginBottom: 30 }}>
        <h2>Technical reference plate</h2>
        <p>
          {technical.title}. {technical.providedBy}. {technical.rightsStatus}.{" "}
          {technical.applicability}. {technical.modifications}.
        </p>
        <a
          className="text-link"
          href={technical.source}
          target="_blank"
          rel="noreferrer"
        >
          Supplied reference link ↗
        </a>
      </section>
      <section className="technical-diagram-credits">
        <h2>Vehicle line drawings</h2>
        <div className="credits-grid">
          {Object.values(plates)
            .filter((p) => p.licenseUrl)
            .map((p) => (
              <figure className="credit" key={p.vehicleSlug}>
                <img src={p.src} alt={p.alt} loading="lazy" />
                <figcaption>
                  <strong>{p.label}</strong>
                  <br />
                  {p.credit} /{" "}
                  <a href={p.licenseUrl} target="_blank" rel="noreferrer">
                    {p.license} ↗
                  </a>
                  <br />
                  <a href={p.source} target="_blank" rel="noreferrer">
                    Original drawing and attribution ↗
                  </a>
                  <br />
                  {p.modifications}
                  <br />
                  Source checked {p.checked}. Visual reference; dimensions not
                  validated for repair.
                </figcaption>
              </figure>
            ))}
        </div>
      </section>
      <div className="credits-grid" style={{ marginBottom: 70 }}>
        {credits
          .filter((c) => !c.id.startsWith("bmw"))
          .map((c) => (
            <figure className="credit" key={c.id}>
              <img
                src={c.src}
                alt={c.title.replace("File:", "")}
                loading="lazy"
              />
              <figcaption>
                <strong>{c.title.replace("File:", "")}</strong>
                <br />
                Photograph © {c.creator}
                <br />
                <a href={c.source} target="_blank" rel="noreferrer">
                  Original image & attribution ↗
                </a>{" "}
                ·{" "}
                <a
                  href={
                    c.licenseUrl ||
                    "https://commons.wikimedia.org/wiki/Commons:Licensing"
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  {c.license} ↗
                </a>
                <br />
                {c.modifications}
                <br />
                Retrieved {c.retrievedAt}
              </figcaption>
            </figure>
          ))}
      </div>
    </main>
  );
}
