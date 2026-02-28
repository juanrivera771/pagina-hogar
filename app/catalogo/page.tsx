'use client';

import Image from 'next/image';
import { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { products, categories, type Product } from '@/data/products';
import ProductModal from '@/components/ProductModal';

const BRAND_GREEN = '#66D11F';
const BRAND_DARK = '#0F2A43';

const moneyFormatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
});

const money = (x: number) => moneyFormatter.format(x);

const normalize = (text: string) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

export default function CatalogoPage() {
  const searchParams = useSearchParams();

  const [q, setQ] = useState('');
  const [sort, setSort] =
    useState<'relevancia' | 'precio-asc' | 'precio-desc'>('relevancia');
  const [cat, setCat] = useState('Todas');

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const allCategories = useMemo(
    () => ['Todas', ...categories],
    []
  );

  useEffect(() => {
    const categoriaURL = searchParams.get('categoria');

    if (categoriaURL) {
      const match = allCategories.find(
        (c) => normalize(c) === normalize(categoriaURL)
      );

      if (match) {
        setCat(match);
      }
    }
  }, [searchParams, allCategories]);

  const filtered = useMemo(() => {
    let items = products.filter((p) =>
      (cat === 'Todas' || p.category === cat) &&
      p.name.toLowerCase().includes(q.toLowerCase())
    );

    if (sort === 'precio-asc')
      items = [...items].sort((a, b) => a.price - b.price);

    if (sort === 'precio-desc')
      items = [...items].sort((a, b) => b.price - a.price);

    return items;
  }, [q, sort, cat]);

  return (
    <div className="min-h-dvh bg-white text-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">

        {/* HEADER */}
        <div className="flex items-center gap-3">
          <Image
            src="/jxf-logo.png"
            alt="JXF Colombia"
            width={32}
            height={32}
            className="rounded-sm"
          />
          <h1
            className="text-2xl sm:text-3xl font-extrabold"
            style={{ color: BRAND_DARK }}
          >
            Catálogo
          </h1>
        </div>

        {/* CONTROLES */}
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
              <option key={c} value={c}>
                {c}
              </option>
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

        {/* GRID PRODUCTOS */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((p: Product) => (
            <article
              key={p.id}
              onClick={() => setSelectedProduct(p)}
              className="cursor-pointer rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition"
            >
              <div className="relative aspect-square overflow-hidden rounded-t-2xl bg-slate-100">
                <Image
                  src={p.img}
                  alt={p.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-4">
                <h3 className="font-semibold leading-snug line-clamp-2">
                  {p.name}
                </h3>

                <div className="mt-2 flex items-center justify-between">
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
          ))}
        </div>
      </div>

      {/* MODAL GLOBAL */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}