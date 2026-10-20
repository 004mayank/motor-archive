export type Car = {
  slug: string;
  manufacturer: string;
  model: string;
  generation: string;
  country: string;
  startYear: number;
  endYear: number;
  category: string;
  body: string;
  engine: string;
  drivetrain: string;
  fuel: string;
  motorsport: boolean;
  significance: string;
  number: number;
  headline: string;
  excerpt: string;
  image: string;
  sample: boolean;
  galleryImages?: string[];
  imagePosition?: string;
  sourceList?: {
    id: string;
    title: string;
    url: string;
    publisher: string;
    kind: string;
  }[];
  sections: { heading: string; body: string; sourceId?: string }[];
};
export const porscheSources = [
  {
    id: "porsche-history",
    title: "The original 911: the masterpiece from Zuffenhausen",
    publisher: "Porsche Newsroom",
    url: "https://newsroom.porsche.com/en/history/porsche-911-seven-generations-part-1-original-911-16452.html",
    kind: "Manufacturer archive",
  },
  {
    id: "porsche-origin",
    title: "From the 754 via the 901 to the 911",
    publisher: "Porsche Newsroom",
    url: "https://newsroom.porsche.com/en/history/porsche-911-evolutionary-history-754-901-ferry-porsche-14641.html",
    kind: "Manufacturer archive",
  },
  {
    id: "porsche-generation",
    title: "First generation Porsche 911, 1963-1973",
    publisher: "Porsche Newsroom",
    url: "https://newsroom.porsche.com/en/press-kits/60-Years-Porsche-911/1.-Generation-Porsche-911-(Ur-Elfer),-1963-1973.html",
    kind: "Manufacturer archive",
  },
];
export const sampleCars: Car[] = [
  {
    slug: "porsche-911-original",
    manufacturer: "Porsche",
    model: "911",
    generation: "Original · F-series",
    country: "Germany",
    startYear: 1964,
    endYear: 1973,
    category: "Sports car",
    body: "Coupé",
    engine: "Flat-six",
    drivetrain: "Rear-wheel drive",
    fuel: "Petrol",
    motorsport: true,
    significance: "Design icon",
    number: 1,
    headline: "An idea that never gets old.",
    excerpt:
      "A silhouette that needs no introduction. A philosophy that never stopped evolving. Back to the beginning of the Porsche 911.",
    image: "/images/porsche-0.jpg",
    sample: true,
    sections: [
      {
        heading: "The beginning of something lasting",
        body: "In September 1963, Porsche presented the successor to the 356 at the Frankfurt motor show. The new car was called the 901. Its low roof, rear-mounted six-cylinder engine and compact proportions established the vocabulary that would become the 911.\n\nThe name changed when series production began in 1964. The underlying proposition endured: a sports car that belonged on an open road, but could also fit into everyday life.",
        sourceId: "porsche-generation",
      },
      {
        heading: "A line worth following",
        body: "The shape took form through a development process led by Ferdinand Alexander Porsche. Early studies explored how a successor to the 356 could offer more space while retaining the character of a small sports car.\n\nLook at the original car in profile. The windscreen rises decisively; the roof then falls in one unbroken movement toward the engine cover. The interest is in the relationship between those lines. This is our reading of the design, rather than a claim about the designer’s intent.",
        sourceId: "porsche-origin",
      },
      {
        heading: "The engine behind the idea",
        body: "The early 911 used an air-cooled flat-six positioned behind the rear axle. Porsche lists the first version at 130 PS, with a top speed of 210 km/h. Those figures describe the original version; they do not apply to every later 911.\n\nDevelopment continued within the first generation. A more powerful 911 S arrived, while the Targa explored a different approach to open-air driving. The family was already becoming broader than a single specification.",
        sourceId: "porsche-generation",
      },
      {
        heading: "Evolution, measured in millimetres",
        body: "For the 1969 model year, the wheelbase grew by 57 millimetres to 2,268 millimetres. Porsche’s historical account describes this as one of the significant developments of the original generation.\n\nIt is a useful detail to hold alongside the familiar silhouette. A form can remain recognizable while the engineering underneath it changes. The first decade of the 911 is a study in that continuing negotiation.",
        sourceId: "porsche-history",
      },
      {
        heading: "The road continues",
        body: "The early 911 invites a slower kind of attention: the curve of the glass, the close relationship of cabin and rear bodywork, the way a small car occupies a road.\n\nThis introductory edition is a design preview. A full motorsport history, variant chronology and collector assessment will be added only after claim-level research and editorial review. The linked manufacturer archives offer a starting point for further reading.",
      },
    ],
  },
  {
    slug: "honda-nsx-na1",
    manufacturer: "Honda",
    model: "NSX",
    generation: "NA1 / NA2",
    country: "Japan",
    startYear: 1990,
    endYear: 2005,
    category: "Supercar",
    body: "Coupé",
    engine: "V6",
    drivetrain: "Rear-wheel drive",
    fuel: "Petrol",
    motorsport: true,
    significance: "Engineering milestone",
    number: 2,
    headline: "The art of doing things differently.",
    excerpt:
      "The Japanese sports car that invites a different conversation about the supercar.",
    image: "/images/nsx-1.jpg",
    sample: true,
    sections: [
      {
        heading: "A different perspective",
        body: "This sample edition explores the relationship between precision and emotion in automotive design. The complete historical feature is awaiting source research and editorial review.",
      },
      {
        heading: "Design, without excess",
        body: "A low nose, a glass canopy, a carefully drawn tail. Our visual study starts with the proportions before moving to the engineering. Detailed performance claims will appear after verification.",
      },
    ],
  },
  {
    slug: "jaguar-e-type-series-1",
    manufacturer: "Jaguar",
    model: "E-type",
    generation: "Series 1",
    country: "United Kingdom",
    startYear: 1961,
    endYear: 1968,
    category: "Sports car",
    body: "Coupé",
    engine: "Inline-six",
    drivetrain: "Rear-wheel drive",
    fuel: "Petrol",
    motorsport: true,
    significance: "Design icon",
    number: 3,
    headline: "A very British kind of beautiful.",
    excerpt: "Long bonnet. Low roof. An enduring exercise in proportion.",
    image: "/images/jaguar-1.jpg",
    sample: true,
    sections: [
      {
        heading: "The shape of an era",
        body: "This is a sample editorial layout for the Jaguar E-type Series 1. The finished history, technical specifications and production record require source-backed research.",
      },
      {
        heading: "A study in proportion",
        body: "Follow the bonnet toward the cabin and the rear haunches. This design study looks at what the photograph reveals; it makes no unsupported claim about the car’s performance or production history.",
      },
    ],
  },
  {
    slug: "lancia-stratos-hf",
    manufacturer: "Lancia",
    model: "Stratos HF",
    generation: "Tipo 829",
    country: "Italy",
    startYear: 1973,
    endYear: 1978,
    category: "Rally car",
    body: "Coupé",
    engine: "V6",
    drivetrain: "Rear-wheel drive",
    fuel: "Petrol",
    motorsport: true,
    significance: "Motorsport legend",
    number: 4,
    headline: "A beautiful obsession.",
    excerpt: "A wedge-shaped invitation to take the road less predictable.",
    image: "/images/stratos-0.jpg",
    sample: true,
    sections: [
      {
        heading: "Purpose, made visible",
        body: "This sample story introduces a future feature on the Lancia Stratos. Rally results, development history and variant-specific engineering facts await source verification.",
      },
      {
        heading: "The language of the wedge",
        body: "Short overhangs and a tightly wrapped cabin make an immediately striking composition. The final feature will bring together period sources, racing records and carefully matched photographs.",
      },
    ],
  },
];
export const collections = [
  {
    slug: "analog-icons",
    title: "The analog years.",
    subtitle: "Before the screens. Beyond the numbers.",
    image: "/images/porsche-1.jpg",
    cars: ["porsche-911-original", "honda-nsx-na1", "jaguar-e-type-series-1"],
  },
  {
    slug: "motorsport-legends",
    title: "Born to compete.",
    subtitle: "Machines shaped by the pursuit of a finish line.",
    image: "/images/stratos-0.jpg",
    cars: ["lancia-stratos-hf", "porsche-911-original"],
  },
  {
    slug: "design-that-lasts",
    title: "Form. Function. Forever.",
    subtitle: "A closer look at automotive design that endures.",
    image: "/images/jaguar-0.jpg",
    cars: ["jaguar-e-type-series-1", "porsche-911-original"],
  },
  {
    slug: "japanese-performance",
    title: "A different precision.",
    subtitle: "Japanese performance, considered from every angle.",
    image: "/images/nsx-1.jpg",
    cars: ["honda-nsx-na1"],
  },
];
