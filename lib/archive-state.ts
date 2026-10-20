export const archiveFilterKeys = [
  "manufacturer",
  "country",
  "decade",
  "category",
  "body",
  "engine",
  "drivetrain",
  "fuel",
  "motorsport",
  "significance",
  "startYear",
  "endYear",
] as const;
export type ArchiveState = {
  query: string;
  filters: Record<string, string>;
  sort: string;
  page: number;
};
export function validArchiveFilters(
  filters: Record<string, string>,
  options: Record<string, string[]>,
): Record<string, string> {
  return Object.fromEntries(
    Object.entries(filters).filter(([key, value]) =>
      options[key]?.includes(value),
    ),
  );
}
export function readArchiveState(params: URLSearchParams): ArchiveState {
  const sort = params.get("sort") || "edition";
  const page = Number(params.get("page") || 1);
  return {
    query: (params.get("q") || "").slice(0, 200),
    filters: Object.fromEntries(
      archiveFilterKeys.flatMap((k) =>
        params.get(k) ? [[k, params.get(k)!.slice(0, 100)]] : [],
      ),
    ),
    sort: ["edition", "era", "manufacturer", "category"].includes(sort)
      ? sort
      : "edition",
    page: Number.isSafeInteger(page) && page > 0 ? page : 1,
  };
}
export function writeArchiveState(
  params: URLSearchParams,
  state: ArchiveState,
): URLSearchParams {
  const result = new URLSearchParams(params);
  for (const key of ["q", "sort", "page", ...archiveFilterKeys])
    result.delete(key);
  if (state.query.trim()) result.set("q", state.query.trim().slice(0, 200));
  for (const key of archiveFilterKeys)
    if (state.filters[key]) result.set(key, state.filters[key]);
  if (state.sort !== "edition") result.set("sort", state.sort);
  if (state.page > 1) result.set("page", String(state.page));
  return result;
}
export function archiveParams(
  params: Record<string, string | string[] | undefined>,
): string {
  const result = new URLSearchParams();
  for (const [key, value] of Object.entries(params))
    if (typeof value === "string") result.set(key, value);
  return result.toString();
}
