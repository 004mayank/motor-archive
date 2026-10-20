import { getCars } from "@/lib/repository";
const escape = (s: string) =>
  s.replace(
    /[<>&"']/g,
    (c) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        '"': "&quot;",
        "'": "&apos;",
      })[c]!,
  );
export async function GET() {
  const cars = (await getCars()).filter((c) => !c.sample);
  const origin = "https://motor-archive.fynd-8655.chatgpt.site";
  return new Response(
    `<?xml version="1.0"?><rss version="2.0"><channel><title>MOTOR / ARCHIVE</title><link>${origin}</link><description>The stories behind the machines.</description>${cars.map((c) => `<item><title>${escape(c.headline)}</title><link>${origin}/cars/${c.slug}</link><guid>${origin}/cars/${c.slug}</guid><description>${escape(c.excerpt)}</description></item>`).join("")}</channel></rss>`,
    { headers: { "Content-Type": "application/rss+xml" } },
  );
}
