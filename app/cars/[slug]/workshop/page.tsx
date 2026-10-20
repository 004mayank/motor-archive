import { getCar, getDocuments } from "@/lib/repository";
import { notFound } from "next/navigation";
import { TechnicalPlate } from "@/app/workshop/technical-plate";
import technicalPlates from "@/public/images/technical-plates.json";
import { workshopFiles, type WorkshopResource } from "@/lib/workshop";
import {
  ManualLibrary,
  OwnerInstructions,
  ServiceWorksheet,
  WorksheetManual,
} from "@/app/workshop/manual-library";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = await getCar(slug);
  return {
    title: c
      ? c.manufacturer + " " + c.model + " service manuals & maintenance"
      : "Workshop",
  };
}
export default async function Workshop({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = await getCar(slug);
  if (!c) notFound();
  const indexed = await getDocuments(slug);
  const file = workshopFiles[slug];
  const extra: WorkshopResource[] = indexed.map((d) => ({
    id: d.id,
    title: d.title,
    publisher: d.publisher,
    kind: "Service manual",
    coverage: [d.modelYears, d.market, d.variant].join(" · "),
    access: "External source · confirm access with publisher",
    reference: d.revision || "Revision not stated",
    url: d.url,
    note: "Archive-indexed document. Confirm the document type and applicability with the publisher before use.",
    checked: d.retrievedAt.slice(0, 10),
  }));
  const resources = [...(file?.resources || []), ...extra];
  const matching = file?.matching || [
    "Confirm the model year, market, engine and transmission against the publication.",
  ];
  const manuals = resources.filter((r) => r.kind === "Service manual").length;
  return (
    <main id="main" className="workshop-file">
      <div className="wrap">
        <div className="workshop-file-heading">
          <div>
            <a className="eyebrow" href={"/cars/" + slug}>
              ← {c.manufacturer} {c.model} / THE STORY
            </a>
            <h1>
              THE WORKSHOP
              <span>
                {c.manufacturer} {c.model}.
              </span>
            </h1>
          </div>
          <p>
            {c.generation}
            <br />
            {c.startYear}-{c.endYear}
            <br />
            Service literature. Clear instructions.
            <br />A better place to begin.
          </p>
        </div>
        <div className="workshop-file-bar">
          <span>{resources.length} SOURCE LINKS</span>
          <span>
            {manuals} SERVICE-MANUAL {manuals === 1 ? "LISTING" : "LISTINGS"}
          </span>
          <a href="/workshop">CHANGE VEHICLE ↗</a>
        </div>
        <div className="workshop-layout">
          <aside className="workshop-nav">
            {[
              ["identity", "01 / MATCH YOUR CAR"],
              ["manuals", "02 / MANUAL LIBRARY"],
              ["tasks", "03 / FIND YOUR TASK"],
              ["instructions", "04 / OWNER CHECKS"],
              ["worksheet", "05 / MANUAL & WORKSHEET"],
            ].map(([id, title]) => (
              <a href={"#" + id} key={id}>
                {title}
              </a>
            ))}
            <p>
              Links lead to original providers. Paid publications open at their
              publisher; no purchase is made here.
            </p>
          </aside>
          <div className="workshop-content">
            <section id="identity">
              <span className="eyebrow">
                01 / THE RIGHT DOCUMENT FOR THE RIGHT CAR
              </span>
              <h2>
                Match it before
                <br />
                you use it.
              </h2>
              <p>
                {file?.intro ||
                  "Select applicable technical literature before starting a maintenance or repair operation."}
              </p>
              <ol className="applicability-list">
                {matching.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ol>
            </section>
            {slug in technicalPlates && (
              <section className="workshop-reference-section">
                <span className="eyebrow">
                  THE TECHNICAL PLATE / VISUAL REFERENCE
                </span>
                <h2>A closer look.</h2>
                <TechnicalPlate vehicleSlug={slug} />
              </section>
            )}
            <section id="manuals">
              <span className="eyebrow">02 / THE DOCUMENT SHELF</span>
              <h2>The service library.</h2>
              <p className="manual-library-intro">
                Publication details checked against the linked provider on 20
                October 2026. A confirmed listing establishes what is offered;
                it does not mean every repair operation has been reviewed.
              </p>
              <ManualLibrary resources={resources} />
            </section>
            <section id="tasks">
              <span className="eyebrow">03 / FIND YOUR TASK</span>
              <h2>Go to the right page.</h2>
              <div className="workshop-task-index">
                {file?.routing.map((t, i) => (
                  <article key={t.task}>
                    <span className="task-index-number">0{i + 1}</span>
                    <div>
                      <h3>{t.task}</h3>
                      <p>{t.note}</p>
                      <a
                        href={resources.find((r) => r.id === t.sourceId)?.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {t.section} · OPEN SOURCE ↗
                      </a>
                    </div>
                  </article>
                )) || <p>No task index is available for this car yet.</p>}
              </div>
            </section>
            <section id="instructions">
              <span className="eyebrow">04 / PRACTICAL INSTRUCTIONS</span>
              <h2>Read. Check. Record.</h2>
              <OwnerInstructions
                tasks={file?.tasks || []}
                resources={resources}
              />
            </section>
            <section id="worksheet">
              <span className="eyebrow">05 / PREPARE THE JOB</span>
              <h2>Your manual. Your worksheet.</h2>
              <WorksheetManual resources={resources} />
              <h3 className="worksheet-record-heading">
                Keep a useful record.
              </h3>
              <p>
                Write down the car’s configuration, the job and the source you
                will follow. Download the worksheet to take to the workshop or
                discuss with your specialist.
              </p>
              <ServiceWorksheet
                name={c.manufacturer + " " + c.model}
                slug={slug}
                matching={matching}
                resources={resources}
              />
            </section>
            <div className="workshop-source-note">
              <strong>A note on the literature</strong>
              <p>
                Owner checks and repair procedures serve different purposes. Use
                the complete applicable factory operation for dismantling,
                adjustments, tightening values and safety systems. Historical
                lubricant specifications and replacement parts may need current
                manufacturer confirmation. No manuals are mirrored or sold by
                MOTOR / ARCHIVE.
              </p>
              <a
                className="text-link"
                href={
                  "/corrections?page=" +
                  encodeURIComponent("/cars/" + slug + "/workshop")
                }
              >
                REPORT A DOCUMENT OR INSTRUCTION ISSUE ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
