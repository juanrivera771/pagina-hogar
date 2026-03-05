'use client';

import { useEffect, useState } from 'react';
import Hero from '@/components/Hero';
import CategoriasHome from '@/components/CategoriasHome';
import ProductSlider from '@/components/ProductSlider';
import Footer from '@/components/Footer';

export default function Page() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch('/api/products');
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

  return (
    <div className="relative min-h-dvh text-slate-900">

      {/* ===== FONDO GLOBAL ===== */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, #ffffff 0%, #F7FBF2 28%, #F1F9E8 50%, #ffffff 100%)',
          }}
        />

        {/* Glow verde superior */}
        <div
          className="absolute -top-40 -left-40 w-[44rem] h-[44rem] rounded-full blur-3xl opacity-30"
          style={{
            background:
              'radial-gradient(closest-side, #66D11F, rgba(102,209,31,0))',
          }}
        />

        {/* Glow oscuro inferior */}
        <div
          className="absolute -bottom-56 -right-48 w-[50rem] h-[50rem] rounded-full blur-3xl opacity-20"
          style={{
            background:
              'radial-gradient(closest-side, rgba(15,42,67,0.55), rgba(15,42,67,0))',
          }}
        />
      </div>

      {/* ===== CONTENIDO ===== */}
      <Hero />

      {/* ===== CATEGORÍAS ===== */}
      <CategoriasHome />

      {/* ===== SLIDER MÁS VENDIDOS ===== */}
      <section
        id="masvendidos"
        className="mx-auto max-w-7xl px-4 py-16"
      >
        {loading ? (
          <p className="text-center">Cargando productos...</p>
        ) : (
          <ProductSlider
            products={products}
            title="Más vendidos"
          />
        )}
      </section>

      <Footer />
    </div>
  );
}