'use client'

import Image from 'next/image'
import { Product } from '@/data/products'
import { useCart } from '@/context/CartContext'
import { useToast } from '@/context/ToastContext'

type Props = {
  product: Product | null
  onClose: () => void
}

export default function ProductModal({ product, onClose }: Props) {
  const { addToCart } = useCart() // 🔥 quitamos openCart
  const { showToast } = useToast()

  if (!product) return null

  const handleAddToCart = () => {
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

    // ❌ eliminado openCart()
    onClose() // cerramos modal
  }

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-6 w-full max-w-md relative shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-xl font-bold hover:opacity-70"
        >
          ✕
        </button>

        <div className="relative w-full h-64 mb-4">
          <Image
            src={product.img}
            alt={product.name}
            fill
            className="object-cover rounded-xl"
          />
        </div>

        <h2 className="text-xl font-bold">{product.name}</h2>

        <p className="text-lg font-semibold mt-2">
          ${product.price.toLocaleString()}
        </p>

        <p className="text-sm text-gray-600 mt-3">
          {product.description}
        </p>

        <button
          onClick={handleAddToCart}
          className="bg-green-500 hover:bg-green-600 text-white w-full mt-5 py-3 rounded-xl transition font-semibold"
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  )
}