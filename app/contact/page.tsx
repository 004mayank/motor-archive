import { FeedbackDraft } from "../feedback-draft";
export const metadata = { title: "Keep in touch." };
export default function Page() {
  return (
    <main className="wrap" id="main">
      <article className="text-page">
        <span className="eyebrow">
          THE BEST STORIES BEGIN WITH A CONVERSATION
        </span>
        <h1>Keep in touch.</h1>
        <section>
          <h2>Have a story in mind?</h2>
          <p>
            We welcome ideas about overlooked engineering, memorable design and
            vehicles that deserve a closer look. Source materials and first-hand
            historical records can help turn a lead into a carefully researched
            feature.
          </p>
        </section>
        <section>
          <h2>Editorial enquiries.</h2>
          <p>
            The production editorial inbox has not been configured. This preview
            does not send contact messages or collect enquiries.
          </p>
        </section>
        <section>
          <h2>Spot an error?</h2>
          <p>
            <a href="/corrections">Our corrections page</a> explains the
            evidence that helps us investigate a claim. Please include model
            years and variants when the issue concerns technical details.
          </p>
        </section>
        <FeedbackDraft kind="enquiry" />
      </article>
    </main>
  );
}
