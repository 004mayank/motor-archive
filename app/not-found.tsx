export default function NotFound() {
  return (
    <main className="wrap" id="main">
      <div className="empty" style={{ padding: "120px 20px" }}>
        <span className="eyebrow">404 / A TURN WE HAVEN’T TAKEN</span>
        <h1 style={{ fontSize: 60, margin: "25px 0" }}>The road ends here.</h1>
        <p>This story may have moved, or it is still waiting to be told.</p>
        <a className="button" style={{ marginTop: 30 }} href="/archive">
          Find another story ↗
        </a>
      </div>
    </main>
  );
}
