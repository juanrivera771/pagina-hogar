import CatalogoClient from "./CatalogoClient"
import type { Product } from "@/types/product"

export const dynamic = "force-dynamic"

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/products`,
      {
        cache: "no-store",
      }
    )

    if (!res.ok) {
      throw new Error("Error cargando productos")
    }

    return res.json()
  } catch (error) {
    console.error("Error obteniendo productos:", error)
    return []
  }
}

export default async function CatalogoPage() {
  const products = await getProducts()

  return <CatalogoClient products={products} />
}