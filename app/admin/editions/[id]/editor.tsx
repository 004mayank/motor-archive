"use client";
import { useEffect, useState } from "react";
type Section = { id: string; heading: string; body: string };
type Claim = {
  id: string;
  claim: string;
  passage: string | null;
  sourceId: string | null;
  verified: boolean;
  contradictions: string | null;
};
type ImageAsset = {
  id: string;
  url: string;
  creator: string;
  license: string;
  sourceUrl: string;
  licenseUrl: string;
  identityVerified: boolean;
  rightsVerified: boolean;
};
type Source = { id: string; title: string; url: string; publisher: string };
type Detail = {
  edition: {
    id: string;
    headline: string;
    status: string;
    sample: boolean;
    version: number;
    image: string;
  };
  sections: Section[];
  claims: Claim[];
  images: ImageAsset[];
  sources: Source[];
  documents: {
    id: string;
    title: string;
    url: string;
    kind: string;
    modelYears: string;
    market: string;
    variant: string;
    verified: boolean;
  }[];
  gates: { name: string; passed: boolean; detail: string }[];
};
export function EditionEditor({ id }: { id: string }) {
  const [data, setData] = useState<Detail | null>(null);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  async function load() {
    try {
      const r = await fetch("/api/admin?id=" + encodeURIComponent(id));
      const j = (await r.json()) as Detail & { message: string };
      if (!r.ok) throw Error(j.message);
      setData(j);
    } catch (e) {
      setMessage(String(e));
    }
  }
  useEffect(() => {
    load();
  }, [id]);
  async function act(body: Record<string, unknown>) {
    setBusy(true);
    try {
      const r = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const j = (await r.json()) as {
        message: string;
        result: { message?: string };
      };
      if (!r.ok) throw Error(j.message);
      setMessage(j.result?.message || "Review recorded.");
      await load();
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Could not save review");
    } finally {
      setBusy(false);
    }
  }
  if (!data)
    return (
      <p className="no-results">{message || "Opening the editorial record…"}</p>
    );
  return (
    <>
      <div className="admin-banner">
        <span>
          {data.edition.headline} / v{data.edition.version} /{" "}
          {data.edition.status}
        </span>
        <span>
          {data.edition.sample ? "SAMPLE EDITION" : "PRODUCTION DRAFT"}
        </span>
      </div>
      <div className="admin-tabs">
        <a href="#editor-article">Article</a>
        <a href="#editor-evidence">Evidence</a>
        <a href="#editor-images">Photography</a>
        <a href="#editor-documents">Documents</a>
        <a href="#editor-quality">Quality</a>
      </div>
      {message && (
        <p className="error-message" role="status">
          {message}
        </p>
      )}
      <section id="editor-article" className="section">
        <h2 className="section-title">The story, line by line.</h2>
        {data.sections.map((s) => (
          <SectionEditor
            key={s.id + data.edition.version}
            section={s}
            busy={busy}
            save={act}
          />
        ))}
      </section>
      <section id="editor-evidence" className="section">
        <h2 className="section-title">Evidence before eloquence.</h2>
        {data.claims.length ? (
          data.claims.map((c) => (
            <div className="info-panel" style={{ marginBottom: 20 }} key={c.id}>
              <span className="eyebrow">
                {c.verified ? "REVIEWED" : "AWAITING VERIFICATION"}
              </span>
              <p style={{ margin: "15px 0" }}>{c.claim}</p>
              <blockquote
                style={{
                  margin: "10px 0",
                  fontFamily: "Georgia",
                  fontSize: 17,
                }}
              >
                {c.passage || "No supporting passage recorded."}
              </blockquote>
              {c.sourceId && (
                <a
                  className="text-link"
                  href={data.sources.find((s) => s.id === c.sourceId)?.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open the source ↗
                </a>
              )}
              {c.contradictions && (
                <p className="error-message">
                  Unresolved contradiction: {c.contradictions}
                </p>
              )}
              <button
                style={{ display: "block", marginTop: 18 }}
                className="button outline"
                disabled={busy}
                onClick={() =>
                  act({
                    action: "verify-claim",
                    id: c.id,
                    verified: !c.verified,
                  })
                }
              >
                {c.verified ? "Reopen review" : "Mark independently verified"}
              </button>
            </div>
          ))
        ) : (
          <p className="no-results">
            No structured claim evidence is recorded. This edition cannot pass
            production quality checks.
          </p>
        )}
        <h3 style={{ fontSize: 28, margin: "25px 0" }}>The source record.</h3>
        <ol className="source-list">
          {data.sources.map((s) => (
            <li key={s.id}>
              <a href={s.url} target="_blank" rel="noreferrer">
                {s.title} ↗
              </a>
              <span>{s.publisher}</span>
            </li>
          ))}
        </ol>
      </section>
      <section id="editor-images" className="section">
        <h2 className="section-title">The photograph and its permission.</h2>
        <div className="credits-grid">
          {data.images.map((i) => (
            <figure className="credit" key={i.id}>
              <img
                src={i.url}
                alt={"Editorial image candidate by " + i.creator}
              />
              <figcaption>
                {i.creator} ·{" "}
                <a href={i.licenseUrl} target="_blank" rel="noreferrer">
                  {i.license} ↗
                </a>
                <br />
                <a href={i.sourceUrl} target="_blank" rel="noreferrer">
                  Open original image and rights record ↗
                </a>
                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    flexWrap: "wrap",
                    marginTop: 15,
                  }}
                >
                  <button
                    className="button outline"
                    disabled={busy}
                    onClick={() =>
                      act({
                        action: "verify-image",
                        id: i.id,
                        identity: !i.identityVerified,
                        rights: i.rightsVerified,
                      })
                    }
                  >
                    {i.identityVerified
                      ? "Reopen model match"
                      : "Confirm model match"}
                  </button>
                  <button
                    className="button outline"
                    disabled={busy}
                    onClick={() =>
                      act({
                        action: "verify-image",
                        id: i.id,
                        identity: i.identityVerified,
                        rights: !i.rightsVerified,
                      })
                    }
                  >
                    {i.rightsVerified
                      ? "Reopen rights review"
                      : "Confirm full license review"}
                  </button>
                  <button
                    className="button"
                    disabled={busy || !i.identityVerified || !i.rightsVerified}
                    onClick={() =>
                      act({ action: "select-cover", id, imageId: i.id })
                    }
                  >
                    {data.edition.image === i.url
                      ? "Current cover"
                      : "Select as cover"}
                  </button>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
      <section id="editor-documents" className="section">
        <h2 className="section-title">Documentation, with context.</h2>
        {data.documents.map((d) => (
          <div className="document-row" key={d.id}>
            <span className="document-icon">↗</span>
            <div>
              <span className="tag">
                {d.verified ? "VERIFIED" : "UNVERIFIED CANDIDATE"}
              </span>
              <h3>
                <a href={d.url} target="_blank" rel="noreferrer">
                  {d.title}
                </a>
              </h3>
              <p>
                {d.modelYears} / {d.market} / {d.variant}
              </p>
            </div>
          </div>
        ))}
        <p className="sample-note">
          Unreviewed documents are excluded from the public workshop. Full model
          applicability and technical review must be recorded before making a
          document available.
        </p>
      </section>
      <section id="editor-quality" className="section">
        <h2 className="section-title">Ready means every critical gate.</h2>
        {data.gates.map((g) => (
          <div key={g.name} className="document-row">
            <span className="document-icon">{g.passed ? "✓" : "×"}</span>
            <div>
              <h3>{g.name}</h3>
              <p>{g.detail}</p>
            </div>
          </div>
        ))}
        <div style={{ display: "flex", gap: 15, margin: "30px 0 65px" }}>
          <button
            className="button"
            disabled={busy || data.gates.some((g) => !g.passed)}
            onClick={() => act({ action: "publish", id })}
          >
            Approve & publish ↗
          </button>
          <button
            className="button outline"
            disabled={busy}
            onClick={() => act({ action: "reject", id })}
          >
            Reject edition
          </button>
        </div>
      </section>
    </>
  );
}
function SectionEditor({
  section,
  busy,
  save,
}: {
  section: Section;
  busy: boolean;
  save: (body: Record<string, unknown>) => Promise<void>;
}) {
  const [heading, setHeading] = useState(section.heading);
  const [body, setBody] = useState(section.body);
  return (
    <form
      className="settings-form"
      style={{ maxWidth: 800 }}
      onSubmit={(e) => {
        e.preventDefault();
        save({ action: "edit", id: section.id, heading, text: body });
      }}
    >
      <label>
        Section heading
        <input
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          required
        />
      </label>
      <label>
        Editorial text
        <textarea
          style={{
            minHeight: 220,
            fontFamily: "Georgia",
            fontSize: 16,
            lineHeight: 1.8,
          }}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
      </label>
      <button className="button outline" disabled={busy}>
        Save draft revision
      </button>
    </form>
  );
}
