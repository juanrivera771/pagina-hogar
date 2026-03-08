import CatalogoClient from "./CatalogoClient"
import { getProducts } from "@/lib/getProducts"

export const dynamic = "force-dynamic"

export default function CatalogoPage() {
  const products = getProducts()

  return <CatalogoClient products={products} />
}