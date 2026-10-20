import history from "@/public/images/history-credits.json";
import catalogue from "@/public/images/catalogue-credits.json";
const credits = [...history, ...catalogue];
const catalogueFrames: Record<
  string,
  { caption: string; date: string; href: string }
> = {
  "porsche-1968-nurburgring": {
    caption: "THE ORIGINAL LINE.",
    date: "NÜRBURGRING / SPRING 1968",
    href: "/cars/porsche-911-original",
  },
  "jaguar-1963-nurburgring": {
    caption: "BEAUTY IN MOTION.",
    date: "NÜRBURGRING / 19 MAY 1963",
    href: "/cars/jaguar-e-type-series-1",
  },
  "nsx-1994-lemans": {
    caption: "PRECISION AT PACE.",
    date: "LE MANS / 1994",
    href: "/cars/honda-nsx-na1",
  },
};
import { ArrowUpRight } from "lucide-react";
export const metadata = {
  title: "Photo archive - Original historic automotive photographs",
};
const captions: Record<string, string> = {
  "lemans-1966-grid": "THE PIT WALL.",
  "lemans-1966-pits": "THROUGH THE ESSES.",
  "lemans-1966-race": "KEEP THE BLUR.",
  "lemans-1966-start": "BETWEEN THE LAPS.",
  "stratos-1975-rally": "INTO THE DUST.",
};
export default function Page() {
  return (
    <main id="main" className="photo-archive">
      <div className="wrap">
        <div className="subject-heading">
          <span className="eyebrow">
            THE PHOTOGRAPHIC ARCHIVE / ORIGINAL FRAMES
          </span>
          <h1>
            HISTORY.
            <br />
            <span>AS IT HAPPENED.</span>
          </h1>
          <p>
            Not a modern recreation. Not an AI image.
            <br />
            Photographs from the people who were there.
          </p>
        </div>
        <div className="contact-sheet">
          {credits.map((c, i) => (
            <article className="film-frame" key={c.id}>
              <div className="frame-edge">
                <span>M/A NEGATIVE FILE</span>
                <span>↳ 00{i + 1}</span>
              </div>
              <a
                href={
                  catalogueFrames[c.id]?.href ||
                  (c.id.startsWith("lemans")
                    ? "/motorsport/le-mans-1966"
                    : "/motorsport/rally-without-barriers")
                }
              >
                <img src={c.src} alt={c.description} />
              </a>
              <div className="frame-info">
                <span className="eyebrow">
                  {catalogueFrames[c.id]?.date ||
                    (c.id.startsWith("lemans")
                      ? "LE MANS / JUNE 1966"
                      : "CASTROL INTERNATIONAL RALLY / 1975")}
                </span>
                <h2>{catalogueFrames[c.id]?.caption || captions[c.id]}</h2>
                <p>
                  Photograph © {c.creator} ·{" "}
                  <a href={c.licenseUrl} target="_blank" rel="noreferrer">
                    {c.license}
                  </a>
                </p>
                <a
                  className="text-link"
                  href={c.source}
                  target="_blank"
                  rel="noreferrer"
                >
                  ORIGINAL SOURCE RECORD <ArrowUpRight size={15} />
                </a>
              </div>
            </article>
          ))}
        </div>
        <div className="archive-provenance">
          <h2>
            THE DATE.
            <br />
            THE NAME.
            <br />
            THE SOURCE.
          </h2>
          <div>
            <p>
              Every frame has an original source record and a named
              photographer. The four Le Mans photographs are dated June 1966 in
              their source records. The Australian rally image is identified as
              1975 in its source caption; the later digital metadata belongs to
              the copy, not the event. The catalogue frames add a Porsche at the
              Nürburgring in 1968, an E-type there in 1963, and an NSX at Le
              Mans in 1994. Event years come from the original captions; a later
              digitization date does not replace them.
            </p>
            <p>
              Original colors are retained. Resizing and editorial cropping are
              disclosed. Each photograph keeps its own Creative Commons license,
              including ShareAlike obligations where applicable.
            </p>
            <a className="text-link" href="/image-credits">
              FULL PHOTOGRAPHY CREDITS ↗
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
