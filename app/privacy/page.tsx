import { Newsletter } from "../components";
export const metadata = { title: "Privacy, considered." };
export default function Page() {
  return (
    <main className="wrap" id="main">
      <article className="text-page">
        <span className="eyebrow">YOUR TRUST MATTERS</span>
        <h1>Privacy, considered.</h1>
        <section>
          <h2>This private preview.</h2>
          <p>
            This site is a design and development preview. Access is managed by
            the hosting platform. We do not currently run advertising trackers
            or third-party behavioral analytics.
          </p>
        </section>
        <section>
          <h2>Newsletter data.</h2>
          <p>
            When the email provider is configured, a newsletter request stores
            your email address, consent action, subscription state and a random
            confirmation token. You must confirm before becoming an active
            subscriber. In this preview, an unconfigured email service does not
            accept signups.
          </p>
        </section>
        <section>
          <h2>Editorial access.</h2>
          <p>
            The hosting platform provides authenticated identity to protected
            editorial pages. Authorized changes are logged with the acting user,
            action and time. The administrative email allowlist is held
            server-side.
          </p>
        </section>
        <section>
          <h2>Your choices.</h2>
          <p>
            Newsletter emails will include an unsubscribe link. A production
            privacy notice, retention policy, data controller details and a
            working contact channel must be configured before public launch.
          </p>
        </section>
      </article>
    </main>
  );
}
