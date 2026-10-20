import { requireChatGPTUser } from "../chatgpt-auth";
import { env } from "cloudflare:workers";
import { AdminDesk } from "./panel";
export const dynamic = "force-dynamic";
export const metadata = {
  title: "Editorial desk",
  robots: { index: false, follow: false },
};
export default async function Admin() {
  const user = await requireChatGPTUser("/admin");
  const authorized = (env.ADMIN_EMAILS || "")
    .toLowerCase()
    .split(",")
    .map((s) => s.trim())
    .includes(user.email.toLowerCase());
  return (
    <main id="main" className="wrap">
      <div className="page-heading">
        <div>
          <span className="eyebrow">
            MOTOR / ARCHIVE · EDITORIAL OPERATIONS
          </span>
          <h1>The editorial desk.</h1>
        </div>
        <p>
          A considered process behind every edition.
          <br />
          Signed in as {user.displayName}.
        </p>
      </div>
      <AdminDesk authorized={authorized} />
    </main>
  );
}
