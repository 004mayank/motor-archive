import { Newsletter } from "../components";
export const metadata = { title: "Terms of this preview." };
export default function Page() {
  return (
    <main className="wrap" id="main">
      <article className="text-page">
        <span className="eyebrow">A NOTE BEFORE THE NEXT TURN</span>
        <h1>Terms of this preview.</h1>
        <section>
          <h2>A development publication.</h2>
          <p>
            MOTOR / ARCHIVE currently provides sample editorial content to
            demonstrate its design and functionality. The preview is not an
            operational automotive repair service or a verified production
            historical reference.
          </p>
        </section>
        <section>
          <h2>Use of workshop material.</h2>
          <p>
            A technical document must match your vehicle before it can be used.
            Refer to current official documentation and qualified professionals
            for repair decisions. No actionable repair procedures are offered in
            this preview.
          </p>
        </section>
        <section>
          <h2>Photographic rights.</h2>
          <p>
            Photographs remain subject to the individual licenses linked in the
            credits. Text, branding and source code are separate from those
            image licenses. No affiliation with the depicted vehicle
            manufacturers is implied.
          </p>
        </section>
        <section>
          <h2>Before public launch.</h2>
          <p>
            The operator must provide production legal terms, contact details
            and a complete privacy notice, and configure the external services
            required for publication.
          </p>
        </section>
      </article>
    </main>
  );
}
