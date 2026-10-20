import type { MetadataRoute } from "next";
import { contentMode } from "@/lib/repository";
export default function robots(): MetadataRoute.Robots {
  return {
    rules:
      contentMode() === "live"
        ? { userAgent: "*", allow: "/", disallow: ["/admin", "/api/"] }
        : { userAgent: "*", disallow: "/" },
    sitemap: "https://motor-archive.fynd-8655.chatgpt.site/sitemap.xml",
  };
}
