import { requireChatGPTUser } from "@/app/chatgpt-auth";
import { adminIdentity } from "@/lib/security";
import { EditionEditor } from "./editor";
export const dynamic = "force-dynamic";
export const metadata = {
  title: "Edition review",
  robots: { index: false, follow: false },
};
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  await requireChatGPTUser("/admin/editions/" + encodeURIComponent(id));
  try {
    await adminIdentity();
  } catch {
    return (
      <main className="wrap" id="main">
        <div className="empty">
          <h1>Editorial access required.</h1>
          <p>
            Configure the server-side administrator allowlist to review
            editions.
          </p>
          <a className="text-link" href="/admin">
            Return to the editorial desk
          </a>
        </div>
      </main>
    );
  }
  return (
    <main className="wrap" id="main">
      <div className="page-heading">
        <div>
          <span className="eyebrow">
            <a href="/admin">← EDITORIAL DESK</a> / EDITION REVIEW
          </span>
          <h1>Consider every detail.</h1>
        </div>
        <p>
          Claims. Sources. Photography.
          <br />A complete record before publication.
        </p>
      </div>
      <EditionEditor id={id} />
    </main>
  );
}
