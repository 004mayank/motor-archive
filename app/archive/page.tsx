import { getCars } from "@/lib/repository";
import { archiveParams } from "@/lib/archive-state";
import { ArchiveBrowser } from "../components";
export const metadata = { title: "The archive" };
export default async function Archive({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = archiveParams(await searchParams);
  return (
    <main className="wrap" id="main">
      <div className="page-heading">
        <div>
          <span className="eyebrow">
            THE CAR FILES / ICONS, ODDBALLS & OBSESSIONS
          </span>
          <h1>The machines.</h1>
        </div>
        <p>
          Different countries. Different decades.
          <br />
          The same enduring fascination.
          <br />
          Find your next obsession.
        </p>
      </div>
      <ArchiveBrowser cars={await getCars()} initialParams={params} />
    </main>
  );
}
