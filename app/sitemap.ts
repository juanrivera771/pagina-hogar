import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://jxf.co",
      lastModified: new Date(),
    },
    {
      url: "https://jxf.co/test-product",
      lastModified: new Date(),
    },
  ];
}