import { ArrowUpRight, ArrowRight } from "lucide-react";
import { getCars } from "@/lib/repository";
import { features } from "@/lib/features";
import { CarCard, Newsletter, SectionLabel } from "./components";
import { TechnicalPlateArtwork } from "./workshop/technical-plate";
export default async function Home() {
  const cars = await getCars();
  const current = cars[0];
  const lead = features[0];
  return (
    <main id="main" className="editorial-home">
      <div className="publication-masthead">
        <div className="masthead-topline">
          <span>THE PAST HAS A PULSE.</span>
          <span>AN INDEPENDENT MOTORING PUBLICATION</span>
        </div>
        <div className="giant-wordmark" aria-label="Motor Archive">
          MOTOR<span>/</span>ARCHIVE
        </div>
      </div>
      <section className="cover-story">
        <img
          src={lead.cover}
          alt="Period photograph of racing cars, mechanics and spectators at the Le Mans pits in June 1966"
          fetchPriority="high"
        />
        <div className="cover-darken" />
        <div className="cover-top">
          <span className="signal-label">FROM THE ORIGINAL FILM ROLL</span>
          <span>FRANCE / JUNE 1966</span>
        </div>
        <div className="cover-bottom">
          <div>
            <span className="eyebrow">LE MANS, BEFORE THE LEGEND.</span>
            <h1>
              THE LONGEST
              <br />
              <span>DAY.</span>
            </h1>
            <p>
              The noise. The nerve. The people on the pit wall.
              <br />
              Go back to 1966, through the lens of someone who was there.
            </p>
            <a className="signal-button" href="/motorsport/le-mans-1966">
              ENTER THE STORY <ArrowUpRight size={21} />
            </a>
          </div>
          <div className="cover-side">
            <span>01 / PHOTO ESSAY</span>
            <span>
              PHOTOGRAPHY
              <br />
              ZANTAFIO56
            </span>
          </div>
        </div>
      </section>
      <div className="racing-strip">
        <span>NO SCREENS.</span>
        <span>NO SHORTCUTS.</span>
        <span>JUST THE DRIVE.</span>
        <a href="/photography">
          EXPLORE THE PHOTO ARCHIVE <ArrowUpRight size={16} />
        </a>
      </div>
      <div className="wrap">
        <section className="section racing-section">
          <SectionLabel
            number="01"
            link="All motorsport stories"
            href="/motorsport"
          >
            FROM THE TRACK. FROM THE STAGES.
          </SectionLabel>
          <div className="section-heading-row">
            <h2 className="loud-title">
              THE GOOD
              <br />
              <span>OLD CHAOS.</span>
            </h2>
            <p>
              Not another list of horsepower figures.
              <br />
              The places, people and moments
              <br />
              that made us fall for the machines.
            </p>
          </div>
          <div className="racing-stories">
            <a className="race-card race-wide" href="/motorsport/le-mans-1966">
              <div className="race-photo">
                <img
                  src="/images/lemans-1966-race.jpg"
                  alt="A period racing photograph from Le Mans, June 1966, with motion blur across the pit buildings"
                  loading="lazy"
                />
                <span className="photo-stamp">ORIGINAL PHOTOGRAPH / 1966</span>
              </div>
              <div className="race-card-meta">
                <span>ENDURANCE / FRANCE</span>
                <ArrowUpRight size={21} />
              </div>
              <h3>KEEP THE BLUR.</h3>
              <p>A spectator’s view of a day at Le Mans.</p>
            </a>
            <a className="race-card" href="/motorsport/rally-without-barriers">
              <div className="race-photo">
                <img
                  src="/images/stratos-1975-rally.jpg"
                  alt="John Lloyd’s historic photograph of a Lancia Stratos at the 1975 Castrol International Rally in Australia"
                  loading="lazy"
                />
                <span className="photo-stamp">ORIGINAL PHOTOGRAPH / 1975</span>
              </div>
              <div className="race-card-meta">
                <span>RALLY / AUSTRALIA</span>
                <ArrowUpRight size={21} />
              </div>
              <h3>INTO THE DUST.</h3>
              <p>A Stratos. A dirt road. A very different kind of Sunday.</p>
            </a>
          </div>
        </section>
      </div>
      <section className="machines-band">
        <div className="wrap">
          <SectionLabel number="02" link="Browse every car" href="/archive">
            THE MACHINES THAT MATTER
          </SectionLabel>
          <div className="section-heading-row">
            <h2 className="loud-title">
              METAL.
              <br />
              <span>WITH MEANING.</span>
            </h2>
            <p>
              From a clean sheet to a permanent obsession.
              <br />
              Explore the cars behind the stories.
            </p>
          </div>
          <div className="journal-grid">
            {cars.slice(0, 3).map((c) => (
              <CarCard key={c.slug} car={c} />
            ))}
          </div>
          {current && (
            <a className="edition-line" href={"/cars/" + current.slug}>
              <span>
                THE CURRENT CAR EDITION /{" "}
                {String(current.number).padStart(3, "0")}
                {current.sample ? " · SAMPLE STORY" : ""}
              </span>
              <strong>
                {current.manufacturer} {current.model}
              </strong>
              <ArrowUpRight size={25} />
            </a>
          )}
        </div>
      </section>
      <div className="wrap">
        <section className="design-dispatch">
          <a className="design-dispatch-photo" href="/design">
            <img
              src="/images/porsche-1.jpg"
              alt="An original-generation Porsche 911, shown in a contemporary reference photograph"
              loading="lazy"
            />
            <span>DESIGN FILE / 001</span>
          </a>
          <div>
            <span className="signal-label">DESIGN & ENGINEERING</span>
            <h2>
              SOME LINES
              <br />
              NEVER
              <br />
              <span>GO QUIET.</span>
            </h2>
            <p>
              The wedge. The curve. The proportions that make a car
              unmistakable. Look closer at the ideas beneath the bodywork.
            </p>
            <a className="signal-button dark-button" href="/design">
              OPEN THE DESIGN FILES <ArrowUpRight size={20} />
            </a>
          </div>
        </section>
      </div>
      <section className="film-banner">
        <div>
          <span className="eyebrow">THE PHOTO ARCHIVE</span>
          <h2>
            REAL FILM.
            <br />
            REAL HISTORY.
          </h2>
          <p>
            Period photographs, original colors, proper credits.
            <br />
            No generated nostalgia.
          </p>
          <a className="text-link" href="/photography">
            GO THROUGH THE CONTACT SHEET <ArrowUpRight size={17} />
          </a>
        </div>
        <a href="/photography" className="film-photo">
          <img
            src="/images/lemans-1966-start.jpg"
            alt="Period photograph of the Le Mans pit lane in June 1966"
            loading="lazy"
          />
          <span>1966 / FRAME 005 / ZANTAFIO56</span>
        </a>
      </section>
      <div className="wrap">
        <section className="garage-section">
          <div className="garage-type">
            <span className="eyebrow">THE DIGITAL WORKSHOP</span>
            <h2>
              GET UNDER
              <br />
              ITS SKIN.
            </h2>
            <p>
              Factory references. Model-specific documentation.
              <br />
              The detail that earns its place on your workbench.
            </p>
            <a className="text-link" href="/workshop">
              OPEN THE WORKSHOP <ArrowRight size={18} />
            </a>
          </div>
          <a
            href="/workshop"
            className="garage-drawing workshop-reference-teaser"
          >
            <TechnicalPlateArtwork />
            <span>PORSCHE 911 / SUPPLIED TECHNICAL REFERENCE</span>
          </a>
        </section>
        <Newsletter />
      </div>
    </main>
  );
}
