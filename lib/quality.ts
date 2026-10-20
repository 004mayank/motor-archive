export type Evidence = {
  claim: string;
  verified: boolean;
  sourceUrl?: string;
  passage?: string;
  critical?: boolean;
  contradictions?: string | null;
};
export type Rights = {
  license: string;
  identityVerified: boolean;
  rightsVerified: boolean;
  sourceUrl?: string;
  creator?: string;
};
export type QualityInput = {
  sample: boolean;
  sections: { heading: string; body: string }[];
  claims: Evidence[];
  images: Rights[];
  headline: string;
  excerpt: string;
};
export type Gate = {
  name: string;
  passed: boolean;
  critical: boolean;
  detail: string;
};
export const allowedLicense = (license: string) =>
  /^(CC BY(?:-SA)? (?:2\.0|2\.5|3\.0|4\.0)|CC0|Public domain)$/.test(license);
export const identityKey = (
  manufacturer: string,
  model: string,
  generation: string,
) =>
  [manufacturer, model, generation]
    .map((s) =>
      s
        .normalize("NFKD")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, " ")
        .trim(),
    )
    .join("|");
export function qualityGates(x: QualityInput): Gate[] {
  const words = x.sections
    .map((s) => s.body)
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return [
    {
      name: "Production evidence",
      passed: !x.sample,
      critical: true,
      detail: x.sample
        ? "Sample content cannot enter the production publishing workflow."
        : "Live edition",
    },
    {
      name: "Source-backed claims",
      passed:
        x.claims.length >= 3 &&
        x.claims.every(
          (c) =>
            c.verified && !!c.sourceUrl && !!c.passage && !c.contradictions,
        ),
      critical: true,
      detail:
        "All recorded claims require verified supporting passages and no unresolved contradiction.",
    },
    {
      name: "Image rights & identity",
      passed:
        x.images.length > 0 &&
        x.images.every(
          (i) =>
            i.identityVerified &&
            i.rightsVerified &&
            allowedLicense(i.license) &&
            !!i.sourceUrl &&
            !!i.creator,
        ),
      critical: true,
      detail:
        "Each image requires an allowed license, attribution and a confirmed model match.",
    },
    {
      name: "Article completeness",
      passed: x.sections.length >= 5 && words >= 600,
      critical: true,
      detail: `${x.sections.length} sections · ${words} words; minimum 5 sections / 600 words.`,
    },
    {
      name: "Editorial metadata",
      passed: x.headline.trim().length > 10 && x.excerpt.trim().length > 30,
      critical: true,
      detail: "A complete title and excerpt are required.",
    },
    {
      name: "Unsupported quotations",
      passed: !x.sections.some((s) => /[“”]/.test(s.body)),
      critical: true,
      detail: "Direct quotes require a separate quotation evidence review.",
    },
  ];
}
export function canPublish(gates: Gate[]) {
  return gates.every((g) => !g.critical || g.passed);
}
export function applies(
  doc: {
    generation: string;
    startYear: number;
    endYear: number;
    market: string;
    variant: string;
  },
  car: { generation: string; year: number; market: string; variant: string },
) {
  return (
    doc.generation === car.generation &&
    car.year >= doc.startYear &&
    car.year <= doc.endYear &&
    doc.market === car.market &&
    doc.variant === car.variant
  );
}
export function normalizePower(value: number, unit: "PS" | "kW" | "hp") {
  if (!Number.isFinite(value) || value < 0) throw Error("Invalid power");
  return unit === "PS"
    ? value * 0.73549875
    : unit === "hp"
      ? value * 0.745699872
      : value;
}

export function scoreCandidates<
  T extends {
    slug: string;
    country: string;
    manufacturer: string;
    startYear: number;
    motorsport: boolean;
    significance: string;
  },
>(candidates: T[], recent: T[], featured: string[]) {
  return candidates
    .filter((c) => !featured.includes(c.slug))
    .map((c) => {
      const country = recent.some((r) => r.country === c.country) ? 0 : 4;
      const maker = recent.some((r) => r.manufacturer === c.manufacturer)
        ? 0
        : 3;
      const era = recent.some(
        (r) => Math.floor(r.startYear / 10) === Math.floor(c.startYear / 10),
      )
        ? 0
        : 3;
      const score =
        country +
        maker +
        era +
        (c.motorsport ? 2 : 0) +
        (c.significance ? 1 : 0);
      return {
        vehicle: c,
        score,
        rationale: `Geographic variety ${country}; manufacturer variety ${maker}; era variety ${era}; motorsport ${c.motorsport ? 2 : 0}; significance ${c.significance ? 1 : 0}. Source and image eligibility must pass later gates.`,
      };
    })
    .sort(
      (a, b) =>
        b.score - a.score || a.vehicle.slug.localeCompare(b.vehicle.slug),
    );
}
