'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { type Product } from '@/data/products';
import ProductModal from './ProductModal';

const BRAND_GREEN = '#66D11F';
const BRAND_DARK = '#0F2A43';

const money = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
}).format;

type Props = {
  products: readonly Product[];
  title?: string;
};

export default function ProductSlider({ products, title }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const scroll = (dir: 'left' | 'right') => {
    const el = containerRef.current;
    if (!el) return;

    el.scrollBy({
      left: dir === 'right' ? 360 : -360,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <section className="w-full py-20">
        <div className="max-w-7xl mx-auto px-6">

          {title && (
            <div className="flex items-center justify-between mb-12">
              <h2
                className="text-3xl md:text-4xl font-bold tracking-tight"
                style={{ color: BRAND_DARK }}
              >
                {title}
              </h2>

              <div className="flex gap-3">
                <button
                  onClick={() => scroll('left')}
                  className="w-11 h-11 rounded-full border border-slate-300 bg-white/60 backdrop-blur hover:bg-white transition"
                >
                  ‹
                </button>

                <button
                  onClick={() => scroll('right')}
                  className="w-11 h-11 rounded-full border border-slate-300 bg-white/60 backdrop-blur hover:bg-white transition"
                >
                  ›
                </button>
              </div>
            </div>
          )}

          <div
            ref={containerRef}
            className="
              flex gap-6 overflow-x-auto
              scroll-smooth snap-x snap-mandatory
              scrollbar-hide
            "
          >
            {products.map((p) => (
              <article
                key={p.id}
                className="
                  snap-start shrink-0
                  w-[85%] sm:w-[45%] lg:w-[23%]
                  rounded-2xl
                  bg-white
                  border border-slate-200/60
                  hover:shadow-xl
                  transition-all duration-300
                  group
                  flex flex-col
                "
              >
                <div
                  className="relative aspect-[4/3] overflow-hidden rounded-t-2xl bg-slate-100 cursor-pointer"
                  onClick={() => setSelectedProduct(p)}
                >
                  <Image
                    src={p.img}
                    alt={p.name}
                    fill
                    sizes="(max-width:768px) 85vw, (max-width:1024px) 45vw, 23vw"
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>

                <div className="p-4 flex flex-col flex-1">

                  <h3
                    onClick={() => setSelectedProduct(p)}
                    className="text-sm font-medium text-slate-700 line-clamp-2 cursor-pointer"
                  >
                    {p.name}
                  </h3>

                  <p
                    className="mt-2 text-lg font-bold"
                    style={{ color: BRAND_DARK }}
                  >
                    {money(p.price)}
                  </p>

                  <a
                    href={`https://wa.me/573208709850?text=${encodeURIComponent(
                      `Hola quiero este producto: ${p.name}`
                    )}`}
                    className="
                      mt-auto
                      block text-center
                      rounded-lg py-2.5
                      font-semibold text-sm
                      transition-all duration-300
                      hover:scale-[1.02]
                    "
                    style={{
                      backgroundColor: BRAND_GREEN,
                      color: BRAND_DARK,
                    }}
                  >
                    Comprar ahora
                  </a>

                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
}