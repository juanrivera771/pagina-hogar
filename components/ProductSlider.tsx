'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { type Product } from '@/data/products';
import ProductModal from './ProductModal';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';

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

  const { addToCart } = useCart();
  const { showToast } = useToast();

  const scroll = (dir: 'left' | 'right') => {
    const el = containerRef.current;
    if (!el) return;

    el.scrollBy({
      left: dir === 'right' ? 320 : -320,
      behavior: 'smooth',
    });
  };

  const handleAddToCart = (p: Product) => {
    addToCart({
      id: p.id,
      name: p.name,
      price: p.price,
      image: p.img,
    });

    showToast({
      name: p.name,
      price: p.price,
      image: p.img,
    });
  };

  return (
    <>
      <section className="w-full py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {title && (
            <div className="flex items-center justify-between mb-8 sm:mb-12">
              <h2
                className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight"
                style={{ color: BRAND_DARK }}
              >
                {title}
              </h2>

              {/* Flechas solo desktop */}
              <div className="hidden md:flex gap-3">
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
              flex gap-4 sm:gap-6
              overflow-x-auto
              scroll-smooth
              snap-x snap-mandatory
              scrollbar-hide
              [-webkit-overflow-scrolling:touch]
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

                  <button
                    onClick={() => handleAddToCart(p)}
                    className="
                      mt-auto
                      rounded-lg py-2.5
                      font-semibold text-sm
                      transition-all duration-300
                      hover:scale-[1.02]
                      active:scale-[0.98]
                    "
                    style={{
                      backgroundColor: BRAND_GREEN,
                      color: BRAND_DARK,
                    }}
                  >
                    Agregar al carrito
                  </button>

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