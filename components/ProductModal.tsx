'use client'

import { Product } from '@/data/products'

type Props = {
  product: Product | null
  onClose: () => void
}

export default function ProductModal({ product, onClose }: Props) {
  if (!product) return null

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[420px] relative shadow-xl">

        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-xl font-bold"
        >
          ✕
        </button>

        <img
          src={product.img}
          alt={product.name}
          className="w-full rounded-xl mb-4"
        />

        <h2 className="text-xl font-bold">{product.name}</h2>

        <p className="text-lg font-semibold mt-2">
          ${product.price.toLocaleString()}
        </p>

        <p className="text-sm text-gray-600 mt-3">
          {product.description}
        </p>

        <button className="bg-green-500 hover:bg-green-600 text-white w-full mt-5 py-2 rounded-xl">
          Comprar ahora
        </button>

      </div>
    </div>
  )
}