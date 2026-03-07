'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { Product } from '@/types/product'
import { useCart } from '@/context/CartContext'
import { useToast } from '@/context/ToastContext'

type Props = {
  product: Product | null
  onClose: () => void
}

export default function ProductModal({ product, onClose }: Props) {
  const { addToCart } = useCart()
  const { showToast } = useToast()

  // Bloquea el scroll del body cuando el modal está abierto
  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [product])

  if (!product) return null

  const handleAddToCart = () => {

    const stock = Number(product.stock)
    const price = Number(product.price)

    // Validación real de stock
    if (!stock || stock <= 0) {
      alert('Producto sin stock')
      return
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: price,
      image: product.img,
      stock: stock,
    })

    showToast({
      name: product.name,
      price: price,
      image: product.img,
    })

    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="
          bg-white
          w-full
          max-w-md
          max-h-[90vh]
          overflow-y-auto
          rounded-2xl
          shadow-2xl
          relative
          animate-scaleIn
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl font-bold hover:opacity-70 z-10"
        >
          ✕
        </button>

        {/* Imagen */}
        <div className="relative w-full h-64 sm:h-72">
          <Image
            src={product.img}
            alt={product.name}
            fill
            className="object-cover rounded-t-2xl"
          />
        </div>

        {/* Contenido */}
        <div className="p-6">
          <h2 className="text-xl sm:text-2xl font-bold">
            {product.name}
          </h2>

          <p className="text-lg font-semibold mt-2">
            ${Number(product.price).toLocaleString()}
          </p>

          <p className="text-sm text-gray-600 mt-4 leading-relaxed">
            {product.description}
          </p>

          {/* Mostrar stock */}
          <p className="text-sm text-gray-500 mt-3">
            Stock disponible: {Number(product.stock)}
          </p>

          <button
            onClick={handleAddToCart}
            className="
              bg-green-500 hover:bg-green-600
              active:scale-[0.98]
              text-white
              w-full
              mt-6
              py-3
              rounded-xl
              transition
              font-semibold
            "
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  )
}