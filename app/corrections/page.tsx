import { FeedbackDraft } from "../feedback-draft";
export const metadata = { title: "Make the record better." };
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = typeof params.page === "string" ? params.page : "";
  return (
    <main className="wrap" id="main">
      <article className="text-page">
        <span className="eyebrow">A PERMANENT RECORD DESERVES CARE</span>
        <h1>Make the record better.</h1>
        <section>
          <h2>Precision is a shared pursuit.</h2>
          <p>
            If you find an error, please include the story URL, the specific
            claim, your proposed correction and a reliable supporting source.
            Technical corrections should identify the applicable model year,
            variant and market.
          </p>
        </section>
        <section>
          <h2>The corrections record.</h2>
          <p>
            No production corrections have been recorded. All current editions
            are sample content in a private design preview.
          </p>
        </section>
        <FeedbackDraft page={page} />
      </article>
    </main>
  );
}
