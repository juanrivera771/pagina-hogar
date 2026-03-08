import { notFound } from "next/navigation"
import { getProducts } from "@/lib/getProducts"
import ProductClient from "@/components/ProductClient"

export const dynamic = "force-dynamic"

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {

  const { slug } = await params

  const products = getProducts()

  const product = products.find((p) => p.slug === slug)

  if (!product) {
    notFound()
  }

  return <ProductClient product={product} />
}