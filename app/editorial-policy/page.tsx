import { Newsletter } from "../components";
export const metadata = { title: "Every story needs a source." };
export default function Page() {
  return (
    <main className="wrap" id="main">
      <article className="text-page">
        <span className="eyebrow">HOW WE BUILD TRUST</span>
        <h1>Every story needs a source.</h1>
        <section>
          <h2>Evidence before eloquence.</h2>
          <p>
            We prioritize manufacturer archives, original technical documents,
            museums, racing records and reputable specialist reporting.
            Important claims require traceable supporting evidence. When sources
            disagree, we preserve the disagreement and explain uncertainty.
          </p>
        </section>
        <section>
          <h2>AI assistance, human accountability.</h2>
          <p>
            Automation can help discover sources and draft material. Generated
            text is treated as an unverified draft. Publication requires
            reviewed claims, applicable specifications and confirmed image
            rights. A numerical quality score cannot override a critical
            failure.
          </p>
        </section>
        <section>
          <h2>Technical knowledge requires precision.</h2>
          <p>
            Model year, generation, engine, transmission and market are part of
            every technical document’s applicability record. We do not invent
            torque settings, repair sequences, capacities or safety-critical
            procedures. Missing evidence means the instruction remains
            unpublished.
          </p>
        </section>
        <section>
          <h2>Photographs have authors.</h2>
          <p>
            Every published photograph needs a recorded creator, source and
            permission. Editorial crops and resizing are disclosed in the image
            credits. Manufacturer media access is not assumed to grant
            unrestricted reuse.
          </p>
        </section>
        <section>
          <h2>Corrections are part of the record.</h2>
          <p>
            Substantive corrections should preserve a dated account of what
            changed and why. This preview does not yet contain a production
            corrections history.
          </p>
        </section>
      </article>
    </main>
  );
}
