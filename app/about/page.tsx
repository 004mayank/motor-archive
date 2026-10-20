import { Newsletter } from "../components";
export const metadata = { title: "For the love of the drive." };
export default function Page() {
  return (
    <main className="wrap" id="main">
      <article className="text-page">
        <span className="eyebrow">OUR REASON FOR TAKING THE LONG WAY</span>
        <h1>For the love of the drive.</h1>
        <section>
          <h2>Some see a machine. We see a story.</h2>
          <p>
            MOTOR / ARCHIVE is an independent automotive journal about the
            ideas, people and engineering behind remarkable cars. We are
            interested in what makes a machine matter: a new way of thinking, a
            line that feels inevitable, an ambition carried from a drawing board
            onto a road.
          </p>
        </section>
        <section>
          <h2>A magazine. An archive. A workshop.</h2>
          <p>
            The journal is where curiosity begins. The archive connects stories
            across eras and countries. The workshop is where practical knowledge
            earns its place through careful sourcing and explicit model
            applicability.
          </p>
        </section>
        <section>
          <h2>A considered beginning.</h2>
          <p>
            You are viewing a private design preview with four clearly labelled
            sample editions. Historical research, provider integrations and
            automated publication are not yet production-certified. The Porsche
            sample includes further reading from the manufacturer’s historical
            archive.
          </p>
        </section>
      </article>
      <Newsletter />
    </main>
  );
}
