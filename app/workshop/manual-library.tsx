"use client";
import { useState } from "react";
import type { WorkshopResource, OwnerTask } from "@/lib/workshop";
export function ManualLibrary({
  resources,
}: {
  resources: WorkshopResource[];
}) {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState("All documents");
  const kinds = ["All documents", ...new Set(resources.map((r) => r.kind))];
  const shown = resources.filter(
    (r) =>
      (kind === "All documents" || r.kind === kind) &&
      `${r.title} ${r.coverage} ${r.reference} ${r.publisher}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <>
      <div className="manual-filters">
        <label>
          FIND A PUBLICATION
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Title, engine, year or publication number"
            type="search"
          />
        </label>
        <label>
          DOCUMENT TYPE
          <select value={kind} onChange={(e) => setKind(e.target.value)}>
            {kinds.map((k) => (
              <option key={k}>{k}</option>
            ))}
          </select>
        </label>
      </div>
      <p className="manual-count" role="status">
        {shown.length} of {resources.length} resources · external publisher
        access
      </p>
      <div className="manual-list">
        {shown.map((r) => (
          <article id={"resource-" + r.id} className="manual-card" key={r.id}>
            <div className="manual-spine" aria-hidden="true">
              M/A
              <br />
              <span>{r.kind === "Provider enquiry" ? "ASK" : "REF"}</span>
            </div>
            <div>
              <div className="manual-meta">
                <span className="tag">{r.kind}</span>
                <span>{r.access}</span>
              </div>
              <h3>{r.title}</h3>
              <p>{r.publisher}</p>
              <dl>
                <div>
                  <dt>COVERAGE</dt>
                  <dd>{r.coverage}</dd>
                </div>
                <div>
                  <dt>PUBLICATION</dt>
                  <dd>{r.reference}</dd>
                </div>
              </dl>
              <p className="manual-note">{r.note}</p>
              <div className="manual-card-foot">
                <a
                  className="text-link"
                  href={r.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {r.kind === "Provider enquiry"
                    ? "OPEN PROVIDER"
                    : r.embedUrl
                      ? "OPEN ONLINE MANUAL"
                      : r.access.includes("PDF")
                        ? "OPEN ORIGINAL PDF"
                        : "VIEW PUBLICATION"}{" "}
                  ↗
                </a>
                <small>Source checked {r.checked}</small>
              </div>
            </div>
          </article>
        ))}
      </div>
      {!shown.length && (
        <div className="info-panel">
          No matching publications. Clear the search or choose another document
          type.
        </div>
      )}
    </>
  );
}
export function OwnerInstructions({
  tasks,
  resources,
}: {
  tasks: OwnerTask[];
  resources: WorkshopResource[];
}) {
  const [matched, setMatched] = useState(false);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  if (!tasks.length)
    return (
      <div className="manual-gap">
        <span className="eyebrow">INSTRUCTIONS COVERAGE</span>
        <h3>Use the applicable manual for the operation.</h3>
        <p>
          The library above identifies the publications to obtain. Their repair
          contents have not been inspected here, so step-by-step mechanical
          instructions are not yet available for this car. Use the task index to
          find the right source and the worksheet to prepare the job.
        </p>
      </div>
    );
  return (
    <>
      <div className="owner-scope">
        <strong>Before opening these instructions</strong>
        <p>
          These two checks are summarized from the 1991 Acura NSX US/Canada
          owner’s handbook. They do not apply automatically to later NSX models
          or modified cars.
        </p>
        <label>
          <input
            type="checkbox"
            checked={matched}
            onChange={(e) => {
              setMatched(e.target.checked);
              setChecked({});
            }}
          />{" "}
          I have confirmed this is a 1991 Acura NSX covered by the US/Canada
          handbook, with the applicable configuration.
        </label>
      </div>
      {tasks.map((t) => (
        <details className="owner-task" key={t.id}>
          <summary>
            <span>OWNER CHECK</span>
            <h3>{t.title}</h3>
            <b aria-hidden="true">+</b>
          </summary>
          <div className="owner-task-body">
            <p className="eyebrow">{t.scope}</p>
            <p>
              <strong>Have ready:</strong> {t.tools}
            </p>
            {matched ? (
              <>
                <ol>
                  {t.steps.map((step, i) => (
                    <li key={step}>
                      <label>
                        <input
                          type="checkbox"
                          checked={!!checked[t.id + i]}
                          onChange={(e) =>
                            setChecked({
                              ...checked,
                              [t.id + i]: e.target.checked,
                            })
                          }
                        />
                        <span>{step}</span>
                      </label>
                    </li>
                  ))}
                </ol>
                <p className="task-finish">{t.finish}</p>
                <p role="status">
                  {t.steps.filter((_, i) => checked[t.id + i]).length} /{" "}
                  {t.steps.length} checklist items marked · session only
                </p>
              </>
            ) : (
              <p className="info-panel">
                Confirm the vehicle applicability above to reveal the checklist,
                or read the original source below.
              </p>
            )}
            <a
              className="text-link"
              href={resources.find((r) => r.id === t.sourceId)?.url}
              target="_blank"
              rel="noreferrer"
            >
              READ THE ORIGINAL INSTRUCTIONS ↗
            </a>
            <small>
              {t.pages} · editorial summary; follow the original warnings and
              illustrations.
            </small>
          </div>
        </details>
      ))}
    </>
  );
}
export function WorksheetManual({
  resources,
}: {
  resources: WorkshopResource[];
}) {
  const manual =
    resources.find((r) => r.kind === "Service manual" && r.embedUrl) ||
    resources.find((r) => r.kind === "Service manual");
  if (!manual)
    return (
      <div className="worksheet-manual worksheet-manual-gap">
        <span className="eyebrow">YOUR SOURCE DOCUMENT</span>
        <h3>Choose the matching publication.</h3>
        <p>
          Use the document library to find the applicable handbook or request
          service literature before preparing the job.
        </p>
        <a className="text-link" href="#manuals">
          BROWSE THE DOCUMENT LIBRARY ↑
        </a>
      </div>
    );
  return (
    <article
      className="worksheet-manual"
      aria-label="Service manual for this worksheet"
    >
      <header>
        <div>
          <span className="eyebrow">READ THE MANUAL / PREPARE THE JOB</span>
          <h3>{manual.title}</h3>
          <p>{manual.coverage}</p>
        </div>
        <a
          className="button"
          href={manual.url}
          target="_blank"
          rel="noreferrer"
        >
          OPEN SERVICE MANUAL ↗
        </a>
      </header>
      <p className="worksheet-manual-scope">{manual.note}</p>
      {manual.embedUrl && (
        <>
          <iframe
            src={manual.embedUrl}
            title={manual.title + " external document reader"}
            loading="lazy"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
          <p className="worksheet-reader-help">
            Reader not loading or asking you to sign in?{" "}
            <a href={manual.url} target="_blank" rel="noreferrer">
              Open the manual in a new tab ↗
            </a>
            . Your worksheet stays here.
          </p>
        </>
      )}
      <a className="text-link" href="#manuals">
        ALL PUBLICATIONS & COVERAGE ↑
      </a>
    </article>
  );
}
export function ServiceWorksheet({
  name,
  slug,
  matching,
  resources,
}: {
  name: string;
  slug: string;
  matching: string[];
  resources: WorkshopResource[];
}) {
  const [year, setYear] = useState("");
  const [variant, setVariant] = useState("");
  const [mileage, setMileage] = useState("");
  const [job, setJob] = useState("");
  const [notes, setNotes] = useState("");
  function download() {
    const content = `MOTOR / ARCHIVE - SERVICE PREPARATION\n${name}\nDate: ${new Date().toLocaleDateString()}\nYear / market: ${year}\nEngine / transmission: ${variant}\nOdometer / unit: ${mileage}\nPlanned job: ${job}\nNotes / previous service: ${notes}\n\nAPPLICABILITY\n${matching.map((s) => "[ ] " + s).join("\n")}\n\nBEFORE WORK\n[ ] Obtain and read the applicable complete operation\n[ ] Record publication, revision, section and page\n[ ] Confirm tools, parts, specifications and support equipment\n[ ] Confirm competence and any specialist involvement\n\nSOURCE PUBLICATION / REVISION / PAGE: __________________\nSPECIFICATIONS TO CONFIRM FROM SOURCE: _________________\nCOMPLETED BY / DATE / ODOMETER: _________________________\nPARTS / FLUIDS / RECEIPTS: ______________________________\nFOLLOW-UP: ___________________________________________\n\nPUBLICATION LINKS\n${resources.map((r) => r.title + "\n" + r.coverage + "\n" + r.reference + "\n" + r.url).join("\n\n")}\n\nThis is a preparation worksheet, not a repair procedure or a completed service record. Nothing entered here is sent to a server.\n`;
    const url = URL.createObjectURL(
      new Blob([content], { type: "text/plain;charset=utf-8" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = slug + "-service-worksheet.txt";
    a.click();
    URL.revokeObjectURL(url);
  }
  return (
    <div className="service-worksheet">
      <div className="worksheet-fields">
        <label>
          YEAR / MARKET
          <input
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="e.g. 1991 / US"
          />
        </label>
        <label>
          ENGINE / TRANSMISSION
          <input
            value={variant}
            onChange={(e) => setVariant(e.target.value)}
            placeholder="Installed variant"
          />
        </label>
        <label>
          ODOMETER / UNIT
          <input
            value={mileage}
            onChange={(e) => setMileage(e.target.value)}
            placeholder="Include miles or km"
          />
        </label>
        <label>
          PLANNED JOB
          <input
            value={job}
            onChange={(e) => setJob(e.target.value)}
            placeholder="Check, service or inspection"
          />
        </label>
        <label className="worksheet-notes">
          NOTES / PREVIOUS SERVICE
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            placeholder="Previous work, symptoms, source references"
          />
        </label>
      </div>
      <div className="worksheet-actions">
        <button className="button" onClick={download}>
          DOWNLOAD WORKSHEET ↓
        </button>
        <p>
          A text file with your notes, publication links and preparation
          checklist. Kept in this page until you leave; nothing is submitted.
        </p>
      </div>
    </div>
  );
}
