import test from "node:test";
import assert from "node:assert/strict";
import {
  allowedLicense,
  qualityGates,
  canPublish,
  identityKey,
  applies,
  normalizePower,
} from "./lib/quality.ts";
const valid = () => ({
  sample: false,
  headline: "The engineering behind a lasting idea",
  excerpt:
    "A source-backed exploration of a specific vehicle generation and its development.",
  sections: Array.from({ length: 5 }, (_, i) => ({
    heading: "Section " + i,
    body: Array.from({ length: 130 }, (_, j) => "evidence" + j).join(" "),
  })),
  claims: Array.from({ length: 3 }, (_, i) => ({
    claim: "Claim " + i,
    verified: true,
    sourceUrl: "https://manufacturer.test/archive",
    passage: "Supporting contemporary evidence",
    contradictions: null,
  })),
  images: [
    {
      license: "CC BY-SA 4.0",
      identityVerified: true,
      rightsVerified: true,
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Example",
      creator: "Photographer",
    },
  ],
});
test("Complete reviewed edition passes publication gates", () =>
  assert.equal(canPublish(qualityGates(valid())), true));
test("Sample editions cannot become production content", () => {
  const x = valid();
  x.sample = true;
  assert.equal(canPublish(qualityGates(x)), false);
});
test("Unverified claims fail even when all other gates pass", () => {
  const x = valid();
  x.claims[0].verified = false;
  assert.equal(canPublish(qualityGates(x)), false);
});
test("Contradictions are critical publication failures", () => {
  const x = valid();
  x.claims[0].contradictions = "Conflicting production date";
  assert.equal(canPublish(qualityGates(x)), false);
});
test("Missing evidence passages block publication", () => {
  const x = valid();
  x.claims[0].passage = "";
  assert.equal(canPublish(qualityGates(x)), false);
});
test("Matching photo without confirmed rights is rejected", () => {
  const x = valid();
  x.images[0].rightsVerified = false;
  assert.equal(canPublish(qualityGates(x)), false);
});
test("Licensed photo of wrong generation is rejected", () => {
  const x = valid();
  x.images[0].identityVerified = false;
  assert.equal(canPublish(qualityGates(x)), false);
});
test("Attribution metadata is mandatory", () => {
  const x = valid();
  x.images[0].creator = "";
  assert.equal(canPublish(qualityGates(x)), false);
});
test("Restrictive or unknown image licenses are rejected", () => {
  for (const l of [
    "All rights reserved",
    "CC BY-NC 4.0",
    "CC BY-ND 4.0",
    "",
    "CC BY 4.0 plus other terms",
  ])
    assert.equal(allowedLicense(l), false);
});
test("Permitted license allowlist recognizes supported open licenses", () => {
  for (const l of ["CC BY 4.0", "CC BY-SA 3.0", "CC0", "Public domain"])
    assert.equal(allowedLicense(l), true);
});
test("Short or incomplete articles cannot publish", () => {
  const x = valid();
  x.sections = x.sections.slice(0, 1);
  assert.equal(canPublish(qualityGates(x)), false);
});
test("Unreviewed quotation marks fail closed", () => {
  const x = valid();
  x.sections[0].body += " “An unsupported interview”";
  assert.equal(canPublish(qualityGates(x)), false);
});
test("Normalization deduplicates punctuation and casing", () =>
  assert.equal(
    identityKey("PORSCHE", "911", "F-Series"),
    identityKey("Porsche", "911", "f series"),
  ));
test("Distinct generations keep distinct identities", () =>
  assert.notEqual(
    identityKey("Porsche", "911", "964"),
    identityKey("Porsche", "911", "993"),
  ));
test("Model applicability requires year, market and variant match", () => {
  const d = {
    generation: "NA1",
    startYear: 1990,
    endYear: 1996,
    market: "Japan",
    variant: "3.0 manual",
  };
  assert.equal(
    applies(d, {
      generation: "NA1",
      year: 1992,
      market: "Japan",
      variant: "3.0 manual",
    }),
    true,
  );
  for (const c of [
    { generation: "NA2", year: 1992, market: "Japan", variant: "3.0 manual" },
    { generation: "NA1", year: 1997, market: "Japan", variant: "3.0 manual" },
    { generation: "NA1", year: 1992, market: "USA", variant: "3.0 manual" },
    {
      generation: "NA1",
      year: 1992,
      market: "Japan",
      variant: "3.0 automatic",
    },
  ])
    assert.equal(applies(d, c), false);
});
test("Power normalization distinguishes PS from horsepower", () => {
  assert.ok(Math.abs(normalizePower(130, "PS") - 95.6148375) < 0.00001);
  assert.notEqual(normalizePower(130, "PS"), normalizePower(130, "hp"));
  assert.throws(() => normalizePower(-1, "PS"));
});
