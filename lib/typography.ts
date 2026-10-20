/** House style for public text, including editions already stored in the database. */
export function editorialText(value: string): string {
  return value
    .replace(/\u2014(?=and\b)/g, ", ")
    .replace(/(\d)[\u2013\u2014](?=\d)/g, "$1-")
    .replace(/\s*[\u2013\u2014]\s*/g, " - ");
}
