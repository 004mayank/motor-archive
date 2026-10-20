import { Newsletter } from "../components";
export const metadata = { title: "The Sunday letter" };
export default function Page() {
  return (
    <main className="wrap" id="main">
      <div className="page-heading">
        <div>
          <span className="eyebrow">THE MOTOR / ARCHIVE SUNDAY LETTER</span>
          <h1>
            Something worth
            <br />
            <em>opening.</em>
          </h1>
        </div>
        <p>
          A considered moment in a busy inbox.
          <br />A car, a story, and a reason to take the long way home.
        </p>
      </div>
      <Newsletter />
    </main>
  );
}
