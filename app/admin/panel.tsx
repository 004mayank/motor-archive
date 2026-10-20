"use client";
import { useEffect, useState } from "react";
import { ArrowUpRight, RefreshCw } from "lucide-react";
type Edition = {
  id: string;
  number: number;
  headline: string;
  vehicleSlug: string;
  status: string;
  sample: boolean;
  version: number;
};
type Run = {
  id: string;
  status: string;
  cost: number;
  createdAt: string;
  error: string | null;
};
type Audit = { id: string; actor: string; action: string; createdAt: string };
type Desk = {
  editions: Edition[];
  runs: Run[];
  audit: Audit[];
  settings: { key: string; value: string }[];
};
export function AdminDesk({ authorized }: { authorized: boolean }) {
  const [tab, setTab] = useState("Editions");
  const [data, setData] = useState<Desk>({
    editions: [],
    runs: [],
    audit: [],
    settings: [],
  });
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [detail, setDetail] = useState<unknown>(null);
  const [mode, setMode] = useState("approval");
  const [budget, setBudget] = useState("25");
  const [timezone, setTimezone] = useState("Asia/Kolkata");
  const [cron, setCron] = useState("0 9 * * 0");
  async function load() {
    if (!authorized) return;
    try {
      const r = await fetch("/api/admin");
      const j = (await r.json()) as Desk & { message: string };
      if (!r.ok) throw Error(j.message);
      setData(j);
      for (const setting of j.settings) {
        if (setting.key === "publishing_mode") setMode(setting.value);
        if (setting.key === "monthly_budget") setBudget(setting.value);
        if (setting.key === "timezone") setTimezone(setting.value);
        if (setting.key === "weekly_cron") setCron(setting.value);
      }
    } catch (e) {
      setMessage(
        e instanceof Error ? e.message : "Could not load editorial data",
      );
    }
  }
  useEffect(() => {
    load();
  }, [authorized]);
  async function action(body: Record<string, unknown>) {
    setBusy(true);
    setMessage("");
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
      setDetail(j.result);
      setMessage(j.result?.message || "Editorial action recorded.");
      await load();
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Request failed");
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <div className="admin-banner">
        <span>
          {authorized
            ? "AUTHORIZED EDITOR / ALL MUTATIONS ARE AUDITED"
            : "READ-ONLY PREVIEW / ADMINISTRATOR ACCESS IS NOT CONFIGURED"}
        </span>
        <button
          onClick={load}
          disabled={!authorized || busy}
          aria-label="Refresh editorial data"
        >
          <RefreshCw size={18} />
        </button>
      </div>
      {!authorized && (
        <p className="sample-note">
          This is a private dashboard preview. Set the server-side ADMIN_EMAILS
          allowlist to grant editorial access. Write APIs reject unconfigured
          and unauthorized users. No private operational data is shown here.
        </p>
      )}
      <div className="admin-grid">
        {[
          [
            "PUBLISHED EDITIONS",
            data.editions.filter((e) => e.status === "published").length,
          ],
          [
            "AWAITING REVIEW",
            data.editions.filter((e) => e.status === "draft").length,
          ],
          ["WORKFLOW RUNS", data.runs.length],
          [
            "ESTIMATED API COST",
            "$" + data.runs.reduce((a, b) => a + b.cost, 0).toFixed(2),
          ],
        ].map(([label, value]) => (
          <div className="stat" key={label}>
            <span className="eyebrow">{label}</span>
            <strong>{authorized ? value : "-"}</strong>
            <span className="eyebrow">
              {authorized ? "LIVE DATABASE" : "CONNECT EDITORIAL ACCESS"}
            </span>
          </div>
        ))}
      </div>
      <div className="admin-tabs" role="tablist">
        {["Editions", "Automation", "Settings", "Audit log"].map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={tab === t}
            className={tab === t ? "active" : ""}
            onClick={() => {
              setTab(t);
              setDetail(null);
            }}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="admin-content">
        {tab === "Editions" && (
          <>
            {data.editions.length ? (
              <div className="table-scroll">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Edition</th>
                      <th>Story</th>
                      <th>Status</th>
                      <th>Review controls</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.editions.map((e) => (
                      <tr key={e.id}>
                        <td>
                          {String(e.number).padStart(3, "0")}
                          <br />
                          <small>v{e.version}</small>
                        </td>
                        <td>
                          <a href={"/admin/editions/" + e.id}>{e.headline}</a>
                          {e.sample && (
                            <span
                              className="tag"
                              style={{ display: "block", marginTop: 8 }}
                            >
                              SAMPLE EDITION
                            </span>
                          )}
                        </td>
                        <td>{e.status}</td>
                        <td>
                          <button
                            disabled={busy}
                            onClick={() =>
                              action({ action: "quality", id: e.id })
                            }
                          >
                            Review quality
                          </button>
                          <button
                            disabled={busy}
                            onClick={() =>
                              action({
                                action:
                                  e.status === "published"
                                    ? "unpublish"
                                    : "publish",
                                id: e.id,
                              })
                            }
                          >
                            {e.status === "published"
                              ? "Unpublish"
                              : "Approve & publish"}
                          </button>
                          <button
                            disabled={busy}
                            onClick={() =>
                              action({ action: "reject", id: e.id })
                            }
                          >
                            Reject
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="no-results">
                {authorized
                  ? "No editions are available. Start a workflow from the Automation tab."
                  : "Connect an administrator to review draft articles, source evidence, image licenses and publication checks."}
              </div>
            )}
            <div className="info-panel">
              Approval never bypasses a critical quality failure. Sample
              editions cannot be approved as production content. Missing
              workshop manuals do not block a complete historical article.
            </div>
          </>
        )}
        {tab === "Automation" && (
          <>
            <p className="info-panel">
              Each run has a persistent idempotency key and stage checkpoints.
              Use “Advance stage” to resume a run. Live research and generation
              require configured providers. Dry runs never publish or send
              newsletters.
            </p>
            <div style={{ display: "flex", gap: 15, margin: "25px 0" }}>
              <button
                className="button"
                disabled={!authorized || busy}
                onClick={() =>
                  action({
                    action: "start",
                    key: "manual-" + crypto.randomUUID(),
                    dryRun: true,
                  })
                }
              >
                Start a dry run <ArrowUpRight size={16} />
              </button>
              <button
                className="button outline"
                disabled={!authorized || busy}
                onClick={() =>
                  action({
                    action: "start",
                    key: "manual-" + crypto.randomUUID(),
                    dryRun: false,
                  })
                }
              >
                Create an approval workflow
              </button>
            </div>
            <div className="table-scroll">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Run</th>
                    <th>Status</th>
                    <th>Cost estimate</th>
                    <th>Control</th>
                  </tr>
                </thead>
                <tbody>
                  {data.runs.map((r) => (
                    <tr key={r.id}>
                      <td>
                        {r.id.slice(0, 8)}
                        <br />
                        {new Date(r.createdAt).toLocaleDateString()}
                      </td>
                      <td>
                        {r.status}
                        {r.error && (
                          <p
                            style={{
                              maxWidth: 260,
                              fontSize: 10,
                              marginTop: 8,
                            }}
                          >
                            {r.error}
                          </p>
                        )}
                      </td>
                      <td>${r.cost.toFixed(2)}</td>
                      <td>
                        <button
                          disabled={busy}
                          onClick={() =>
                            action({ action: "advance", id: r.id })
                          }
                        >
                          Advance stage / retry
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
        {tab === "Settings" && (
          <form
            className="settings-form"
            onSubmit={(e) => {
              e.preventDefault();
              action({
                action: "settings",
                values: {
                  publishing_mode: mode,
                  monthly_budget: budget,
                  timezone,
                  weekly_cron: cron,
                },
              });
            }}
          >
            <label>
              Publishing mode
              <select value={mode} onChange={(e) => setMode(e.target.value)}>
                <option value="draft">Draft only</option>
                <option value="approval">Administrator approval</option>
                <option value="automatic" disabled>
                  Automatic - requires production workflow configuration
                </option>
              </select>
            </label>
            <label>
              Weekly schedule (cron expression)
              <input
                value={cron}
                onChange={(e) => setCron(e.target.value)}
                required
              />
            </label>
            <label>
              Timezone
              <input
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                required
              />
            </label>
            <label>
              Monthly spending limit (USD)
              <input
                type="number"
                min="0"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                required
              />
            </label>
            <p className="sample-note">
              The saved schedule is a configuration record. A configured
              external scheduler must invoke the authenticated cron endpoint.
              Estimates are reconciled against provider billing before live
              automation.
            </p>
            <button className="button" disabled={!authorized || busy}>
              Save editorial settings
            </button>
          </form>
        )}
        {tab === "Audit log" && (
          <div className="table-scroll">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Actor</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.audit.map((a) => (
                  <tr key={a.id}>
                    <td>{new Date(a.createdAt).toLocaleString()}</td>
                    <td>{a.actor}</td>
                    <td>{a.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!data.audit.length && (
              <p className="no-results">
                Audit entries appear here after authorized editorial actions.
              </p>
            )}
          </div>
        )}
      </div>
      {message && (
        <div className="error-message" role="status">
          {message}
        </div>
      )}
      {detail != null && (
        <div className="info-panel" style={{ marginBottom: 40 }}>
          <span className="eyebrow">EDITORIAL RESULT</span>
          <pre
            style={{
              whiteSpace: "pre-wrap",
              fontSize: 11,
              overflowWrap: "anywhere",
              marginTop: 15,
            }}
          >
            {JSON.stringify(detail, null, 2)}
          </pre>
        </div>
      )}
    </>
  );
}
