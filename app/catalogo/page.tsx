'use client';

import Image from 'next/image';
import { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductModal from '@/components/ProductModal';
import type { Product } from '@/types/product'; // 🔥 usamos el tipo centralizado

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

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [q, setQ] = useState('');
  const [sort, setSort] =
    useState<'relevancia' | 'precio-asc' | 'precio-desc'>('relevancia');
  const [cat, setCat] = useState('Todas');

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // 🔥 Cargar productos desde API
  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch('/api/products', { cache: 'no-store' });
        if (!res.ok) throw new Error('Error al obtener productos');
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  // 🔥 Categorías dinámicas
  const allCategories = useMemo(() => {
    const unique = Array.from(new Set(products.map((p) => p.category)));
    return ['Todas', ...unique];
  }, [products]);

  // 🔥 Leer categoría desde URL
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

  // 🔥 Filtro + ordenamiento
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
  }, [products, q, sort, cat]);

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

        {/* GRID */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {loading ? (
            <p>Cargando productos...</p>
          ) : (
            filtered.map((p) => (
              <article
                key={p.id}
                onClick={() => p.stock !== 0 && setSelectedProduct(p)}
                className={`rounded-2xl border bg-white shadow-sm transition
                  ${p.stock === 0
                    ? 'opacity-60 cursor-not-allowed'
                    : 'cursor-pointer hover:shadow-md'}`}
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

                  {/* 🔥 STOCK VISUAL */}
                  <div className="mt-2 text-xs font-semibold">
                    {p.stock === 0 ? (
                      <span className="text-red-500">Sin stock</span>
                    ) : p.stock && p.stock <= 5 ? (
                      <span className="text-orange-500">
                        ⚠ Últimas {p.stock} unidades
                      </span>
                    ) : (
                      <span className="text-green-600">
                        {p.stock} disponibles
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}