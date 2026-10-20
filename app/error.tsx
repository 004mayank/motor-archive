"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="wrap" id="main">
      <div className="empty">
        <h1 style={{ fontSize: 50 }}>A brief stop along the way.</h1>
        <p>The archive could not load. Please try again.</p>
        <button className="button" style={{ marginTop: 25 }} onClick={reset}>
          Try again
        </button>
      </div>
    </main>
  );
}
