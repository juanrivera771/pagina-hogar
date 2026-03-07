import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/getProducts";

export default function sitemap(): MetadataRoute.Sitemap {
  const products = getProducts();

  const productUrls = products.map((product) => ({
    url: `https://jxf.co/product/${product.id}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: "https://jxf.co",
      lastModified: new Date(),
    },
    ...productUrls,
  ];
}