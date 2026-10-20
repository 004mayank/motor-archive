"use client";
import { useState } from "react";
export function FeedbackDraft({
  page = "",
  kind = "correction",
}: {
  page?: string;
  kind?: "correction" | "enquiry";
}) {
  const [status, setStatus] = useState("");
  const returnPage = /^\/cars\/[a-z0-9-]+(?:\/workshop)?$/.test(page)
    ? page
    : "/archive";
  return (
    <section className="feedback-draft">
      <span className="eyebrow">
        PREPARE A {kind === "correction" ? "CORRECTION" : "STORY IDEA"}
      </span>
      <h2>Put the details in order.</h2>
      <p>
        This preview does not send reports. Prepare and download a draft to keep
        the source and your notes together. Nothing entered here is submitted to
        a server.
      </p>
      <form
        onChange={() => setStatus("")}
        onSubmit={(e) => {
          e.preventDefault();
          const data = new FormData(e.currentTarget);
          const text = `MOTOR / ARCHIVE / ${kind.toUpperCase()} DRAFT\nPrepared: ${new Date().toISOString()}\n\nPage / story: ${data.get("page")}\n\n${kind === "correction" ? "Claim or issue" : "Story idea"}:\n${data.get("issue")}\n\n${kind === "correction" ? "Proposed correction" : "Why it matters"}:\n${data.get("proposal")}\n\nSupporting source:\n${data.get("evidence")}\n\nThis is a local draft. It has not been submitted or sent.\n`;
          const url = URL.createObjectURL(
            new Blob([text], { type: "text/plain;charset=utf-8" }),
          );
          const link = document.createElement("a");
          link.href = url;
          link.download = "motor-archive-" + kind + "-draft.txt";
          link.click();
          setTimeout(() => URL.revokeObjectURL(url), 1000);
          setStatus("Draft downloaded. It has not been sent.");
        }}
      >
        <label>
          PAGE OR STORY URL
          <input
            name="page"
            required={kind === "correction"}
            defaultValue={page.slice(0, 500)}
            maxLength={500}
            placeholder="/cars/porsche-911-original"
          />
        </label>
        <label>
          {kind === "correction" ? "CLAIM OR ISSUE" : "STORY IDEA"}
          <textarea name="issue" required maxLength={3000} rows={3} />
        </label>
        <label>
          {kind === "correction" ? "PROPOSED CORRECTION" : "WHY IT MATTERS"}
          <textarea name="proposal" required maxLength={3000} rows={3} />
        </label>
        <label>
          SUPPORTING SOURCE URL
          <input
            type="url"
            name="evidence"
            maxLength={1000}
            placeholder="https://…"
            required={kind === "correction"}
          />
        </label>
        <div className="feedback-actions">
          <button type="submit" className="button">
            DOWNLOAD {kind.toUpperCase()} DRAFT ↓
          </button>
          <a className="text-link" href={returnPage}>
            {returnPage === "/archive"
              ? "RETURN TO THE ARCHIVE"
              : "RETURN TO THE PAGE"}{" "}
            ↗
          </a>
        </div>
        <p className="form-status" role="status">
          {status ||
            "Your notes stay in this page until you leave. Download a copy before navigating away."}
        </p>
      </form>
    </section>
  );
}
