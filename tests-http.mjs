import assert from "node:assert/strict";
const origin = process.env.TEST_ORIGIN || "http://127.0.0.1:5173";
const routes = [
  "/",
  "/archive",
  "/motorsport",
  "/motorsport/le-mans-1966",
  "/motorsport/rally-without-barriers",
  "/design",
  "/photography",
  "/search",
  "/collections",
  "/collections/analog-icons",
  "/cars/porsche-911-original",
  "/cars/lancia-stratos-hf",
  "/cars/honda-nsx-na1",
  "/cars/jaguar-e-type-series-1",
  "/cars/honda-nsx-na1/workshop",
  "/cars/jaguar-e-type-series-1/workshop",
  "/cars/porsche-911-original/workshop",
  "/about",
  "/editorial-policy",
  "/image-credits",
  "/corrections",
  "/privacy",
  "/terms",
  "/contact",
  "/newsletter",
  "/api/health",
  "/feed.xml",
  "/sitemap.xml",
  "/robots.txt",
];
for (const route of routes) {
  const r = await fetch(origin + route);
  const body = await r.text();
  assert.equal(r.status, 200, route);
  assert.ok(
    !body.includes("A brief stop along the way."),
    route + " must not render error boundary",
  );
  console.log("PASS", route);
}
let r = await fetch(origin + "/api/admin");
assert.equal(r.status, 401);
console.log("PASS admin anonymous reads denied");
r = await fetch(origin + "/api/admin", {
  method: "POST",
  headers: { Origin: origin, "Content-Type": "application/json" },
  body: JSON.stringify({
    action: "publish",
    id: "sample-porsche-911-original",
  }),
});
assert.equal(r.status, 401);
console.log("PASS admin anonymous mutations denied");
r = await fetch(origin + "/api/newsletter", {
  method: "POST",
  headers: { Origin: origin, "Content-Type": "application/json" },
  body: JSON.stringify({ email: "test@example.com", consent: true }),
});
assert.equal(r.status, 503);
assert.match((await r.json()).message, /coming soon/);
console.log("PASS missing email provider is not a false signup");
r = await fetch(origin + "/api/newsletter", {
  method: "POST",
  headers: {
    Origin: "https://untrusted.example",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ email: "test@example.com", consent: true }),
});
assert.equal(r.status, 403);
console.log("PASS cross-origin newsletter mutation denied");
r = await fetch(origin + "/api/cron", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ key: "edition-2026-42" }),
});
assert.equal(r.status, 401);
console.log("PASS scheduler authorization required");
const feed = await (await fetch(origin + "/feed.xml")).text();
assert.ok(!feed.includes("<item>"));
console.log("PASS sample editions excluded from RSS");
const robots = await (await fetch(origin + "/robots.txt")).text();
assert.match(robots, /Disallow: \//);
console.log("PASS preview blocks indexing");
const workshop = await (await fetch(origin + "/workshop")).text();
for (const slug of [
  "porsche-911-original",
  "honda-nsx-na1",
  "jaguar-e-type-series-1",
  "lancia-stratos-hf",
])
  assert.ok(workshop.includes(`/cars/${slug}/workshop`));
console.log("PASS workshop hub links all four vehicle workshops");
const newsletter = await (await fetch(origin + "/newsletter")).text();
assert.ok(newsletter.includes("Subscriptions are not open yet."));
assert.ok(!newsletter.includes('type="email"'));
console.log("PASS unavailable newsletter collects no email");
const correction = await (
  await fetch(origin + "/corrections?page=%2Fcars%2Fporsche-911-original")
).text();
assert.ok(correction.includes('value="/cars/porsche-911-original"'));
assert.ok(correction.includes('href="/cars/porsche-911-original"'));
assert.ok(correction.includes("This preview does not send reports."));
console.log("PASS correction draft keeps source and honest delivery status");

const porscheWorkshop = await (
  await fetch(origin + "/cars/porsche-911-original/workshop")
).text();
const worksheetSection =
  porscheWorkshop.split('id="worksheet"')[1]?.split("</section>")[0] || "";
assert.ok(
  worksheetSection.includes("https://www.scribd.com/embeds/469896521/content"),
);
assert.ok(worksheetSection.includes("OPEN SERVICE MANUAL"));
assert.ok(worksheetSection.includes("1972 onward"));
assert.ok(worksheetSection.includes("DOWNLOAD WORKSHEET"));
assert.ok(!porscheWorkshop.includes("REFERENCE LINK"));
console.log(
  "PASS Porsche manual reader and access link are beside the worksheet",
);
