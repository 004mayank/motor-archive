import test from "node:test";
import assert from "node:assert/strict";
import {
  readArchiveState,
  writeArchiveState,
  archiveParams,
  validArchiveFilters,
} from "./lib/archive-state.ts";
test("Archive URL round-trips search, advanced filters, sort and page", () => {
  const state = {
    query: "NSX",
    filters: { country: "Japan", engine: "V6", motorsport: "Yes" },
    sort: "era",
    page: 2,
  };
  assert.deepEqual(
    readArchiveState(writeArchiveState(new URLSearchParams(), state)),
    state,
  );
});
test("Invalid sort and page inputs recover to supported defaults", () => {
  for (const value of ["-2", "NaN", "Infinity", "1.5", "0", "9007199254740992"])
    assert.equal(
      readArchiveState(new URLSearchParams({ page: value })).page,
      1,
    );
  assert.equal(
    readArchiveState(new URLSearchParams({ sort: "invented" })).sort,
    "edition",
  );
});
test("Clearing archive state removes its parameters and preserves unrelated URL context", () => {
  const params = new URLSearchParams(
    "q=NSX&country=Japan&engine=V6&sort=era&page=2&utm_source=journal",
  );
  assert.equal(
    writeArchiveState(params, {
      query: "",
      filters: {},
      sort: "edition",
      page: 1,
    }).toString(),
    "utm_source=journal",
  );
  assert.equal(params.get("q"), "NSX");
});
test("Search whitespace is canonicalized without losing inner words", () => {
  assert.equal(
    writeArchiveState(new URLSearchParams(), {
      query: "  E type  ",
      filters: {},
      sort: "edition",
      page: 1,
    }).get("q"),
    "E type",
  );
});
test("Server URL input ignores array values and bounds public text inputs", () => {
  assert.equal(
    archiveParams({
      q: "NSX",
      country: ["Japan", "Italy"],
      missing: undefined,
    }),
    "q=NSX",
  );
  const state = readArchiveState(
    new URLSearchParams({ q: "a".repeat(300), country: "x".repeat(200) }),
  );
  assert.equal(state.query.length, 200);
  assert.equal(state.filters.country.length, 100);
});

test("Unavailable URL filters are discarded so no invisible constraint remains", () => {
  assert.deepEqual(
    validArchiveFilters(
      { country: "invented", engine: "V6", unknown: "yes" },
      { country: ["Japan", "Italy"], engine: ["V6"] },
    ),
    { engine: "V6" },
  );
});
test("Long searches serialize consistently with restored state", () => {
  const params = writeArchiveState(new URLSearchParams(), {
    query: "x".repeat(300),
    filters: {},
    sort: "edition",
    page: 1,
  });
  assert.equal(params.get("q").length, 200);
  assert.equal(readArchiveState(params).query, params.get("q"));
});
