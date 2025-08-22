import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard/", "/login/", "/signup/", "/shared-result/"],
    },
    sitemap: "https://psyluma.com/sitemap.xml",
  }
}
