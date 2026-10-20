import assert from "node:assert/strict";
const origin = "http://127.0.0.1:5173";
// This tests the portable starter's local-only identity. Never use it against a hosted Site.
const signIn = await fetch(origin + "/signin-with-chatgpt?return_to=%2Fadmin", {
  redirect: "manual",
});
const cookies = signIn.headers
  .getSetCookie()
  .map((c) => c.split(";")[0])
  .join("; ");
assert.ok(cookies, "The local development sign-in must return its test cookie");
const request = async (body) => {
  const r = await fetch(origin + "/api/admin", {
    method: "POST",
    headers: {
      Origin: origin,
      Cookie: cookies,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return { status: r.status, body: await r.json() };
};
let r = await request({ action: "quality", id: "sample-porsche-911-original" });
assert.equal(r.status, 200);
assert.ok(
  r.body.result.some((g) => g.name === "Production evidence" && !g.passed),
);
console.log("PASS authorized quality review blocks sample production");
r = await request({ action: "publish", id: "sample-porsche-911-original" });
assert.equal(r.status, 400);
console.log("PASS manual approval cannot bypass critical failure");
const key = "test-checkpoint-" + crypto.randomUUID();
r = await request({ action: "start", key, dryRun: true });
assert.equal(r.status, 200);
const runId = r.body.result.id;
const again = await request({ action: "start", key, dryRun: true });
assert.equal(again.body.result.id, runId);
console.log("PASS repeated start reuses persistent idempotency record");
r = await request({ action: "advance", id: runId });
assert.equal(r.status, 503);
console.log("PASS no eligible candidate fails closed before paid discovery");
const admin = await fetch(origin + "/api/admin", {
  headers: { Cookie: cookies },
});
const data = await admin.json();
assert.ok(data.runs.some((r) => r.id === runId && r.status === "failed"));
assert.ok(data.audit.length > 0);
console.log("PASS failed run and audit records persist");
const unauthorized = await fetch(origin + "/api/admin", {
  method: "POST",
  headers: {
    Origin: "https://untrusted.example",
    Cookie: cookies,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ action: "start", key: "cross-origin-test" }),
});
assert.equal(unauthorized.status, 403);
console.log("PASS cross-origin admin writes denied even with local identity");
