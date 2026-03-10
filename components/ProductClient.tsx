'use client'

import Image from 'next/image'
import { useCart } from '@/context/CartContext'
import { useToast } from '@/context/ToastContext'

export default function ProductClient({ product }: any) {

  const { addToCart, openCart } = useCart()
  const { showToast } = useToast()

  const handleAddToCart = () => {

    if (product.stock === 0) return

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.img,
    })

    showToast({
      name: product.name,
      price: product.price,
      image: product.img,
    })

  }

  const price = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(product.price)

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10">

      {/* imagen */}
      <div className="relative aspect-square">
        <Image
          src={product.img}
          alt={product.name}
          fill
          className="object-cover rounded-xl"
        />
      </div>

      {/* info */}
      <div className="space-y-6">

        <h1 className="text-3xl font-bold">
          {product.name}
        </h1>

        <p className="text-2xl font-semibold">
          {price}
        </p>

        <p className="text-slate-600">
          {product.description}
        </p>

        <div className="text-sm font-medium">
          {product.stock === 0 ? (
            <span className="text-red-500">Sin stock</span>
          ) : product.stock <= 5 ? (
            <span className="text-orange-500">
              ⚠ Últimas {product.stock} unidades
            </span>
          ) : (
            <span className="text-green-600">
              {product.stock} disponibles
            </span>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="
            bg-[#66D11F]
            text-[#0F2A43]
            px-6 py-3
            rounded-lg
            font-semibold
            transition
            hover:scale-[1.02]
            active:scale-[0.98]
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          {product.stock === 0 ? 'Sin stock' : 'Agregar al carrito'}
        </button>

      </div>

    </div>
  )
}