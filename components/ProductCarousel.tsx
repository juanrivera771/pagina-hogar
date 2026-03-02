'use client'

import Image from 'next/image'
import type { Product } from '@/data/products'
import { useCart } from '@/context/CartContext'
import { useToast } from '@/context/ToastContext'

const BRAND_GREEN = '#66D11F'
const BRAND_DARK = '#0F2A43'

const moneyFormatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
})

const money = (x: number) => moneyFormatter.format(x)

type Props = {
  products: readonly Product[]
}

export default function ProductCarousel({ products }: Props) {
  const { addToCart } = useCart() // 🔥 quitamos openCart
  const { showToast } = useToast()

  const handleAddToCart = (p: Product) => {
    addToCart({
      id: p.id,
      name: p.name,
      price: p.price,
      image: p.img,
    })

    showToast({
      name: p.name,
      price: p.price,
      image: p.img,
    })

    // ❌ ELIMINADO openCart()
  }

  return (
    <section
      id="masvendidos"
      className="mx-auto max-w-7xl px-4 py-20"
    >
      <h2
        className="text-3xl font-extrabold mb-8"
        style={{ color: BRAND_DARK }}
      >
        Más vendidos
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {products.map((p, index) => (
          <article
            key={p.id}
            className="group rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div className="relative aspect-square overflow-hidden rounded-t-2xl bg-slate-100">
              <Image
                src={p.img}
                alt={p.name}
                fill
                priority={index < 4}
                sizes="(max-width:768px) 50vw, (max-width:1200px) 33vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="p-4">
              <h3
                className="font-semibold leading-snug line-clamp-2 min-h-[44px]"
                title={p.name}
              >
                {p.name}
              </h3>

              <div className="mt-2 flex items-center justify-between">
                <span
                  className="text-lg font-extrabold"
                  style={{ color: BRAND_DARK }}
                >
                  {money(p.price)}
                </span>

                <span className="text-xs text-slate-500 capitalize">
                  {p.category}
                </span>
              </div>

              <button
                onClick={() => handleAddToCart(p)}
                className="mt-4 w-full rounded-xl px-4 py-2 text-sm font-semibold transition shadow"
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
    </section>
  )
}