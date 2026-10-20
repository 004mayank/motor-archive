import { features } from "@/lib/features";
import { ArrowUpRight } from "lucide-react";
export const metadata = {
  title: "Motorsport - Racing history in original photographs",
  description:
    "Period photographs from Le Mans 1966 and the 1975 Castrol rally. Original scenes, named photographers and stories from the track.",
};
export default function Page() {
  return (
    <main id="main" className="subject-page">
      <div className="wrap">
        <div className="subject-heading">
          <span className="eyebrow">THE TRACK. THE STAGES. THE PEOPLE.</span>
          <h1>
            RACING
            <br />
            <span>IS HUMAN.</span>
          </h1>
          <p>
            Before the data trace, there was the person behind the wheel.
            <br />
            Revisit the world of motorsport through original period photographs.
          </p>
        </div>
        <div className="subject-feature-grid">
          {features.map((f, i) => (
            <a
              href={"/motorsport/" + f.slug}
              key={f.slug}
              className="subject-feature"
            >
              <div className="race-photo">
                <img src={f.cover} alt={f.deck} />
                <span className="photo-stamp">
                  {f.date} / ORIGINAL PHOTOGRAPHY
                </span>
              </div>
              <div className="race-card-meta">
                <span>
                  0{i + 1} / {f.category} / {f.place}
                </span>
                <ArrowUpRight />
              </div>
              <h2>{f.title}</h2>
              <p>{f.deck}</p>
            </a>
          ))}
        </div>
        <section className="subject-note">
          <span className="eyebrow">THE WAY WE TELL IT</span>
          <h2>
            FEEL THE MOMENT.
            <br />
            FOLLOW THE SOURCE.
          </h2>
          <p>
            These are photographic stories built around actual period images. We
            separate what the frame shows from historical claims that need
            further evidence. Each essay links to its original photographs and
            reuse licenses.
          </p>
          <a className="text-link" href="/photography">
            EXPLORE EVERY FRAME ↗
          </a>
        </section>
      </div>
    </main>
  );
}
