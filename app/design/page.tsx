import { getCars } from "@/lib/repository";
import { ArrowUpRight } from "lucide-react";
import { CarCard } from "../components";
export const metadata = { title: "Design files - The shape of an idea" };
const studies = [
  {
    title: "THE WEDGE.",
    car: "lancia-stratos-hf",
    image: "/images/stratos-0.jpg",
    label: "LANCIA STRATOS / A STUDY IN COMPRESSION",
    text: "A short nose. A wraparound windscreen. A tail that seems to end before you expect it to. Read the Stratos as a set of shapes, then see those shapes at work in the 1975 rally photograph.",
  },
  {
    title: "THE CURVE.",
    car: "porsche-911-original",
    image: "/images/porsche-1.jpg",
    label: "PORSCHE 911 / THE ORIGINAL GENERATION",
    text: "Follow the roof from the windscreen to the rear deck. Then look at the upright lamps and the narrow body. Our first-generation 911 story follows the relationship between a familiar silhouette and continuing development.",
  },
  {
    title: "THE PROPORTION.",
    car: "jaguar-e-type-series-1",
    image: "/images/jaguar-1.jpg",
    label: "JAGUAR E-TYPE / SERIES 1",
    text: "A long bonnet and a compact cabin make an immediately recognizable composition. This visual study starts with the photograph: the curves of the rear glass, the taper of the tail and the way the body sits around the wheels.",
  },
];
export default async function Page() {
  const cars = await getCars();
  return (
    <main id="main" className="subject-page">
      <div className="wrap">
        <div className="subject-heading">
          <span className="eyebrow">
            DESIGN FILES / FORM, FUNCTION & FEELING
          </span>
          <h1>
            THE SHAPE
            <br />
            <span>OF AN IDEA.</span>
          </h1>
          <p>
            Some cars are recognizable in a single line.
            <br />
            Three ways of looking at the bodywork.
          </p>
        </div>
        {studies.map((s, i) => (
          <section className="design-study" key={s.car}>
            <a className="design-study-image" href={"/cars/" + s.car}>
              <img src={s.image} alt={s.label} />
              <span>
                DESIGN STUDY 00{i + 1} / CONTEMPORARY REFERENCE PHOTOGRAPH
              </span>
            </a>
            <div>
              <span className="eyebrow">
                00{i + 1} / {s.label}
              </span>
              <h2>{s.title}</h2>
              <p>{s.text}</p>
              <a className="text-link" href={"/cars/" + s.car}>
                READ THE VEHICLE STORY <ArrowUpRight size={18} />
              </a>
            </div>
          </section>
        ))}
        <p className="sample-note">
          Design observations are editorial interpretations of the pictured
          cars. These reference photographs were taken in modern times; period
          photography is explicitly dated in the Photo Archive.
        </p>
        <section className="section">
          <div className="section-label">
            <span>↳ KEEP LOOKING</span>
            <a href="/archive">ALL CARS ↗</a>
          </div>
          <div className="journal-grid">
            {cars.slice(0, 3).map((c) => (
              <CarCard car={c} key={c.slug} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
