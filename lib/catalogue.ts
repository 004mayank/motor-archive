import type { Car } from "./sample";
export type CatalogueSource = {
  id: string;
  title: string;
  publisher: string;
  url: string;
  kind: string;
};
export type CatalogueEdition = {
  headline: string;
  standfirst: string;
  image: string;
  imageCaption: string;
  imagePosition: string;
  kicker: string;
  accent: string;
  posterLines: string[];
  quote: string;
  imageLabel: string;
  photoIds: string[];
  secondaryImage: string;
  secondaryCaption: string;
  timeline: { year: string; title: string; detail: string; sourceId: string }[];
  sections: { heading: string; body: string; sourceId?: string }[];
  sources: CatalogueSource[];
};
export const catalogueEditions: Record<string, CatalogueEdition> = {
  "porsche-911-original": {
    headline: "An idea. Without end.",
    standfirst:
      "Before the mythology, there was a small rear-engined sports car and a very particular way of seeing the road. This is where the 911 story begins.",
    image: "/images/porsche-1968-nurburgring.jpg",
    imageCaption:
      "Jean-Claude Killy, Porsche 911 · Nürburgring private practice, spring 1968 · Lothar Spurzem · CC BY-SA 2.0 DE",
    imagePosition: "50% 55%",
    kicker: "GERMANY / THE ORIGINAL GENERATION",
    accent: "#e95231",
    posterLines: ["AN IDEA.", "WITHOUT END."],
    quote: "The shape stayed familiar. The thinking never stood still.",
    imageLabel: "ORIGINAL PHOTOGRAPH / SPRING 1968",
    photoIds: [
      "porsche-1968-nurburgring",
      "porsche-1",
      "porsche-0",
      "porsche-3",
    ],
    secondaryImage: "/images/porsche-1.jpg",
    secondaryCaption:
      "Original-generation 911 · contemporary reference photograph by Calreyn88 · CC BY 4.0",
    timeline: [
      {
        year: "1963",
        title: "The 901 appears.",
        detail: "Porsche presents its successor to the 356 in Frankfurt.",
        sourceId: "porsche-generation",
      },
      {
        year: "1964",
        title: "Three familiar digits.",
        detail: "Series production begins; the model is renamed 911.",
        sourceId: "porsche-generation",
      },
      {
        year: "1969",
        title: "A longer stride.",
        detail: "The wheelbase grows by 57 mm for the new model year.",
        sourceId: "porsche-history",
      },
    ],
    sources: [
      {
        id: "porsche-generation",
        title: "First generation Porsche 911, 1963-1973",
        publisher: "Porsche Newsroom",
        url: "https://newsroom.porsche.com/en/press-kits/60-Years-Porsche-911/1.-Generation-Porsche-911-(Ur-Elfer),-1963-1973.html",
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
        id: "porsche-history",
        title: "The original 911: the masterpiece from Zuffenhausen",
        publisher: "Porsche Newsroom",
        url: "https://newsroom.porsche.com/en/history/porsche-911-seven-generations-part-1-original-911-16452.html",
        kind: "Manufacturer archive",
      },
    ],
    sections: [
      {
        heading: "Before it was an icon.",
        body: "At the 1963 Frankfurt motor show, Porsche introduced the 901 as the successor to the 356. Series production followed in 1964, along with the name that became familiar: 911. A six-cylinder engine sat at the rear; the proportions made room for a small sports car that could also serve everyday life.\n\nThat origin is more interesting than inevitability. The original car was a proposal, with room for development still ahead of it.",
        sourceId: "porsche-generation",
      },
      {
        heading: "A line worth keeping.",
        body: "Ferdinand Alexander Porsche’s work on the successor to the 356 helped establish the new car’s shape. The development story involved studies and decisions, rather than a silhouette arriving fully formed.\n\nIn the reference photograph, follow the roof into the rear bodywork. The upright lamps, compact cabin and sloping tail make a legible whole. That is a visual reading of the car, not an invented account of the designer’s thoughts.",
        sourceId: "porsche-origin",
      },
      {
        heading: "The engine behind the idea.",
        body: "Porsche records the first air-cooled six-cylinder version at 130 PS and 210 km/h. Those are figures for the original version, not a specification for every first-generation 911. The family soon developed through additional versions, including the 911 S and the open-roof Targa.\n\nThe distinction matters: a familiar badge can cover different years, engines and bodies. The workshop keeps model applicability separate from the romance of the story.",
        sourceId: "porsche-generation",
      },
      {
        heading: "Evolution, measured in millimetres.",
        body: "For the 1969 model year, the wheelbase grew by 57 millimetres to 2,268 millimetres, according to Porsche’s historical account. The silhouette remained recognizable while the engineering continued to move.\n\nThe period cover photograph adds another perspective: Jean-Claude Killy in a 911 during private practice at the Nürburgring in spring 1968. Lothar Spurzem’s source record identifies the person, car, place and moment.",
        sourceId: "porsche-history",
      },
      {
        heading: "More than a familiar outline.",
        body: "A modern reference photograph lets us inspect the body. A period frame restores the surroundings: the circuit, the driver, the blur of movement. Together they keep the car from becoming only a set of numbers.\n\nThe original 911 rewards that change of viewpoint. Look at it as an object, then as a machine in use. Its lasting appeal sits somewhere between those two ways of seeing.",
      },
    ],
  },
  "honda-nsx-na1": {
    headline: "Precision. With a pulse.",
    standfirst:
      "An aluminum body. A mid-mounted V6. A development programme that took the driver seriously. Honda approached the supercar as an engineering question, and made the answer feel human.",
    image: "/images/nsx-1994-lemans.jpg",
    imageCaption:
      "Honda NSX GT2 competition car, no. 46 · Le Mans, 1994 · Martin Lee · CC BY-SA 2.0 · race variant shown",
    imagePosition: "50% 82%",
    kicker: "JAPAN / FIRST-GENERATION NSX",
    accent: "#d94b35",
    posterLines: ["PRECISION.", "WITH A PULSE."],
    quote: "The ambition was performance you could actually live with.",
    imageLabel: "ORIGINAL PHOTOGRAPH / LE MANS 1994",
    photoIds: ["nsx-1994-lemans", "nsx-1", "nsx-0"],
    secondaryImage: "/images/nsx-1.jpg",
    secondaryCaption:
      "1996 Honda NSX road car · contemporary reference photograph by Calreyn88 · CC BY-SA 4.0",
    timeline: [
      {
        year: "1989",
        title: "A public beginning.",
        detail: "The NS-X prototype appears at the Chicago Auto Show.",
        sourceId: "nsx-development",
      },
      {
        year: "1990",
        title: "The idea reaches the road.",
        detail: "The NSX goes on sale in Japan in September.",
        sourceId: "nsx-development",
      },
      {
        year: "1995",
        title: "A class of its own.",
        detail: "An NSX takes the LM GT2 class victory at Le Mans.",
        sourceId: "nsx-lemans",
      },
    ],
    sources: [
      {
        id: "nsx-senna",
        title: "Suzuka 1989: Senna and the NS-X prototype",
        publisher: "Honda Global",
        url: "https://global.honda/en/senna/gallery/suzuka_1989/",
        kind: "Manufacturer photographic archive",
      },
      {
        id: "nsx-development",
        title: "The NSX / 1990",
        publisher: "Honda Global Heritage",
        url: "https://global.honda/en/heritage/episodes/1990thensx.html",
        kind: "Manufacturer development history",
      },
      {
        id: "nsx-vtec",
        title: "The VTEC Engine / 1989",
        publisher: "Honda Global Heritage",
        url: "https://global.honda/en/heritage/episodes/1989vtecengine.html",
        kind: "Manufacturer engineering history",
      },
      {
        id: "nsx-lemans",
        title: "Historical statistics: class winners since 1995",
        publisher: "Automobile Club de l’Ouest",
        url: "https://assets.lemans.org/explorer/pdf/courses/2018/24-heures-du-mans/press-kit/uk/statistiques-historiques-en.pdf",
        kind: "Race organizer historical record",
      },
    ],
    sections: [
      {
        heading: "A different kind of supercar.",
        body: "Honda showed the NS-X prototype in Chicago in February 1989. Sales of the production NSX began in Japan in September 1990. The company’s development history describes a car intended to combine performance with comfort and everyday equipment.\n\nThe brief did not treat the driver as an inconvenience. That shift in emphasis is a useful place to start: the NSX was meant to work as a complete car, not simply to post a set of numbers.",
        sourceId: "nsx-development",
      },
      {
        heading: "Lightness was the system.",
        body: "The engineering team chose an aluminum monocoque and developed a dedicated production process for it. Honda’s account follows the material choices, forming and welding challenges, and the creation of the Tochigi production facility.\n\nIn the road-car photograph, the low body and generous glass make a different sort of statement. The cabin is visually part of the car’s purpose. That observation belongs to the image; it does not need an invented styling quotation.",
        sourceId: "nsx-development",
      },
      {
        heading: "The driver in the loop.",
        body: "Honda’s photographic record places Ayrton Senna with the NS-X prototype at Suzuka in 1989. It gives a specific setting to the familiar connection between the driver and the car.\n\nLook past the mythology to the development scene: a prototype, a circuit and people working together. A photograph records a moment in that process; it cannot assign an entire car to one person.",
        sourceId: "nsx-senna",
      },
      {
        heading: "A V6 with a wider vocabulary.",
        body: "Honda’s VTEC history identifies the NSX’s 3.0-litre DOHC V6 as an application of its variable-valve-timing and lift technology. It places the engine within a broader engineering programme, rather than treating the NSX as an isolated experiment.\n\nThe road and competition versions still need separate records. A race photograph cannot establish the output, gearing or maintenance requirements of the car parked in an owner’s garage.",
        sourceId: "nsx-vtec",
      },
      {
        heading: "From the road to La Sarthe.",
        body: "The period cover photograph shows the no. 46 NSX competing at Le Mans in 1994. Its source caption names Philippe Favre, Hideki Okada and Kazuo Shimizu. The organizer’s historical statistics separately record an NSX LM GT2 class win in 1995 with Takahashi, Iida and Tsuchiya.\n\nThese are different entries and different years. The cover car is not presented as the 1995 class winner. Keeping that distinction intact makes the racing story more useful, and more interesting.",
        sourceId: "nsx-lemans",
      },
    ],
  },
  "jaguar-e-type-series-1": {
    headline: "Beauty. At speed.",
    standfirst:
      "The long bonnet is only the beginning. Follow the Series 1 E-type from its Geneva arrival to the competition cars that put that unmistakable shape to work.",
    image: "/images/jaguar-1963-nurburgring.jpg",
    imageCaption:
      "Peter Lindner / Peter Nöcker, Jaguar E-type competition car · Nürburgring 1000 km, 19 May 1963 · Lothar Spurzem · CC BY-SA 2.0 DE",
    imagePosition: "50% 52%",
    kicker: "GREAT BRITAIN / E-TYPE SERIES 1",
    accent: "#a5bb45",
    posterLines: ["BEAUTY.", "AT SPEED."],
    quote: "Look beyond the long bonnet. Follow the whole line.",
    imageLabel: "ORIGINAL PHOTOGRAPH / 19 MAY 1963",
    photoIds: ["jaguar-1963-nurburgring", "jaguar-1", "jaguar-0"],
    secondaryImage: "/images/jaguar-1.jpg",
    secondaryCaption:
      "1961 E-type fixed-head coupé · contemporary reference photograph by Calreyn88 · CC BY 4.0",
    timeline: [
      {
        year: "1961",
        title: "Geneva, at last.",
        detail: "The E-type makes its public debut at the Geneva Motor Show.",
        sourceId: "etype-geneva",
      },
      {
        year: "1963",
        title: "The shape goes racing.",
        detail:
          "Spurzem photographs Lindner and Nöcker’s E-type at the Nürburgring.",
        sourceId: "etype-period-photo",
      },
      {
        year: "1964",
        title: "A larger straight-six.",
        detail: "The 4.2-litre engine replaces the 3.8-litre version.",
        sourceId: "etype-heritage",
      },
    ],
    sources: [
      {
        id: "etype-heritage",
        title: "1961 Jaguar E-type Series 1 3.8 litre, 77 RW",
        publisher: "Jaguar Daimler Heritage Trust",
        url: "https://www.jaguarheritage.com/vehicle-collection/1961-jaguar-e-type-series-1-3-8-litre-77-rw/",
        kind: "Manufacturer heritage trust",
      },
      {
        id: "etype-geneva",
        title: "E-type 60 Collection",
        publisher: "Jaguar Classic",
        url: "https://www.jaguar.com/en-xi/jdx/about-jaguar/jaguar-classic/e-type-60-collection.html",
        kind: "Manufacturer retrospective",
      },
      {
        id: "etype-lightweight",
        title: "Lightweight E-type restored: the missing six",
        publisher: "Jaguar Classic",
        url: "https://www.jaguar.com/en-us/jdx/about-jaguar/heritage/lightweight-e-type-restored.html",
        kind: "Manufacturer competition-car retrospective",
      },
      {
        id: "etype-period-photo",
        title: "Jaguar E-type of Lindner and Nöcker, 19 May 1963",
        publisher: "Lothar Spurzem / Wikimedia Commons",
        url: "https://commons.wikimedia.org/wiki/File:1963-05-19_Jaguar_von_Lindner_und_N%C3%B6cker.jpg",
        kind: "Dated photographic record",
      },
    ],
    sections: [
      {
        heading: "A very particular arrival.",
        body: "The E-type’s public story begins at Geneva in March 1961. Jaguar’s retrospective recalls the roadster 77 RW joining the fixed-head coupé 9600 HP for the motor-show launch.\n\nThose individual cars make a useful counterpoint to the familiar badge. Before the E-type became an image reproduced everywhere, the launch involved actual machines travelling to an actual place. The details give the debut a scale that a superlative cannot.",
        sourceId: "etype-geneva",
      },
      {
        heading: "Aerodynamics, made visible.",
        body: "The Jaguar Daimler Heritage Trust identifies Malcolm Sayer’s work on the D-type as the basis for the E-type’s styling. That connection places the road car’s appearance within an existing engineering and design tradition.\n\nLook at the coupé from behind: rear glass, roof and tail draw the eye along the body. The long bonnet dominates the familiar front view, but the composition is more than one dramatic proportion.",
        sourceId: "etype-heritage",
      },
      {
        heading: "The Series 1 is not one specification.",
        body: "The early car used a 3.8-litre engine. The Heritage Trust records the change to 4.2 litres in 1964, accompanied by revisions including a different gearbox. A generation name alone therefore does not establish a complete technical specification.\n\nThat matters to the workshop as much as the historian. A document must identify the applicable year, engine, body and market before its figures or procedures can be treated as relevant.",
        sourceId: "etype-heritage",
      },
      {
        heading: "The beauty had a working life.",
        body: "The cover photograph is not a modern historic-racing recreation. Lothar Spurzem dated it to the Nürburgring 1000 km on 19 May 1963 and identified the E-type with Peter Lindner and Peter Nöcker.\n\nThe foreground trees and the blur around the car restore a sense of distance and movement. This is a competition E-type, not evidence that every road-going Series 1 shared its specification.",
        sourceId: "etype-period-photo",
      },
      {
        heading: "A legacy worth separating.",
        body: "Jaguar’s later Lightweight continuation project returned to the construction and appearance of the 1960s competition cars. It is part of the E-type’s afterlife, rather than an extension of the original production chronology.\n\nThe original period frame and the modern road-car references belong together because they show different lives of the same design family. Their dates, bodies and purposes stay visible instead of collapsing into a single generic E-type.",
        sourceId: "etype-lightweight",
      },
    ],
  },
  "lancia-stratos-hf": {
    headline: "Made for the sideways.",
    standfirst:
      "A wedge with a purpose. The Stratos brought a concentrated design idea to the rally stages, and made its shape part of the sport’s visual language.",
    image: "/images/stratos-1975-rally.jpg",
    imageCaption:
      "Lancia Stratos competition car · Castrol International Rally, Australian Capital Territory, 1975 · John Lloyd · CC BY 2.0",
    imagePosition: "50% 60%",
    kicker: "ITALY / STRATOS HF",
    accent: "#e9b849",
    posterLines: ["MADE FOR", "THE SIDEWAYS."],
    quote: "The road car tells one story. The stage gives it another.",
    imageLabel: "ORIGINAL PHOTOGRAPH / AUSTRALIA 1975",
    photoIds: ["stratos-1975-rally", "stratos-0", "stratos-1"],
    secondaryImage: "/images/stratos-0.jpg",
    secondaryCaption:
      "Stratos road-car reference · contemporary photograph by Alexander Migl · CC BY-SA 4.0",
    timeline: [
      {
        year: "1970",
        title: "The wedge makes its case.",
        detail:
          "Bertone’s Stratos concept introduces a radical design direction.",
        sourceId: "stratos-heritage",
      },
      {
        year: "1974",
        title: "A world title.",
        detail:
          "The Stratos helps Lancia take the manufacturers’ rally championship.",
        sourceId: "stratos-heritage",
      },
      {
        year: "1976",
        title: "Three in succession.",
        detail: "Lancia adds the 1976 title after its 1974 and 1975 successes.",
        sourceId: "stratos-heritage",
      },
    ],
    sources: [
      {
        id: "stratos-heritage",
        title: "Lancia Stratos HF Gr. 4",
        publisher: "Stellantis Heritage",
        url: "https://www.stellantisheritage.com/it-it/heritage/storie/lancia-stratos",
        kind: "Manufacturer heritage history",
      },
      {
        id: "stratos-engineering",
        title: "Lancia Stratos Gr.4 Alitalia at the FIA Hall of Fame",
        publisher: "Stellantis Heritage Hub",
        url: "https://www.media.stellantis.com/it-it/heritage-hub-italy/press/lancia-stratos-gr-4-alitalia-protagonista-della-fia-hall-of-fame",
        kind: "Manufacturer technical retrospective",
      },
      {
        id: "stratos-period-photo",
        title: "Lancia Stratos, Castrol International Rally, ACT, 1975",
        publisher: "John Lloyd / Wikimedia Commons",
        url: "https://commons.wikimedia.org/wiki/File:Lancia_Stratos_ACT.jpg",
        kind: "Captioned period photograph",
      },
    ],
    sections: [
      {
        heading: "A wedge with intent.",
        body: "Stellantis Heritage traces the Stratos to Bertone’s radical concept and Marcello Gandini’s design work. The development story connects that visual departure with Cesare Fiorio’s search for a new rally car.\n\nSeen in the road-car reference, the compact body is immediately legible: a tightly wrapped cabin, a short nose and a broad tail. Seen in the period rally photograph, those same proportions are surrounded by dust and spectators.",
        sourceId: "stratos-heritage",
      },
      {
        heading: "Engineering, gathered close.",
        body: "Stellantis describes the Group 4 Stratos as a two-seat coupé with a Ferrari-derived 2.4-litre six-cylinder engine behind the crew. It credits Gandini’s wedge-shaped bodywork to Bertone.\n\nThat account concerns the competition car described by the source. It is not a license to merge road-car and race-car power figures, nor to infer service settings from the shared model name. The layout explains a concept; variant records establish the detail.",
        sourceId: "stratos-engineering",
      },
      {
        heading: "The stages become the story.",
        body: "The manufacturer’s heritage history records Lancia’s 1974 world rally manufacturers’ championship and the further titles of 1975 and 1976. Those results place the Stratos within a sustained competition programme, rather than a single celebrated photograph.\n\nThe appeal of the period image is different. It puts a specific car back on a particular road, with a crowd at its edge and a surface that refuses to look like a showroom floor.",
        sourceId: "stratos-heritage",
      },
      {
        heading: "Australia, in the dust.",
        body: "John Lloyd’s source caption identifies the cover scene as the Castrol International Rallye in the Australian Capital Territory in 1975. A Stratos turns away from the photographer on an unsealed road.\n\nThe later timestamp in the digital file does not establish a different event date; the caption identifies the historical scene. We preserve the distinction and do not infer a driver, finishing position or chassis number from the photograph alone.",
        sourceId: "stratos-period-photo",
      },
      {
        heading: "Keep the two lives in view.",
        body: "The road-car references allow a slower look at the glass, wheel arches and abrupt tail. The period frame shows what happens when those shapes become part of a moving scene. Neither view replaces the other.\n\nThat is why the photographic archive and vehicle record sit together here. One gives the story its setting; the other keeps generations, variants and sources from becoming indistinct.",
      },
    ],
  },
};
