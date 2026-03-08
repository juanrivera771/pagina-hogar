'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import type { Product } from '@/types/product'

const BRAND_DARK = '#0F2A43'

const moneyFormatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
})

const money = (x: number) => moneyFormatter.format(x)

export default function CatalogoClient({ products }: { products: Product[] }) {
  const [q, setQ] = useState('')
  const [sort, setSort] =
    useState<'relevancia' | 'precio-asc' | 'precio-desc'>('relevancia')
  const [cat, setCat] = useState('Todas')

  const allCategories = useMemo(() => {
    const unique = Array.from(new Set(products.map((p) => p.category)))
    return ['Todas', ...unique]
  }, [products])

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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">

        <h1
          className="text-2xl sm:text-3xl font-extrabold"
          style={{ color: BRAND_DARK }}
        >
          Catálogo
        </h1>

        {/* filtros */}
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar productos…"
            className="w-full rounded-xl border border-slate-300 px-4 py-2"
          />

          <select
            value={cat}
            onChange={(e) => setCat(e.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-2"
          >
            {allCategories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(e) =>
              setSort(
                e.target.value as
                  | 'relevancia'
                  | 'precio-asc'
                  | 'precio-desc'
              )
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-2"
          >
            <option value="relevancia">Orden: Relevancia</option>
            <option value="precio-asc">Precio: menor a mayor</option>
            <option value="precio-desc">Precio: mayor a menor</option>
          </select>
        </div>

        {/* grid productos */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((p) => (
            <Link
              key={p.id}
              href={`/catalogo/${p.slug}`}
              className={`rounded-2xl border bg-white shadow-sm transition block ${
                p.stock === 0
                  ? 'opacity-60 cursor-not-allowed pointer-events-none'
                  : 'cursor-pointer hover:shadow-md'
              }`}
            >
              <article>
                <div className="relative aspect-square overflow-hidden rounded-t-2xl bg-slate-100">
                  <Image
                    src={p.img}
                    alt={p.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-4">
                  <h3 className="font-semibold line-clamp-2">
                    {p.name}
                  </h3>

                  <div className="mt-2 flex justify-between">
                    <span
                      className="text-lg font-extrabold"
                      style={{ color: BRAND_DARK }}
                    >
                      {money(p.price)}
                    </span>

                    <span className="text-xs text-slate-500">
                      {p.category}
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

      </div>
    </div>
  )
}