import type { MetadataRoute } from "next";
import { getCars, contentMode } from "@/lib/repository";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (contentMode() !== "live") return [];
  const origin = "https://motor-archive.fynd-8655.chatgpt.site";
  return [
    { url: origin },
    ...(await getCars())
      .filter((c) => !c.sample)
      .map((c) => ({ url: origin + "/cars/" + c.slug })),
  ];
}
