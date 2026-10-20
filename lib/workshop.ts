export type WorkshopResource = {
  id: string;
  title: string;
  publisher: string;
  kind:
    | "Service manual"
    | "Owner handbook"
    | "Maintenance chart"
    | "Parts catalogue"
    | "Provider enquiry";
  coverage: string;
  access: string;
  reference: string;
  url: string;
  note: string;
  checked: string;
  embedUrl?: string;
};
export type OwnerTask = {
  id: string;
  title: string;
  scope: string;
  tools: string;
  steps: string[];
  finish: string;
  sourceId: string;
  pages: string;
};
export type WorkshopFile = {
  intro: string;
  matching: string[];
  resources: WorkshopResource[];
  tasks: OwnerTask[];
  routing: { task: string; sourceId: string; section: string; note: string }[];
};
const checked = "20 October 2026";
const honda = "https://techinfo.honda.com/rjanisis/pubs/om/NS9191/";
export const workshopFiles: Record<string, WorkshopFile> = {
  "porsche-911-original": {
    intro:
      "The original 911 spans several technical revisions. Start with the correct workshop volumes, then match the car’s year and installed components.",
    matching: [
      "Confirm the model year and chassis identity; registration year alone is not sufficient.",
      "Record the installed engine and transmission identifiers and any conversions.",
      "The printed workshop set covers 1965-1971. The online reader starts with 1972-onward USA/Canada literature and includes later supplements. Match the exact year and operation; ask Porsche about other coverage.",
    ],
    resources: [
      {
        id: "911-scribd-manual",
        title: "Porsche 911 workshop manual · online reader",
        publisher: "Porsche publication · external document reader",
        kind: "Service manual",
        coverage: "1972 onward · USA / Canada · includes later supplements",
        access: "Online preview · access and downloads depend on provider",
        reference:
          "Workshop manual 911, from model 1972 on · community-uploaded copy",
        url: "https://www.scribd.com/document/469896521/Porsche-911-Workshop-Manual-pdf",
        embedUrl: "https://www.scribd.com/embeds/469896521/content",
        note: "Covers 1972-onward USA/Canada models and includes later supplements. Confirm the year and operation for your car. Preview, sign-in and downloads are managed by the document provider.",
        checked,
      },
      {
        id: "911-manual",
        title: "911 F-model workshop manual · Volumes 1 & 2",
        publisher: "Porsche",
        kind: "Service manual",
        coverage: "1965-1971 F-model · English edition",
        access: "Printed reprint · purchase from provider",
        reference: "WKD480520",
        url: "https://shop.porsche.com/gb/en-GB/p/porsche-911-workshop-manual-WKD480510-B/WKD480520",
        note: "Specific workshop set listed by Porsche. Confirm chassis compatibility and required supplements before ordering. Contents are not reproduced here.",
        checked,
      },
      {
        id: "911-parts",
        title: "Classic genuine parts catalogues",
        publisher: "Porsche",
        kind: "Parts catalogue",
        coverage: "911/912 1965-1969; 911 1970-1973",
        access: "Public catalogue selection on Porsche’s website",
        reference: "Select the matching model-year catalogue",
        url: "https://www.porsche.com/international/accessoriesandservice/classic/originalpartscatalogue/",
        note: "Useful for identifying assemblies and part numbers. Exploded parts illustrations do not supply repair methods or tightening instructions.",
        checked,
      },
      {
        id: "911-handbook",
        title: "Original driver’s manual reprints",
        publisher: "Porsche Classic",
        kind: "Owner handbook",
        coverage: "Year-specific editions · ask the provider to match your car",
        access: "Dealer enquiry · historical reprint programme",
        reference: "Porsche Classic literature programme, announced 2019",
        url: "https://newsroom.porsche.com/en/2019/history/porsche-classic-reprint-original-drivers-manuals-17526.html",
        note: "The manufacturer describes the reprint programme; this is a historical announcement, not confirmation of current stock for your year.",
        checked,
      },
    ],
    tasks: [],
    routing: [
      {
        task: "Oil level, lubricants & routine checks",
        sourceId: "911-handbook",
        section: "Year-specific driver’s manual",
        note: "Obtain the correct handbook before applying checking conditions, lubricant specifications or quantities.",
      },
      {
        task: "Engine, clutch & transmission service",
        sourceId: "911-manual",
        section: "Workshop volumes and applicable supplements",
        note: "Match the engine and gearbox fitted to the car; the model badge is not enough.",
      },
      {
        task: "Parts identification",
        sourceId: "911-parts",
        section: "1965-1969 or 1970-1973 catalogue",
        note: "Select the correct catalogue, then confirm superseded part numbers with Porsche.",
      },
    ],
  },
  "honda-nsx-na1": {
    intro:
      "Direct links to the original 1991 Acura NSX owner literature, plus the manufacturer’s service-information portal. The owner checks below apply only to the 1991 US/Canada car covered by that handbook.",
    matching: [
      "Select the actual model year, market and Honda/Acura identity. These PDFs are for the 1991 Acura NSX, not every 1990-2005 NSX.",
      "Record the fitted engine, transmission and wheel/tyre configuration. Modified cars require their own applicable specifications.",
      "An owner handbook supports routine checks; obtain the relevant factory service manual for repair work.",
    ],
    resources: [
      {
        id: "nsx-owner",
        title: "1991 NSX owner’s manual · original index",
        publisher: "American Honda / Acura",
        kind: "Owner handbook",
        coverage: "1991 Acura NSX · US / Canada · English",
        access: "Free manufacturer PDF index",
        reference: "NS9191 · use the chapter links",
        url: honda + "NS9191MAINIDX.pdf",
        note: "The original manual is split into separate PDFs. Direct maintenance links below avoid depending on an older PDF viewer’s cross-file navigation.",
        checked,
      },
      {
        id: "nsx-schedule",
        title: "Maintenance schedule",
        publisher: "American Honda / Acura",
        kind: "Maintenance chart",
        coverage: "1991 Acura NSX · US / Canada",
        access: "Free manufacturer PDF section",
        reference: "Printed pages 120-122",
        url: honda + "NS9191O00120A.pdf",
        note: "Includes normal/severe-use distinctions and market notes. Use the original chart; do not apply its intervals automatically to later cars.",
        checked,
      },
      {
        id: "nsx-oil",
        title: "Engine oil · checking, adding & changing",
        publisher: "American Honda / Acura",
        kind: "Owner handbook",
        coverage: "1991 Acura NSX · US / Canada",
        access: "Free manufacturer PDF section",
        reference: "Printed pages 127-129",
        url: honda + "NS9191O00127A.pdf",
        note: "Oil-level check summary below uses page 127. Historical lubricant grades require current applicability confirmation before purchasing oil.",
        checked,
      },
      {
        id: "nsx-tyres",
        title: "Tyres · inflation, inspection & replacement",
        publisher: "American Honda / Acura",
        kind: "Owner handbook",
        coverage: "1991 Acura NSX · US / Canada",
        access: "Free manufacturer PDF section",
        reference: "Printed pages 153-157",
        url: honda + "NS9191O00153A.pdf",
        note: "Contains the original tyre guidance. Confirm the car’s label and fitted wheel/tyre configuration before using pressure figures.",
        checked,
      },
      {
        id: "nsx-service",
        title: "Factory service information access",
        publisher: "American Honda",
        kind: "Provider enquiry",
        coverage: "Select Acura, NSX and the exact model year",
        access: "Provider portal · registration/subscription may apply",
        reference: "Coverage must be confirmed at the provider",
        url: "https://techinfo.honda.com/",
        note: "This is an access route, not an attached or fully inspected service manual. If your year is unavailable, ask an Acura dealer for the correct publication.",
        checked,
      },
    ],
    tasks: [
      {
        id: "oil-level",
        title: "Check the engine oil level",
        scope: "1991 Acura NSX · US / Canada · owner-level check",
        tools: "Clean lint-free cloth or paper towel; matching owner handbook.",
        steps: [
          "Park on level ground. Shut the engine off and wait a couple of minutes, as specified by the handbook. Keep clear of hot and moving components.",
          "Withdraw the dipstick and wipe it clean.",
          "Insert the dipstick fully, then withdraw it again.",
          "Read the level against the lower and upper marks. A reading between them is the handbook’s acceptable range.",
        ],
        finish:
          "If outside the range, consult the adding-oil section and confirm the applicable lubricant before topping up. This checklist does not cover an oil change.",
        sourceId: "nsx-oil",
        pages: "Printed page 127 · PDF page 1",
      },
      {
        id: "tyre-check",
        title: "Check tyre pressures & visible condition",
        scope: "1991 Acura NSX · US / Canada · original configuration",
        tools:
          "Reliable tyre-pressure gauge; tyre-information label; matching handbook.",
        steps: [
          "Check with the tyres cold: the handbook defines this as at least three hours parked, or less than one mile driven.",
          "Read the vehicle’s tyre-information label at the driver’s door jamb. Confirm the fitted wheels and tyres match its applicability.",
          "Measure each tyre with the same gauge. Compare against the applicable cold specification. Do not bleed a hot tyre down to a cold-pressure figure.",
          "Inspect tread and sidewalls for bulges, cuts, cracks, exposed cord and excessive wear.",
        ],
        finish:
          "Have damage or unexplained pressure loss assessed before driving. The original handbook’s figures are not a universal specification for modified wheels or other NSX years.",
        sourceId: "nsx-tyres",
        pages: "Printed pages 153-154 · PDF pages 1-2",
      },
    ],
    routing: [
      {
        task: "Plan scheduled maintenance",
        sourceId: "nsx-schedule",
        section: "Pages 120-122",
        note: "Read the normal/severe-use criteria and market footnotes before copying an interval.",
      },
      {
        task: "Check oil level",
        sourceId: "nsx-oil",
        section: "Page 127",
        note: "Use the owner-level checklist below, alongside the original page.",
      },
      {
        task: "Check tyres",
        sourceId: "nsx-tyres",
        section: "Pages 153-154",
        note: "Use the vehicle label and source instructions for your configuration.",
      },
      {
        task: "Repairs, timing-belt work & diagnostics",
        sourceId: "nsx-service",
        section: "Factory service information",
        note: "Obtain the exact service publication; owner literature does not replace workshop procedures.",
      },
    ],
  },
  "jaguar-e-type-series-1": {
    intro:
      "A factory-manual compilation and two engine-specific maintenance charts. Choose 3.8 or 4.2 litres before planning the work; a Series 1 label alone does not identify the right schedule.",
    matching: [
      "Confirm whether the installed engine is 3.8 or 4.2 litres.",
      "Record the production identity, body style, gearbox and market; note replacement assemblies.",
      "The listed compilation includes Series 1 and Series 2 material. Use only the sections and supplements applicable to your car.",
    ],
    resources: [
      {
        id: "etype-manual",
        title: "The Complete Official Jaguar E-Type · Series 1 & 2",
        publisher: "Jaguar Cars Ltd. / Bentley Publishers",
        kind: "Service manual",
        coverage: "1961-1971 · 3.8 & 4.2-litre six-cylinder E-type",
        access: "Printed factory-manual compilation · purchase",
        reference: "X136 · ISBN 978-0-8376-1764-0",
        url: "https://bentleypubs.com/product/x136/",
        note: "Publisher lists a driver’s handbook, workshop manual and tuning manual in one volume. Not a V12 manual. Confirm variant coverage with the publisher.",
        checked,
      },
      {
        id: "etype-38",
        title: "Series 1 · 3.8-litre maintenance chart",
        publisher: "Jaguar Daimler Heritage Trust",
        kind: "Maintenance chart",
        coverage: "E-type Series 1 · 3.8 litres",
        access: "Printed chart · purchase",
        reference: "E122/6",
        url: "https://shop.jaguarheritage.com/products/e-type-series-1-3-8-litre-maintenance-chart-e122-6",
        note: "A specific maintenance publication, not the complete repair manual. The chart’s instructions and intervals have not been reproduced or technically reviewed here.",
        checked,
      },
      {
        id: "etype-42",
        title: "Series 1 · 4.2-litre maintenance chart",
        publisher: "Jaguar Daimler Heritage Trust",
        kind: "Maintenance chart",
        coverage: "E-type Series 1 · 4.2 litres",
        access: "Printed chart · purchase",
        reference: "E131/6",
        url: "https://shop.jaguarheritage.com/products/e-type-series-1-4-2-litre-maintenance-chart-e131-6",
        note: "Choose this chart only for the applicable 4.2-litre car. A chart complements the workshop manual rather than replacing it.",
        checked,
      },
    ],
    tasks: [],
    routing: [
      {
        task: "Build the routine maintenance schedule",
        sourceId: "etype-38",
        section: "E122/6 for 3.8 litres",
        note: "For a 4.2-litre car use E131/6 instead. Transcribe intervals only after reading the applicable chart.",
      },
      {
        task: "Service & repair procedures",
        sourceId: "etype-manual",
        section: "Applicable 3.8 / 4.2 workshop section",
        note: "Read the complete operation, tools, specifications and supplements before starting.",
      },
      {
        task: "4.2-litre lubrication & care schedule",
        sourceId: "etype-42",
        section: "E131/6 for 4.2 litres",
        note: "Use the engine-specific chart and cross-reference the workshop instructions for each operation.",
      },
    ],
  },
  "lancia-stratos-hf": {
    intro:
      "The Stratos needs chassis-specific documentation. No applicable factory service manual has been located and inspected for this library; the route below is a heritage enquiry, not a manual download.",
    matching: [
      "Establish the chassis identity and whether the car is a road Stratos, competition car or replica.",
      "Record the installed engine, gearbox and later changes. Do not use competition specifications for a road car by assumption.",
      "Request the correct handbook, workshop instructions and supplements from the heritage team or a documented marque specialist.",
    ],
    resources: [
      {
        id: "stratos-enquiry",
        title: "Lancia heritage services · documentation enquiry",
        publisher: "Stellantis Heritage",
        kind: "Provider enquiry",
        coverage: "Historic Lancia · Stratos coverage must be confirmed",
        access: "Enquiry / specialist referral",
        reference: "No service-manual publication verified",
        url: "https://www.stellantisheritage.com/en-uk/classic-services",
        note: "Official heritage-services starting point. Ask specifically about Stratos technical literature using the car’s identity. The service page does not establish that a manual is available.",
        checked,
      },
    ],
    tasks: [],
    routing: [
      {
        task: "Obtain applicable service literature",
        sourceId: "stratos-enquiry",
        section: "Heritage-services enquiry",
        note: "Send the model, chassis identity, engine and gearbox details directly to the provider; ask for publication number, revision and road/competition coverage.",
      },
      {
        task: "Plan maintenance or restoration",
        sourceId: "stratos-enquiry",
        section: "Specialist documentation review",
        note: "Obtain the relevant instructions before setting intervals, fluid quantities or adjustment values. No unsupported Stratos repair steps are published here.",
      },
    ],
  },
};
