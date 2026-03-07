'use client'

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

import Image from 'next/image'
import { useMemo, useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import ProductModal from '@/components/ProductModal'
import type { Product } from '@/types/product'

const BRAND_DARK = '#0F2A43'

const moneyFormatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
})

const money = (x: number) => moneyFormatter.format(x)

const normalize = (text: string) =>
  text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')

function CatalogoContent() {
  const searchParams = useSearchParams()
  const categoriaURL = searchParams.get('categoria')

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const [q, setQ] = useState('')
  const [sort, setSort] =
    useState<'relevancia' | 'precio-asc' | 'precio-desc'>('relevancia')
  const [cat, setCat] = useState('Todas')

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch('/api/products', { cache: 'no-store' })

        if (!res.ok) throw new Error('Error cargando productos')

        const data: Product[] = await res.json()
        setProducts(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  const allCategories = useMemo(() => {
    const unique = Array.from(new Set(products.map((p) => p.category)))
    return ['Todas', ...unique]
  }, [products])

  useEffect(() => {
    if (!categoriaURL) return

    const match = allCategories.find(
      (c) => normalize(c) === normalize(categoriaURL)
    )

    if (match) setCat(match)
  }, [categoriaURL, allCategories])

  const filtered = useMemo(() => {
    let items = products.filter(
      (p) =>
        (cat === 'Todas' || p.category === cat) &&
        p.name.toLowerCase().includes(q.toLowerCase())
    )

    if (sort === 'precio-asc')
      items = [...items].sort((a, b) => a.price - b.price)

    if (sort === 'precio-desc')
      items = [...items].sort((a, b) => b.price - a.price)

    return items
  }, [products, q, sort, cat])

  return (
    <div className="min-h-dvh bg-white text-slate-900">
      {/* TODO tu JSX exactamente igual */}
    </div>
  )
}

export default function CatalogoPage() {
  return (
    <Suspense fallback={<p>Cargando catálogo...</p>}>
      <CatalogoContent />
    </Suspense>
  )
}