import { getCars } from "@/lib/repository";
import { archiveParams } from "@/lib/archive-state";
import { ArchiveBrowser } from "../components";
export const metadata = { title: "Search the archive" };
export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = archiveParams(await searchParams);
  return (
    <main className="wrap" id="main">
      <div className="page-heading">
        <div>
          <span className="eyebrow">FOLLOW YOUR CURIOSITY</span>
          <h1>Find your story.</h1>
        </div>
        <p>
          Search names, generations, engineering and stories. Workshop documents
          join the index after verification.
        </p>
      </div>
      <ArchiveBrowser cars={await getCars()} initialParams={params} />
    </main>
  );
}
